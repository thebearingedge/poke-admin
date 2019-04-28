describe('User can log in.', () => {

  context('visiting the app without an active session', () => {

    it('redirects the user to login', () => {
      cy.visit('/')
      cy.location('pathname')
        .should('equal', '/login')
    })

  })

  context('attempting to log in', () => {

    beforeEach(() => cy.visit('/login'))

    context('omitting required fields', () => {

      it('displays validation errors', () => {
        cy.get('button')
          .contains('Submit')
          .click()
        cy.get('.invalid-tooltip')
          .contains('Username is a required field')
          .should('be.visible')
        cy.get('.invalid-tooltip')
          .contains('Password is a required field')
          .should('be.visible')
      })

    })

    context('filling invalid fields', () => {

      it('hides validation errors', () => {
        cy.get('button')
          .contains('Submit')
          .click()
        cy.get('[name="username"]')
          .type(`${Cypress.env('ADMIN_USERNAME')}`)
        cy.get('.invalid-tooltip')
          .contains('Username is a required field')
          .should('not.exist')
        cy.get('[name="password"]')
          .type(`${Cypress.env('ADMIN_PASSWORD')}`)
        cy.get('.invalid-tooltip')
          .should('not.exist')
      })

    })

    context('submitting invalid credentials', () => {

      it('fails and displays a modal alert', () => {
        cy.server()
        cy.route('POST', '/api/auth/login')
          .as('login')
        cy.get('[name="username"]')
          .type(`${Cypress.env('ADMIN_USERNAME')} fail`)
        cy.get('[name="password"]')
          .type(`${Cypress.env('ADMIN_PASSWORD')} fail{enter}`)
        cy.wait('@login')
          .its('status')
          .should('equal', 401)
        cy.location('pathname')
          .should('equal', '/login')
        cy.get('[role="dialog"]')
          .contains('Incorrect username or password.')
          .should('exist')
        cy.get('button')
          .contains('Dismiss')
          .click()
        cy.get('[role="dialog"]')
          .should('not.exist')
      })

    })

    context('logging in successfully', () => {

      beforeEach(() => cy.seed('admin'))

      it('redirects the user to the index page', () => {
        cy.server()
        cy.route('POST', '/api/auth/login')
          .as('login')
        cy.get('[name="username"]')
          .type(Cypress.env('ADMIN_USERNAME'))
        cy.get('[name="password"]')
          .type(`${Cypress.env('ADMIN_PASSWORD')}{enter}`)
        cy.wait('@login')
          .its('status')
          .should('equal', 201)
        cy.location('pathname')
          .should('equal', '/')
      })

    })

  })

  context('visiting the login page with an active session', () => {

    beforeEach(() => cy.login())

    it('redirects the user to the index page', () => {
      cy.visit('/login')
      cy.location('pathname')
        .should('equal', '/')
    })

  })

})
