/* eslint security/detect-non-literal-fs-filename: 0 */

'use strict';

const debug = require('debug')('reps-archive:datalayer');
const fs = require('fs').promises;
const path = require('path');

const REPS_DATA_PATH = path.join(__dirname, '../data/REPS.json');
const EVENTS_DATA_PATH = path.join(__dirname, '../data/EVENTS.json');
const ACTIVITIES_DATA_PATH = path.join(__dirname, '../data/ACTIVITIES.json');

let repsData, eventsData, activitiesData;

module.exports = {
  loadDataIntoMemory,
  getReps,
  getEvents,
  getEventsForRep,
  getActivitiesForRep,
};

async function loadDataIntoMemory() {
  debug('Loading data into memory..');
  const reps = JSON.parse(await fs.readFile(REPS_DATA_PATH, 'utf-8'));
  repsData = reps.sort(sortAlphabeticallyByFullName);
  eventsData = JSON.parse(await fs.readFile(EVENTS_DATA_PATH, 'utf-8'));
  activitiesData = JSON.parse(await fs.readFile(ACTIVITIES_DATA_PATH, 'utf-8'));
}

async function getReps() {
  return repsData;
}

async function getEvents() {
  return eventsData;
}

async function getEventsForRep() {
  return eventsData;
}

async function getActivitiesForRep() {
  return activitiesData;
}

function sortAlphabeticallyByFullName(a, b) {
  const aFullname = `${a.first_name} ${a.last_name}`;
  const bFullname = `${b.first_name} ${b.last_name}`;
  if (aFullname < bFullname) {
    return -1; // eslint-disable-line no-magic-numbers
  }
  if (aFullname > bFullname) {
    return 1; // eslint-disable-line no-magic-numbers
  }
  return 0; // eslint-disable-line no-magic-numbers
}
