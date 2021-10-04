/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  const validateImage = (downloadedFilename) => {
    const downloadsFolder = Cypress.config("downloadsFolder");

    if (!downloadedFilename) {
      downloadedFilename = path.join(downloadsFolder, "download.png");
    }

    cy.readFile(downloadedFilename, "binary", { timeout: 15000 }).should(
      (buffer) => {
        // by having length assertion we ensure the file has text
        // since we don't know when the browser finishes writing it to disk
        expect(buffer.length).to.be.gt(10000);
      }
    );
  };
  // const downloadsFolder = Cypress.config('downloadsFolder');
};
