import faker from 'faker';

describe('Verify Creating a New User', () => {
    let authToken;

    it('Create New User API Test', () => {
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
        }).then((response) => {
            expect(response.status).to.equal(201);
            expect(response.body.user.firstName).to.equal(userData.firstName);
            expect(response.body.user.lastName).to.equal(userData.lastName);
            expect(response.body.user.email.toLowerCase()).to.equal(userData.email.toLowerCase());
            expect(response.body).to.have.property('user');
            expect(response.body).to.have.property('token');
            cy.fixture('token.json').then((tokenFixture) => {
                tokenFixture.authToken = response.body.token;
            });
            cy.log(`Auth Token: ${response.body.token}`);
        });
    });
});