import test from 'ava';
import fetch from '../../lib/fetch';

test.serial('should start fetch without throwing', (t) => {
  t.notThrows(() => fetch.fetchAllData());
});
