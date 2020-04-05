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

test.serial('should return sorted Reps', (t) => {
  const reps = datalayer.getReps();
  t.deepEqual(reps, fixture.expectedReps);
});

test.serial('should return all events', (t) => {
  const events = datalayer.getEvents();
  t.deepEqual(events, fixture.expectedEvents);
});

test.serial('should return all events for Rep', (t) => {
  const events = datalayer.getEventsForRep('Foo');
  t.deepEqual(events, [fixture.expectedEvents[0], fixture.expectedEvents[2]]);
});

test.serial('should return activities for Rep', (t) => {
  const activities = datalayer.getActivitiesForRep('Foo');
  t.deepEqual(activities, [fixture.activities[0], fixture.activities[2]]);
});
