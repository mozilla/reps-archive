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
  return fs.writeFile(outputFile, JSON.stringify(fetchedEntries), { flag: 'w' }); // eslint-disable-line security/detect-non-literal-fs-filename
}

async function appendDetailData(existingEntries, newEntries) {
  const detailData = await async.mapSeries(newEntries, async (entry) => {
    debug(`Fetching ${entry._url}`);
    const response = await axios.get(entry._url);
    return response.data;
  });

  return existingEntries.concat(detailData);
}

async function fetchAlumniInfo(fetchedEntries = [], page = 1) {
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

    const fullNameContent = tableRowCellsNodes[0].textContent;
    const fullName = fullNameContent.replace(/\s+/g, '').replace(/\n/g, '');

    alumnis.push({
      alumni: true,
      full_name: fullName,
      display_name: tableRowCellsNodes[1].textContent,
      date_joined_program: tableRowCellsNodes[2].dataset.time,
      data_left_program: tableRowCellsNodes[3].dataset.time,
      country: tableRowCellsNodes[5].textContent,
    });
  });

  return alumnis;
}
