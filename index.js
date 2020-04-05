/* eslint security/detect-non-literal-fs-filename: 0 */

'use strict';

const gather = require('./gather');

(async function() {
  await gather.start();
})();
