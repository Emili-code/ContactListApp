import faker from 'faker';

describe('Verify Edditing a Contact', () => {
    beforeEach(() => {
        cy.openPage();
    });

    it('Verify Edit Contact functionality', () => {
        cy.login();
        cy.get('.contactTableBodyRow').first().click();
        cy.get('#edit-contact').click();
          cy.get('#submit').click();
          cy.get('#return').click();
          cy.get('.contactTableBodyRow').first().within(() => {
            cy.get('td').eq(0).invoke('text').then((firstNameText) => {
                cy.get('td').eq(1).should('have.text', editedContactInfo.email);
                cy.get('td').eq(2).should('have.text', editedContactInfo.phone);
                cy.get('td').eq(3).should('have.text', editedContactInfo.address1);
                cy.get('td').eq(4).should('have.text', editedContactInfo.formattedBirthDate);
            });
          cy.logout();
        });
      });
});

