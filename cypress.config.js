const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 20000,
  chromeWebSecurity: false,
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    setupNodeEvents(on, config) {
    },
    // Enable the Run all Spec experimental functionality to run all the spec files at once
    experimentalRunAllSpecs: true,
    env: {
      username: "usertest@fake.com",
      password: "Password1!",
      dev: {
        baseUrl: "https://thinking-tester-contact-list.herokuapp.com",
      },
      staging: {
        baseUrl: "",
      },
    },
  },
});