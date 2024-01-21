import faker from 'faker';

describe('Verify Adding a New Contact', () => {
    beforeEach(() => {
        cy.openPage();
    });

    it('Verify Adding a New Contact functionality', () => {
        cy.login();
        cy.get('.contactTableBodyRow').its('length').then((initialRowCount) => {
            cy.get('#add-contact').click();
            cy.submitMandatoryFormData(faker);
            cy.get('.contactTableBodyRow').should('have.length', initialRowCount +1 );
        });
        cy.logout();
    });
});