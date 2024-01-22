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

Cypress.Commands.add('editContact', () => {
  const firstNameMaxLength = 19;
  const firstName = faker.random.alpha({ count: firstNameMaxLength });
  const email = faker.internet.email();
  const phone = faker.phone.phoneNumberFormat().replace(/[^0-9]/g, '').slice(0, 15);
  const address1 = faker.address.streetAddress();
  let birthDate;
  let isValidDate = false;
  do {
    birthDate = faker.date.past();
    const daysInMonth = new Date(birthDate.getFullYear(), birthDate.getMonth() + 1, 0).getDate();
    isValidDate = birthDate.getDate() <= daysInMonth;
  } while (!isValidDate || birthDate.getMonth() + 1 > 12);

  const year = birthDate.getFullYear();
  const month = (birthDate.getMonth() + 1).toString().padStart(2, '0');
  const day = birthDate.getDate().toString().padStart(2, '0');
  const formattedBirthDate = `${year}/${month}/${day}`;

  cy.get('#firstName').click().clear({ force: true }).type(firstName).should('have.value', firstName);
      cy.get('#birthdate').clear().type(formattedBirthDate);
      cy.get('#email').clear({ force: true }).type(email);
      cy.get('#phone').clear().type(phone);
      cy.get('#street1').clear().type(address1);
      cy.get("#submit").click();
      return new Cypress.Promise((resolve) => {
        resolve({
          firstName,
          email,
          phone,
          address1,
          formattedBirthDate,
        });
    });
  });

Cypress.Commands.add('logout', () => {
  const activeEnvironment = Cypress.env('deployment-env');
  cy.get('#logout').click().wait(2000);
  cy.url().should('eq', Cypress.env(activeEnvironment).baseUrl + '/');
});