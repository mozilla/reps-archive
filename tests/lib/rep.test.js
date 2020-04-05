import test from 'ava';
import sinon from 'sinon';
import fs from 'fs';
import path from 'path';
import fixture from '../fixtures/data';
import datalayer from '../../lib/datalayer';
import rep from '../../lib/rep';

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.sandbox.stub(fs.promises, 'writeFile');
  t.context.sandbox.stub(datalayer, 'getReps').returns([fixture.detailRep]);
  t.context.sandbox.stub(datalayer, 'getEventsForRep').returns(fixture.expectedEvents);
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('should render rep profile', async (t) => {
  await rep.generateProfiles();
  const [, generatedContent] = fs.promises.writeFile.getCall(0).args;
  const overviewFixturePath = path.join(__dirname, '../fixtures/rep.html');
  const overviewFixture = await fs.promises.readFile(overviewFixturePath, 'utf-8');
  t.is(generatedContent, overviewFixture);
});
