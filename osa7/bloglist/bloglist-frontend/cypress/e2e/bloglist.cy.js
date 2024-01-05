import { blogs } from './testBlogs'

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'supersecret',
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'supersecret' })
      cy.createTestBlog(blogs[0])
      cy.createTestBlog(blogs[1])
      cy.createTestBlog(blogs[2])
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('Brave New Blog')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('http://fakeurl.org')
      cy.get('#createButton').click()

      cy.contains('Brave New Blog')
    })

    it('User can like a blog', function () {
      cy.contains('React patterns').click()
      cy.contains('likes 7')
      cy.contains('like').click()

      cy.contains('React patterns').click()
      cy.contains('likes 8')
    })

    it('User can delete their blog', function () {
      cy.contains('React patterns').click()
      cy.get('#deleteButton').click()
      cy.clock()

      cy.get('#success')
        .should('contain', 'Blog deleted')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.tick(3000)
      cy.get('#success').should('not.exist')

      cy.get('html').should('not.contain', 'React patterns')
    })

    it('Only user that added blog can see delete button', function () {
      cy.contains('Test User logged in')
      cy.contains('React patterns').click()
      cy.get('#deleteButton').should('exist')

      cy.contains('logout').click()

      const secondUser = {
        username: 'second',
        name: 'Second User',
        password: 'sosecret',
      }
      cy.request('POST', 'http://localhost:3003/api/users/', secondUser)
      cy.login({
        username: secondUser.username,
        password: secondUser.password,
      })

      cy.contains('Second User logged in')
      cy.contains('React patterns').click()
      cy.get('#delete').should('not.exist')
    })

    it('Blogs are ordered by amount of likes', function () {
      cy.get('.blog').eq(0).should('contain', 'Canonical string reduction')
      cy.get('.blog').eq(1).should('contain', 'React patterns')
      cy.get('.blog')
        .eq(2)
        .should('contain', 'Go To Statement Considered Harmful')

      cy.contains('Go To Statement Considered Harmful').click()
      cy.contains('like').click()
      cy.contains('Go To Statement Considered Harmful').click()
      cy.contains('like').click()
      cy.contains('Go To Statement Considered Harmful').click()
      cy.contains('like').click()

      cy.get('.blog').eq(0).should('contain', 'Canonical string reduction')
      cy.get('.blog')
        .eq(1)
        .should('contain', 'Go To Statement Considered Harmful')
      cy.get('.blog').eq(2).should('contain', 'React patterns')
    })
  })
})
