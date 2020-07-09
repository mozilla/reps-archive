Mozilla Reps Archive
=====

This repository holds all old reps.mozilla.org data before we migrated to the Community Portal. It serves an index.html with a list of all Reps, and generates an HTML page per Rep, including their public profile data, events and activity reports.

Setup
-----

First install [Node](http://nodejs.org/) and clone this repository.

```
npm ci
```

Now you can run the script:

```
npm start
```

You can add `FETCH="true"` if you want to update the data, but note that this takes several hours to complete. We will run this fetch again before we shut down the Reps Portal. Until then the data is from around April 4th.
