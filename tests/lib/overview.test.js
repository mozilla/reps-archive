import test from 'ava';
import sinon from 'sinon';
import fs from 'fs';
import path from 'path';
import fixture from '../fixtures/data';
import datalayer from '../../lib/datalayer';
import overview from '../../lib/overview';

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.sandbox.stub(fs.promises, 'writeFile');
  t.context.sandbox.stub(datalayer, 'getReps').resolves(fixture.expectedReps);
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('should render overview', async (t) => {
  await overview.generateOverview();
  const [, generatedContent] = fs.promises.writeFile.getCall(0).args;
  const overviewFixturePath = path.join(__dirname, '../fixtures/overview.html');
  const overviewFixture = await fs.promises.readFile(overviewFixturePath, 'utf-8');
  t.is(generatedContent, overviewFixture);
});
