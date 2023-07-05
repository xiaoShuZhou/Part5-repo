describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Mike Johnson',
      username: 'mikej',
      password: 'password123'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('mikej')
      cy.get('#password')
        .type('password123')
      cy.get('#login-button')
        .click()
      cy.contains('Mike Johnson logged in')
    })

    it('login fails with wrong password', function() {
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('mikej')
      cy.get('#password')
        .type('wrong')
      cy.get('#login-button')
        .click()

      cy.get('#error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Mike Johnson logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mikej', password: 'password123' })
    })

    it('a new blog can be created', function() {
      cy.contains('Add new blog')
        .click()
      cy.get('#title')
        .type('First class tests')
      cy.get('#author')
        .type('Mike Johnson')
      cy.get('#url')
        .type('http://www.example.com/test.html')
      cy.contains('add')
        .click()

      cy.contains('First class tests - Mike Johnson')
    })

    it('user can like a blog', function() {
      cy.contains('Add new blog')
        .click()
      cy.get('#title')
        .type('First class tests')
      cy.get('#author')
        .type('Mike Johnson')
      cy.get('#url')
        .type('http://www.example.com/test.html')
      cy.contains('add')
        .click()

      cy.contains('First class tests - Mike Johnson')
        .click()
      cy.contains('view')
        .click()
      cy.contains('0')
      cy.get('#like-button')
        .click()
      cy.contains('1')
    })

    it('user who created a blog can delete it', function() {
      cy.contains('Add new blog')
        .click()
      cy.get('#title')
        .type('First class tests')
      cy.get('#author')
        .type('Mike Johnson')
      cy.get('#url')
        .type('http://www.example.com/test.html')
      cy.contains('add')
        .click()

      cy.contains('First class tests - Mike Johnson')
        .click()
      cy.contains('view')
        .click()
      cy.get('#remove')
        .click()

      cy.get('html').should('not.contain', 'First class tests - Mike Johnson')
    })
  })

  describe('Blogs ordered by number of likes', function() {
    beforeEach(function() {
      cy.login({ username: 'mikej', password: 'password123' })
      cy.createBlog({
        title: 'First Blog',
        author: 'Mike Johnson',
        url: 'http://example.com/first',
        likes: 5
      })

      cy.createBlog({
        title: 'Second Blog',
        author: 'Mike Johnson',
        url: 'http://example.com/second',
        likes: 10
      })

      cy.createBlog({
        title: 'Third Blog',
        author: 'Mike Johnson',
        url: 'http://example.com/third',
        likes: 2
      })
    })

    it('Blogs are sorted according to likes, with the blog with the most likes first', function() {
      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('likes 10')
        cy.wrap(blogs[1]).contains('likes 5')
        cy.wrap(blogs[2]).contains('likes 2')
      })
    })
  })
})

