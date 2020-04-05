import test from 'ava';
import sinon from 'sinon';
import fs from 'fs';
import fixture from '../fixtures/data';
import datalayer from '../../lib/datalayer';

test.beforeEach(async (t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.sandbox.stub(fs.promises, 'readFile');
  fs.promises.readFile.onCall(0).resolves(fixture.repsString);
  fs.promises.readFile.onCall(1).resolves(fixture.eventsString);
  fs.promises.readFile.onCall(2).resolves(fixture.activitiesString);
  await datalayer.loadDataIntoMemory();
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('should return sorted Reps', async (t) => {
  const reps = await datalayer.getReps();
  t.deepEqual(reps, fixture.expectedReps);
});

test.serial('should return all events', async (t) => {
  const events = await datalayer.getEvents();
  t.deepEqual(events, fixture.events);
});

test.serial('should return all events for Rep', async (t) => {
  const events = await datalayer.getEventsForRep();
  t.deepEqual(events, fixture.events);
});

test.serial('should return activities', async (t) => {
  const activities = await datalayer.getActivitiesForRep();
  t.deepEqual(activities, fixture.activities);
});
