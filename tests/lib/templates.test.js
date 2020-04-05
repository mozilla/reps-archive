import test from 'ava';
import sinon from 'sinon';
import fs from 'fs';
import templates from '../../lib/templates';

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.sandbox.stub(fs.promises, 'readFile').resolves('Some template with {{data}} data');
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('should load and render template', async (t) => {
  const template = await templates.loadTemplate('test');
  const rendered = await template.render({ data: 'some' });
  t.is(rendered, 'Some template with some data');
});
