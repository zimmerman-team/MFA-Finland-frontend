# MFA Transparency Portal

---

[![License: AGPLv3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://github.com/zimmerman-team/MFA-Finland-frontend/blob/main/LICENSE.MD)
[![CircleCI](https://circleci.com/gh/zimmerman-team/MFA-Finland-frontend.svg?style=svg&circle-token=bcebf25436749cfa4297687c0eee4aa1393762c0)](https://circleci.com/gh/zimmerman-team/MFA-Finland-frontend)

Zimmerman was commissioned to deliver the Transparency Data Portal for the Finnish Ministry for Foreign affairs (MFA). Part of the work was to integrate the open data provided in the IATI datastandard by MFA into a web application (website). The work was delivered in between October 2020 and May 2021 and soft launched in June 2021.

It makes use of [Data API Middleware](https://github.com/zimmerman-team//MFA-Finland-API/) in order to retrieve all data needed for the visualisations/tables/filters and detail pages.

Also makes use of a [headless CMS](https://getcockpit.com) with multilingual support.

The [Data API Middleware](https://github.com/zimmerman-team//MFA-Finland-API/) makes use of the dataservice [IATI Cloud](http://iati.cloud/) which extracts all open data annotated in the IATI datastandard and extracted from the [IATI Registry](http://www.iatiregistry.org/publisher) and makes the data available in [Apache Solr](https://iati.cloud/documentation), allowing for fast querying of the data.

IATI is a global aid transparency standard and it makes information about aid spending easier to access, re-use and understand the underlying data using a unified open standard. You can find more about the IATI data standard at: [www.iatistandard.org](www.iatistandard.org)

## API Documentation

Full API documentation for iati.cloud can be found at [iati.cloud/documentation](https://iati.cloud/documentation).

## About the project

- Website: [www.openaid.fi ](https://beta.openaid.fi)
- Authors: [Zimmerman B.V.](https://www.zimmerman.team/)
- License: AGPLv3
- Github Repo: [github.com/zimmerman-team/MFA-Finland-frontend/](https://github.com/zimmerman-team//MFA-Finland-frontend/)
- Bug Tracker: [github.com/zimmerman-team//MFA-Finland-frontend/issues](https://github.com/zimmerman-team//MFA-Finland-frontendissues)

## Can I contribute?

Yes! We are mainly looking for coders to help on the project. If you are a coder feel free to _Fork_ the repository and send us your amazing Pull Requests!

## How should I contribute?

- As we use semantic-release for automated git releases your commits must comply with the following commit types:

```
feat: A new feature
fix: A bug fix
docs: Documentation only changes
style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
refactor: A code change that neither fixes a bug nor adds a feature
perf: A code change that improves performance
test: Adding missing or correcting existing tests
chore: Changes to the build process or auxiliary tools and libraries such as documentation generation
```

- Always try to reference issues in commit messages or pull requests ("related to #614", "closes #619" and etc.).
- Avoid huge code commits where the difference can not even be rendered by browser based web apps (Github for example). Smaller commits make it much easier to understand why and how the changes were made, why (if) it results in certain bugs and etc.
- If there's a reason to commit code that is commented out (there usually should be none), always leave a "FIXME" or "TODO" comment so it's clear for other developers why this was done.
- Automatic code quality / testing checks (continuous integration tools) are implemented to check all these things automatically when pushing / merging new branches. Quality is the key!

## Available Scripts

#### NOTE:

In order to be able to successfully run or build the app you need to create an environment file `.env` in the project root directory and fill it with the following:

```
REACT_APP_API=<Data API Middleware URL>
REACT_APP_CMS_API=<CMS API URL>
REACT_APP_CMS_TOKEN=<Cockpit CMS API token>
```

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
