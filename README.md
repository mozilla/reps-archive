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
FETCH=true npm start
```

You can leave off `FETCH="true"` if you already have a local file with the data.

Deploying a new build to gh-pages
------

The website is hosted on GitHub Pages. We are using the gh-pages branch for this. Please note that this branch only contains
the relevant output documents. So please, never try to merge this into master. To start a deployment, you can run:

```
$ npm run deploy
```

which will automatically push it to GitHub.
