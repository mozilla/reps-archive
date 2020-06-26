import test from 'ava';
import nock from 'nock';
import sinon from 'sinon';
import fs from 'fs';
import path from 'path';
import fetch from '../../lib/fetch';

const BASE_URL = 'https://reps.mozilla.org';
const REPS_ENDPOINT = '/api/remo/v1/users';
const ALUMNI_ENDPOINT = '/people/alumni';

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

  const ALUMNI_FIXTURE = await fs.promises.readFile(path.join(__dirname, '..', 'fixtures', 'alumni.html'), 'utf8');
  new Array(26).fill(0)
    .forEach((_, index) => {
      nock(BASE_URL)
        .get(`${ALUMNI_ENDPOINT}/?page=${index + 1}`)
        .reply(200, ALUMNI_FIXTURE);
    });

  await fetch.fetchAllData([{
    url: `${BASE_URL}${REPS_ENDPOINT}`,
    name: 'REPS',
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
  const reps = JSON.parse(writeArgument);
  t.is(reps.length, 3 + (20 * 26));
  t.deepEqual(reps[0], expected[0]);
  t.deepEqual(reps[1], expected[1]);
  t.deepEqual(reps[2], expected[2]);
  t.deepEqual(reps[3], {
    alumni: true,
    full_name: 'Pierros Papadeas', // eslint-disable-line camelcase
    display_name: 'pierros', // eslint-disable-line camelcase
    date_joined_program: '2011-06-11T00:00:00', // eslint-disable-line camelcase
    date_left_program: '2017-06-06T00:00:00', // eslint-disable-line camelcase
    country: 'Greece',
  });
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
