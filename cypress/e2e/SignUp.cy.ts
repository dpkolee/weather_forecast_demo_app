describe('Test cases for SignUpView', () => {
  it('user should be able to sign up and create account', () => {
    cy.visit('/sign-up')

    // fill in the form
    cy.fixture('example.json').then((data) => {
      cy.get('input[type="email"]').type(data.email)
      cy.get('input[name="password"]').type(data.password)
      cy.get('input[name="confirm-password"]').type(data.password)
    })

    // submit the form
    cy.get('button').contains('Sign Up').click()
    cy.url().should('include', '/')
    cy.contains('button', 'Sign Out').should('be.visible')
    cy.contains('button', 'Profile').should('be.visible')
  })
})
