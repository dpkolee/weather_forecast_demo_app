// https://on.cypress.io/api

describe('Test cases for SignInView', () => {
  it('user should be able to log in', () => {
    cy.visit('/sign-in')

    // fill in the form
    cy.fixture('example.json').then((data) => {
      cy.get('input[type="email"]').type(data.email)
      cy.get('input[type="password"]').type(data.password)
    })
    // submit the form
    cy.get('button').contains('Sign In').click()
    cy.url().should('include', '/')
    cy.contains('button', 'Sign Out').should('be.visible')
  })
})
