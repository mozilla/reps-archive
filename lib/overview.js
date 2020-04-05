'use strict';

const debug = require('debug')('reps-archive:overview');
const fs = require('fs').promises;
const path = require('path');
const datalayer = require('./datalayer');
const templates = require('./templates');

const DIST_PATH = '../dist/';

module.exports = {
  generateOverview,
};

async function generateOverview() {
  const skeletonTemplate = await templates.loadTemplate('skeleton.tpl.html');
  const overviewTemplate = await templates.loadTemplate('overview.tpl.html');
  debug('Generating overview file..');
  const allReps = datalayer.getReps();
  const allEvents = datalayer.getEvents();

  const overviewContent = await overviewTemplate.render({
    allReps,
    allEvents,
  });
  const content = await skeletonTemplate.render({ content: overviewContent });

  await saveOverview(content);
}

function saveOverview(fileContent) {
  const overviewPath = path.join(__dirname, DIST_PATH, 'index.html');
  return fs.writeFile(overviewPath, fileContent, { flag: 'w' });
}
