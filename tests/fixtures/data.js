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

const detailRep = {
  'first_name': 'Michael',
  'last_name': 'Kohler',
  'display_name': 'michaelkohler',
  'date_joined_program': '2012-11-13',
  'date_left_program': null,
  'city': 'Berlin',
  'region': 'Berlin',
  'country': 'Germany',
  'twitter_account': 'KohlerSolutions',
  'jabber_id': '',
  'irc_name': 'mkohler:mozilla.org',
  'wiki_profile_url': 'https://wiki.mozilla.org/User:Michaelkohler',
  'irc_channels': 'Mozilla Reps, mozilla.ch, and many others',
  'linkedin_url': '',
  'facebook_url': '',
  'diaspora_url': '',
  'functional_areas': [{
    'name': 'Advocacy and policy',
  }, {
    'name': 'Apps',
  }],
  'mobilising_skills': [],
  'mobilising_interests': [{
    'name': 'Browser Extensions',
  }, {
    'name': 'Testing',
  }],
  'bio': 'Since November 2012 I am a Mozilla Rep, building communities in Berlin (since April 2018) and I have helped building the \'Mozilla Switzerland\' community in the past before moving to Berlin.',
  'mentor': {
    'first_name': 'Henrik',
    'last_name': 'Mitsch',
    'display_name': 'hmitsch',
    '_url': 'https://reps.mozilla.org/api/remo/v1/users/101/',
  },
  'mozillians_profile_url': 'https://mozillians.org/en-US/u/mkohler',
  'timezone': 'Europe/Berlin',
  'groups': [{
    'name': 'Rep',
  }, {
    'name': 'Mentor',
  }],
  'remo_url': 'https://reps.mozilla.org/u/michaelkohler/',
};

const events = [
  {
    name: 'CV Event',
    description: 'Some CV event',
    remo_url: 'https://reps.mozilla.org/e/cv-event/',
    owner: {
      display_name: 'Foo',
    },
  },
  {
    name: 'SUMO Event',
    description: 'Some SUMO event',
    remo_url: 'https://reps.mozilla.org/e/sumo-event/',
    owner: {
      display_name: 'Bar',
    },
  },
  {
    name: 'l10n Event',
    description: 'Some l10n event',
    remo_url: 'https://reps.mozilla.org/e/l10n-event/',
    owner: {
      display_name: 'Foo',
    },
  },
];

const expectedEvents = [
  {
    name: 'CV Event',
    description: 'Some CV event',
    remo_url: 'https://reps.mozilla.org/e/cv-event/',
    urlName: 'cv-event',
    owner: {
      display_name: 'Foo',
    },
  },
  {
    name: 'SUMO Event',
    description: 'Some SUMO event',
    remo_url: 'https://reps.mozilla.org/e/sumo-event/',
    urlName: 'sumo-event',
    owner: {
      display_name: 'Bar',
    },
  },
  {
    name: 'l10n Event',
    description: 'Some l10n event',
    remo_url: 'https://reps.mozilla.org/e/l10n-event/',
    urlName: 'l10n-event',
    owner: {
      display_name: 'Foo',
    },
  },
];

const detailEvent = {
  'name': 'Reps Council Weekly Meeting 2020-3-31',
  'description': 'Reps Council Weekly Meeting 2020-3-31',
  'start': '2020-03-31T17:30:00Z',
  'end': '2020-03-31T18:25:00Z',
  'timezone': 'Asia/Kolkata',
  'city': 'india',
  'region': 'india',
  'country': 'India',
  'lat': -6.14716845358,
  'lon': 106.744687542,
  'owner': {
    'first_name': 'Mayur',
    'last_name': 'Patil',
    'display_name': 'yomanpatil',
    '_url': 'https://reps.mozilla.org/api/remo/v1/users/1839/',
  },
  'external_link': 'https://example.com/external',
  'initiative': 'Mozilla Reps Council',
  'categories': [{
    'name': 'Community support / participation',
  }],
  'estimated_attendance': 6,
  'planning_pad_url': 'https://example.com/planning',
  'hashtag': '',
  'remo_url': 'https://reps.mozilla.org/e/reps-council-weekly-meeting-2020-3-31/',
};

const activities = [
  {
    activity: 'Attended Event',
    initiative: 'Common Voice',
    activity_description: 'I did something!',
    report_date: '2020-01-01',
    user: {
      display_name: 'Foo',
    },
  },
  {
    activity: 'Worked on Project Planning',
    initiative: 'Common Voice',
    activity_description: 'I did it!',
    report_date: '2020-01-01',
    user: {
      display_name: 'Bar',
    },
  },
  {
    activity: 'Created Bug',
    initiative: 'Common Voice',
    activity_description: 'I filed it!',
    report_date: '2020-01-01',
    user: {
      display_name: 'Foo',
    },
  },
];

module.exports = {
  reps,
  repsString: JSON.stringify(reps),
  expectedReps,
  detailRep,
  events,
  eventsString: JSON.stringify(events),
  expectedEvents,
  detailEvent,
  activities,
  activitiesString: JSON.stringify(activities),
};
