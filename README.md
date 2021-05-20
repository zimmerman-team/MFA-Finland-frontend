
# MFA Transparency Portal


---
Zimmerman was commissioned to deliver the Transparency Data Portal for the Finnish Ministry for Foreign affairs (MFA). Part of the work was to integrate the open data provided in the IATI datastandard by MFA into a web application (website). The work was delivered in between october 2020 and may 2021 and soft launched in June 2021.

It makes use of the dataservice [IATI Cloud](http://iati.cloud/)  which extracts all open data annotated in the IATI datastandard and extracted from the [IATI Registry](http://www.iatiregistry.org/publisher) and makes the data available in [Apache Solr](https://iati.cloud/documentation), allowing for fast querying of the data. 


IATI is a global aid transparency standard and it makes information about aid spending easier to access, re-use and understand the underlying data using a unified open standard. You can find more about the IATI data standard at: [www.iatistandard.org](www.iatistandard.org)

## API Documentation
Full API documentation for iati.cloud can be found at [docs.iati.cloud](https://iati.cloud/documentation).

## About the project
- Website: [www.openaid.fi ](https://beta.openaid.fi)
- Authors: [Zimmerman B.V.](https://www.zimmerman.team/)
- License: AGPLv3 
- Github Repo: [github.com/zimmerman-team/MFA-Finland-frontend/](https://github.com/zimmerman-team//MFA-Finland-frontend/)
- Bug Tracker: [github.com/zimmerman-team//MFA-Finland-frontend/issues](https://github.com/zimmerman-team//MFA-Finland-frontendissues)

## Can I contribute?
Yes! We are mainly looking for coders to help on the project. If you are a coder feel free to _Fork_ the repository and send us your amazing Pull Requests!

## How should I contribute?
Python already has clear PEP 8 code style guidelines, so it's difficult to add something to it, but there are certain key points to follow when contributing:
- PEP 8 code style guidelines should always be followed. Tested with `flake8 OIPA`.
- [Commitlint](https://github.com/conventional-changelog/commitlint#what-is-commitlint) is used to check your commit messages.
- Always try to reference issues in commit messages or pull requests ("related to #614", "closes #619" and etc.).
- Avoid huge code commits where the difference can not even be rendered by browser based web apps (Github for example). Smaller commits make it much easier to understand why and how the  changes were made, why (if) it results in certain bugs and etc.
- When developing a new feature, write at least some basic tests for it. This helps not to break other things in the future. Tests can be run with `pytest`
- If there's a reason to commit code that is commented out (there usually should be none), always leave a "FIXME" or "TODO" comment so it's clear for other developers why this was done.
- When using external dependencies that are not in PyPI (from Github for example), stick to a particular commit (i. e. `git+https://github.com/Supervisor/supervisor@ec495be4e28c694af1e41514e08c03cf6f1496c8#egg=supervisor`), so if the library is updated, it doesn't break everything
- Automatic code quality / testing checks (continuous integration tools) are implemented to check all these things automatically when pushing / merging new branches. Quality is the key!

## Who currently makes use of IATI.cloud?
- Dutch Ministry of Foreign Affairs: [www.openaid.nl](https://www.openaid.nl)
- FCDO Devtracker: [devtracker.dfid.gov.uk](https://devtracker.dfid.gov.uk/)
- UNESCO Transparency Portal: [opendata.unesco.org](https://opendata.unesco.org)
- Netherlands Enterprise Agency: [aiddata.rvo.nl](https://aiddata.rvo.nl/)
- Mohinga AIMS: [mohinga.info](http://mohinga.info/en/)
- UN-Habitat: [open.unhabitat.org](http://open.unhabitat.org)
- Overseas Development Institute: [ODI.org](https://transparency.odi.org/)
- UN Migration: [IOM.int](https://www.iom.int/)
- AIDA [AIDA.tools](https://www.aida.tools/)
- IATI Datastore


& many others


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
