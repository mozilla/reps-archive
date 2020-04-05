'use strict';

const debug = require('debug')('reps-archive:event');
const fs = require('fs').promises;
const path = require('path');
const async = require('async');
const datalayer = require('./datalayer');
const templates = require('./templates');

const DIST_PATH = '../dist/events/';

module.exports = {
  generateEvents,
};

async function generateEvents() {
  const allEvents = datalayer.getEvents();
  await async.mapSeries(allEvents, generateEvent);
}

async function generateEvent(event) {
  const skeletonTemplate = await templates.loadTemplate('skeleton.tpl.html');
  const eventTemplate = await templates.loadTemplate('event.tpl.html');
  debug(`Generating event file for ${event.urlName}..`);

  const eventContent = await eventTemplate.render({
    event,
  });
  const content = await skeletonTemplate.render({ content: eventContent });

  await saveEvent(content, event.urlName);
}

function saveEvent(fileContent, eventName) {
  const eventPath = path.join(__dirname, DIST_PATH, `${eventName}.html`);
  return fs.writeFile(eventPath, fileContent, { flag: 'w' });
}
