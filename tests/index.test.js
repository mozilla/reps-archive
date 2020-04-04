import test from 'ava';
import sinon from 'sinon';
import mockedEnv from 'mocked-env';
import fetch from '../lib/fetch';

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.sandbox.stub(fetch, 'fetchAllData');
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('should start fetch if FETCH true', (t) => {
  const restore = mockedEnv({
    FETCH: 'true',
  });

  require('../index');
  t.true(fetch.fetchAllData.calledOnce);

  restore();
});

test.serial('should start fetch if FETCH false', (t) => {
  const restore = mockedEnv({
    FETCH: 'false',
  });

  require('../index');
  t.false(fetch.fetchAllData.calledOnce);

  restore();
});

test.serial('should start fetch if FETCH missing', (t) => {
  const restore = mockedEnv({
    FETCH: undefined,
  });

  require('../index');
  t.false(fetch.fetchAllData.calledOnce);

  restore();
});
