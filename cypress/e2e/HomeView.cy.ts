describe('Test cases for HomeView', () => {
  it('page should be loaded successfully', () => {
    cy.visit('/')
  })
  it('should render page correctly', () => {
    cy.visit('/')

    cy.get('input[name="search-input"]').should('be.visible')
    cy.contains('button', 'Search').should('be.visible')
    cy.get('h1').contains('Weather Highlights')
    cy.get('p').contains('Wind').should('be.visible')
    cy.get('p').contains('Pressure').should('be.visible')
    cy.get('p').contains('Sunrise & Sunset').should('be.visible')
    cy.get('p').contains('Temperature').should('be.visible')
    cy.get('p').contains('Feels Like').should('be.visible')
    cy.get('p').contains('Cloudiness').should('be.visible')
  })
})
