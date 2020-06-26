'use strict';

const debug = require('debug')('reps-archive:fetch');
const async = require('async');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const DATA_PATH = '../data';
const ALUMNI_BASE_URL = 'https://reps.mozilla.org/people/alumni/?page=';
const ALUMNI_PAGES = 26;
const JSON_SPACES = 2;
const INITIAL_ALUMNI_PAGE_NUMBER = 1;

module.exports = {
  fetchAllData,
};

function fetchAllData(dataEndpoints) {
  debug('Starting to fetch all data..');
  return Promise.all(dataEndpoints.map((config) => fetchAndSave(config)));
}

async function fetchAndSave(config, fetchedEntries = []) {
  const { url, name } = config;
  debug(`Fetching ${url}`);

  const { data } = await axios.get(url);

  if (data && data.results) {
    fetchedEntries = await appendDetailData(fetchedEntries, data.results);
  }

  if (data.next) {
    return fetchAndSave({
      url: data.next,
      name,
    }, fetchedEntries);
  }

  if (name === 'REPS') {
    const alumnis = await fetchAlumniInfo();
    fetchedEntries = fetchedEntries.concat(alumnis);
  }

  const outputFile = path.join(__dirname, DATA_PATH, `${name}.json`);
  debug(`Writing data to ${outputFile}`);
  return fs.writeFile(outputFile, JSON.stringify(fetchedEntries, null, JSON_SPACES), { flag: 'w' }); // eslint-disable-line security/detect-non-literal-fs-filename
}

async function appendDetailData(existingEntries, newEntries) {
  const detailData = await async.mapSeries(newEntries, async (entry) => {
    debug(`Fetching ${entry._url}`);
    const response = await axios.get(entry._url);
    return response.data;
  });

  return existingEntries.concat(detailData);
}

async function fetchAlumniInfo(fetchedEntries = [], page = INITIAL_ALUMNI_PAGE_NUMBER) {
  const newlyFetchedEntries = await processAlumniPage(page);
  fetchedEntries = fetchedEntries.concat(newlyFetchedEntries);

  if (page < ALUMNI_PAGES) {
    return fetchAlumniInfo(fetchedEntries, ++page);
  }

  return fetchedEntries;
}

async function processAlumniPage(page) {
  const url = `${ALUMNI_BASE_URL}${page}`;
  debug(`Fetching ${url}`);
  const dom = await JSDOM.fromURL(url);
  const { document } = dom.window;
  const tableRows = document.querySelectorAll('.dashboard-table tbody tr');

  const alumnis = [];
  tableRows.forEach((tableRowNode) => {
    const tableRowCellsNodes = tableRowNode.querySelectorAll('td');

    const [
      fullNameNode,
      nameNode,
      joinedNode,
      leftNode,
      ,
      countryNode,
    ] = tableRowCellsNodes;
    const fullNameContent = fullNameNode.textContent;
    const fullName = fullNameContent.trim().replace(/\n/g, '');

    alumnis.push({
      alumni: true,
      full_name: fullName, // eslint-disable-line camelcase
      display_name: nameNode.textContent, // eslint-disable-line camelcase
      date_joined_program: joinedNode.dataset.time, // eslint-disable-line camelcase
      date_left_program: leftNode.dataset.time, // eslint-disable-line camelcase
      country: countryNode.textContent,
    });
  });

  return alumnis;
}
