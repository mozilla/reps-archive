/* eslint camelcase: 0 */

const reps = [
  {
    first_name: 'Michael',
    last_name: 'Kohler',
    display_name: 'mkohler',
  },
  {
    first_name: 'Ruben',
    last_name: 'Martin',
    display_name: 'rmartin',
  },
  {
    first_name: 'Ioana',
    last_name: 'Chiorean',
    display_name: 'ichiorean',
  },
];

const expectedReps = [
  {
    first_name: 'Ioana',
    last_name: 'Chiorean',
    display_name: 'ichiorean',
  },
  {
    first_name: 'Michael',
    last_name: 'Kohler',
    display_name: 'mkohler',
  },
  {
    first_name: 'Ruben',
    last_name: 'Martin',
    display_name: 'rmartin',
  },
];

const events = [
  {
    name: 'CV Event',
    description: 'Some CV event',
    remo_url: 'https://reps.mozilla.org/e/cv-event/',
  },
  {
    name: 'SUMO Event',
    description: 'Some SUMO event',
    remo_url: 'https://reps.mozilla.org/e/sumo-event/',
  },
  {
    name: 'l10n Event',
    description: 'Some l10n event',
    remo_url: 'https://reps.mozilla.org/e/l10n-event/',
  },
];

const expectedEvents = [
  {
    name: 'CV Event',
    description: 'Some CV event',
    remo_url: 'https://reps.mozilla.org/e/cv-event/',
    urlName: 'cv-event',
  },
  {
    name: 'SUMO Event',
    description: 'Some SUMO event',
    remo_url: 'https://reps.mozilla.org/e/sumo-event/',
    urlName: 'sumo-event',
  },
  {
    name: 'l10n Event',
    description: 'Some l10n event',
    remo_url: 'https://reps.mozilla.org/e/l10n-event/',
    urlName: 'l10n-event',
  },
];

const activities = [
  {
    activity: 'Attended Event',
    description: 'I did something!',
  },
  {
    name: 'Worked on Project Planning',
    description: 'I did it!',
  },
  {
    name: 'Created Bug',
    description: 'I filed it!',
  },
];

module.exports = {
  reps,
  repsString: JSON.stringify(reps),
  expectedReps,
  events,
  eventsString: JSON.stringify(events),
  expectedEvents,
  activities,
  activitiesString: JSON.stringify(activities),
};
