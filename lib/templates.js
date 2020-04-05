'use strict';

const debug = require('debug')('reps-archive:templates');
const fs = require('fs').promises;
const path = require('path');
const Mustache = require('mustache');

module.exports = {
  loadTemplate,
};

async function loadTemplate(fileName) {
  const templatePath = path.join(__dirname, '../templates', fileName);
  const template = await fs.readFile(templatePath, 'utf-8');

  return {
    render: (data) => {
      debug(`Rendering template ${fileName}`);
      return Mustache.render(template, data);
    },
  };
}
