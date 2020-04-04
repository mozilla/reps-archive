'use strict';

const fetch = require('./lib/fetch');

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

(async function() {
  const { FETCH } = process.env;
  if (FETCH && FETCH === 'true') {
    await fetch.fetchAllData(ENDPOINTS);
  }
})();
