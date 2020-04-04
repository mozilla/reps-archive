'use strict';

const fetch = require('./lib/fetch');

(async function() {
  const { FETCH } = process.env;
  if (FETCH && FETCH === 'true') {
    await fetch.fetchAllData();
  }
})();
