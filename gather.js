/* eslint security/detect-non-literal-fs-filename: 0 */

'use strict';

const debug = require('debug')('reps-archive:index');
const fs = require('fs').promises;
const path = require('path');

const datalayer = require('./lib/datalayer');
const fetch = require('./lib/fetch');
const overview = require('./lib/overview');

const BASE_URL = 'https://reps.mozilla.org/api/remo/v1';
const REPS_URL = `${BASE_URL}/users`;
const EVENTS_URL = `${BASE_URL}/events`;
const ACTIVITIES_URL = `${BASE_URL}/activities`;

const ENDPOINTS = [
  {
    url: REPS_URL,
    name: 'REPS',
  },
  {
    url: EVENTS_URL,
    name: 'EVENTS',
  },
  {
    url: ACTIVITIES_URL,
    name: 'ACTIVITIES',
  },
];

module.exports = {
  start,
};

async function start() {
  const { FETCH } = process.env;
  if (FETCH && FETCH === 'true') {
    await fetch.fetchAllData(ENDPOINTS);
  }

  await datalayer.loadDataIntoMemory();
  await createFolders();
  await overview.generateOverview();
}

async function createFolders() {
  debug('Creating dist folders..');
  await fs.mkdir(path.join(__dirname, 'dist'), { recursive: true });
  await fs.mkdir(path.join(__dirname, 'dist', 'reps'), { recursive: true });
  await fs.mkdir(path.join(__dirname, 'dist', 'events'), { recursive: true });
}
