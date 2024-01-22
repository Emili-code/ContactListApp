import faker from 'faker';

describe('Verify Editing a Contact', () => {
    beforeEach(() => {
        cy.openPage();
    });

    it('Verify Edit Contact functionality', () => {
        cy.login();
        let originalData;
        cy.get('.contactTableBodyRow').first().within(() => {
            originalData = cy.get('td').eq(0).invoke('text');
        });
        cy.get('.contactTableBodyRow').first().click();
        cy.get('#edit-contact').click();
        cy.editContact();
        cy.get('#return').click();
        cy.get('.contactTableBodyRow').first().within(() => {
            cy.get('td').eq(0).should('not.be.empty').and('not.have.text', originalData);
        });
        cy.logout();
    });
});