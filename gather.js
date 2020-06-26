/* eslint security/detect-non-literal-fs-filename: 0 */

'use strict';

const debug = require('debug')('reps-archive:index');
const fs = require('fs').promises;
const path = require('path');

const datalayer = require('./lib/datalayer');
const fetch = require('./lib/fetch');
const overview = require('./lib/overview');
const rep = require('./lib/rep');
const event = require('./lib/event');

const BASE_URL = 'https://reps.mozilla.org/api/remo/v1';
const REPS_URL = `${BASE_URL}/users`;
const EVENTS_URL = `${BASE_URL}/events`;
const ACTIVITIES_URL = `${BASE_URL}/activities`;

let activitiesSince = null;
let hasExistingEvents = false;
try {
  const activities = require('./data/ACTIVITIES.json');
  const firstPastActivity = activities.find((activity) => !activity.passive_report && new Date(activity.report_date) < new Date());
  activitiesSince = new Date(firstPastActivity.report_date);

  const events = require('./data/EVENTS.json');
  hasExistingEvents = Boolean(events.length);
} catch (error) {
  /* ignore */
}

const today = new Date();
const ENDPOINTS = [
  {
    url: REPS_URL,
    name: 'REPS',
    // Note: we always want to fetch all Reps, as they all could update their profile..
  },
  {
    url: EVENTS_URL,
    name: 'EVENTS',
    since: hasExistingEvents && new Date(today.getFullYear(), today.getMonth() - 6, today.getDate()), // eslint-disable-line no-magic-numbers
    dateField: 'start',
  },
  {
    url: ACTIVITIES_URL,
    name: 'ACTIVITIES',
    since: activitiesSince,
    dateField: 'report_date',
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
  await rep.generateProfiles();
  await event.generateEvents();
}

async function createFolders() {
  debug('Creating dist folders..');
  await fs.mkdir(path.join(__dirname, 'dist'), { recursive: true });
  await fs.mkdir(path.join(__dirname, 'dist', 'reps'), { recursive: true });
  await fs.mkdir(path.join(__dirname, 'dist', 'events'), { recursive: true });
}
