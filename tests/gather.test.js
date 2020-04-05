import test from 'ava';
import sinon from 'sinon';
import mockedEnv from 'mocked-env';
import fs from 'fs';
import datalayer from '../lib/datalayer';
import overview from '../lib/overview';
import rep from '../lib/rep';
import event from '../lib/event';
import fetch from '../lib/fetch';
import gather from '../gather';

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.sandbox.stub(fetch, 'fetchAllData');
  t.context.sandbox.stub(fs.promises, 'mkdir');
  t.context.sandbox.stub(datalayer, 'loadDataIntoMemory');
  t.context.sandbox.stub(overview, 'generateOverview');
  t.context.sandbox.stub(rep, 'generateProfiles');
  t.context.sandbox.stub(event, 'generateEvents');
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('should start fetch if FETCH true', async (t) => {
  const restore = mockedEnv({
    FETCH: 'true',
  });

  await gather.start();
  t.true(fetch.fetchAllData.calledOnce);

  restore();
});

test.serial('should start fetch if FETCH false', async (t) => {
  const restore = mockedEnv({
    FETCH: 'false',
  });

  await gather.start();
  t.false(fetch.fetchAllData.calledOnce);

  restore();
});

test.serial('should start fetch if FETCH missing', async (t) => {
  const restore = mockedEnv({
    FETCH: undefined,
  });

  await gather.start();
  t.false(fetch.fetchAllData.calledOnce);

  restore();
});

test.serial('should load data', async (t) => {
  const restore = mockedEnv({
    FETCH: undefined,
  });

  await gather.start();
  t.true(datalayer.loadDataIntoMemory.calledOnce);

  restore();
});

test.serial('should create folders', async (t) => {
  const restore = mockedEnv({
    FETCH: undefined,
  });

  await gather.start();
  t.is(fs.promises.mkdir.callCount, 3);

  restore();
});

test.serial('should generate overview', async (t) => {
  const restore = mockedEnv({
    FETCH: undefined,
  });

  await gather.start();
  t.true(overview.generateOverview.calledOnce);

  restore();
});

test.serial('should generate profiles', async (t) => {
  const restore = mockedEnv({
    FETCH: undefined,
  });

  await gather.start();
  t.true(rep.generateProfiles.calledOnce);

  restore();
});

test.serial('should generate events', async (t) => {
  const restore = mockedEnv({
    FETCH: undefined,
  });

  await gather.start();
  t.true(event.generateEvents.calledOnce);

  restore();
});
