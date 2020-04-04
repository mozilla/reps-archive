import test from 'ava';
import nock from 'nock';
import sinon from 'sinon';
import fs from 'fs';
import fetch from '../../lib/fetch';

const BASE_URL = 'https://reps.mozilla.org';
const REPS_ENDPOINT = `/api/remo/v1/users`;

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.sandbox.stub(fs.promises, 'writeFile');
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('should fetch and save data', async (t) => {
  nock(BASE_URL)
    .get(REPS_ENDPOINT)
    .reply(200, {
      next: `${BASE_URL}${REPS_ENDPOINT}/?page=2`,
      results: [{
        name: 'Foo',
        _url: `${BASE_URL}${REPS_ENDPOINT}/1`,
      }, {
        name: 'Bar',
        _url: `${BASE_URL}${REPS_ENDPOINT}/2`,
      }],
    });

  nock(BASE_URL)
    .get(`${REPS_ENDPOINT}/?page=2`)
    .reply(200, {
      results: [{
        name: 'Baz',
        _url: `${BASE_URL}${REPS_ENDPOINT}/3`,
      }],
    });

  nock(BASE_URL)
    .get(`${REPS_ENDPOINT}/1`)
    .reply(200, {
      name: 'Foo',
    });

  nock(BASE_URL)
    .get(`${REPS_ENDPOINT}/2`)
    .reply(200, {
      name: 'Bar',
    });

  nock(BASE_URL)
    .get(`${REPS_ENDPOINT}/3`)
    .reply(200, {
      name: 'Baz',
    });

  await fetch.fetchAllData([{
    url: `${BASE_URL}${REPS_ENDPOINT}`,
    name: 'REPS_TEST',
  }]);

  const expected = [
    {
      name: 'Foo',
    },
    {
      name: 'Bar',
    },
    {
      name: 'Baz',
    },
  ];

  t.true(fs.promises.writeFile.called);
  const [, writeArgument] = fs.promises.writeFile.getCall(0).args;
  t.is(writeArgument, JSON.stringify(expected));
});

test.serial('should throw if fetch unsuccessful', async (t) => {
  nock(BASE_URL)
    .get(REPS_ENDPOINT)
    .reply(500);

  await t.throwsAsync(() => fetch.fetchAllData([{
    url: `${BASE_URL}${REPS_ENDPOINT}`,
    name: 'REPS_TEST',
  }]));
});
