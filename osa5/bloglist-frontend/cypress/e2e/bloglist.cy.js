describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'supersecret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('Login to the application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('supersecret')
      cy.get('#loginButton').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrong')
      cy.get('#loginButton').click()
      cy.clock()

      cy.get('#error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.tick(3000)
      cy.get('#error').should('not.exist')

      cy.contains('Test User logged in').should('not.exist')
    })
  })
})