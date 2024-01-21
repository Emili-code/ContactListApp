// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import faker from 'faker';

import dayjs from 'dayjs';
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

Cypress.Commands.add("openPage", () => {
  const activeEnv = Cypress.env('deployment-env');
  cy.visit(Cypress.env(activeEnv).baseUrl);
  cy.location('pathname').should('eq', '/');
});

Cypress.Commands.add("login", () => {
  cy.get("#email").type(Cypress.env("username"));
  cy.get("#password").type(Cypress.env("password"));
  cy.get("#submit").click();
});

Cypress.Commands.add('navigateTo', url => {
  const activeEnvironment = Cypress.env('deployment-env');
  cy.visit(Cypress.env(activeEnvironment).baseUrl + url);
});

Cypress.Commands.add('submitMandatoryFormData', () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  cy.get('#firstName').type(firstName);
  cy.get('#lastName').type(lastName);
  cy.get("#submit").click();
  Cypress.env('firstName', firstName);
  Cypress.env('firstName', firstName);
});

Cypress.Commands.add('submitForm', () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const birthDate = faker.date.past().toLocaleDateString('en-US');
  const email = faker.internet.email();
  const phone = faker.phone.phoneNumber();
  const address1 = faker.address.streetAddress();
  const city = faker.address.city();
  const postalCode = faker.address.zipCode();
  const country = faker.address.country();
  cy.get('#firstName').type(firstName);
  cy.get('#lastName').type(lastName);
  cy.get('#birthdate').type(birthDate);
  cy.get('#email').type(email);
  cy.get('#phone').type(phone);
  cy.get('#street1').type(address1);
  cy.get('#city').type(city);
  cy.get('#postalCode').type(postalCode);
  cy.get('#country').type(country);
  cy.get("#submit").click();
});

Cypress.Commands.add('logout', () => {
  const activeEnvironment = Cypress.env('deployment-env');
  cy.get('#logout').click().wait(2000);
  cy.url().should('eq', Cypress.env(activeEnvironment).baseUrl + '/');
});
