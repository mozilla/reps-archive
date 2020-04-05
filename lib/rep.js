'use strict';

const debug = require('debug')('reps-archive:rep');
const fs = require('fs').promises;
const path = require('path');
const async = require('async');
const datalayer = require('./datalayer');
const templates = require('./templates');

const DIST_PATH = '../dist/reps/';

module.exports = {
  generateProfiles,
};

async function generateProfiles() {
  const allReps = datalayer.getReps();
  await async.mapSeries(allReps, generateProfile);
}

async function generateProfile(rep) {
  const skeletonTemplate = await templates.loadTemplate('skeleton.tpl.html');
  const repTemplate = await templates.loadTemplate('rep.tpl.html');
  debug(`Generating rep profile file for ${rep.display_name}..`);
  const events = datalayer.getEventsForRep(rep.display_name);

  const repContent = await repTemplate.render({
    rep,
    events,
  });
  const content = await skeletonTemplate.render({ content: repContent });

  await saveProfile(content, rep.display_name);
}

function saveProfile(fileContent, username) {
  const profilePath = path.join(__dirname, DIST_PATH, `${username}.html`);
  return fs.writeFile(profilePath, fileContent, { flag: 'w' });
}
