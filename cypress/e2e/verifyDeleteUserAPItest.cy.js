import faker from 'faker';

describe('Verify deleting newly created user', () => {

    it('Create and Delete User in a Single API Test', () => {
        const userData = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        };

        cy.request({
            method: 'POST',
            url: 'https://thinking-tester-contact-list.herokuapp.com/users',
            headers: { Authorization: 'Bearer {{token}}' },
            body: userData
        }).then((createResponse) => {
            expect(createResponse.status).to.equal(201);
            expect(createResponse.body.user.firstName).to.equal(userData.firstName);
            expect(createResponse.body.user.lastName).to.equal(userData.lastName);
            expect(createResponse.body.user.email.toLowerCase()).to.equal(userData.email.toLowerCase());
            expect(createResponse.body).to.have.property('user');
            expect(createResponse.body).to.have.property('token');

            cy.log(`Created User: ${JSON.stringify(createResponse.body.user)}`);
            cy.log(`Auth Token: ${createResponse.body.token}`);
            const authToken = createResponse.body.token;
            cy.request({
                method: 'DELETE',
                url: 'https://thinking-tester-contact-list.herokuapp.com/users/me',
                headers: { Authorization: `Bearer ${authToken}` }
            }).then((deleteResponse) => {
                expect(deleteResponse.status).to.equal(200);
                cy.log('User deleted successfully');
            });
        });
    });
});