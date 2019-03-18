describe('User can log in.', () => {

  context('visiting the app without an active session', () => {

    it('redirects the user to login', () => {
      cy.visit('/')
        .location()
        .should(({ pathname }) => {
          expect(pathname).to.equal('/login')
        })
    })

  })

  context('attempting to log in', () => {

    beforeEach(() => {
      cy.visit('/login')
    })

    context('omitting required fields', () => {

      it('displays validation errors', () => {
        cy.get('button')
          .contains('Submit')
          .click()
          .get('.invalid-tooltip')
          .contains('Username is a required field')
          .should('be.visible')
          .get('.invalid-tooltip')
          .contains('Password is a required field')
          .should('be.visible')
      })

    })

    context('filling invalid fields', () => {

      it('hides validation errors', () => {
        cy.get('button')
          .contains('Submit')
          .click()
          .get('[name="username"]')
          .type(`${Cypress.env('ADMIN_USERNAME')}`)
          .get('.invalid-tooltip')
          .contains('Username is a required field')
          .should('not.exist')
          .get('[name="password"]')
          .type(`${Cypress.env('ADMIN_PASSWORD')}`)
          .get('.invalid-tooltip')
          .should('not.exist')
      })

    })

    context('submitting invalid credentials', () => {

      it('fails and displays a modal alert', () => {
        cy.server()
        cy.route('POST', '/api/auth/login')
          .as('login')
        cy.get('[name="username"]')
          .type(Cypress.env('ADMIN_USERNAME') + ' fail')
          .get('[name="password"')
          .type(`${Cypress.env('ADMIN_PASSWORD')} fail{enter}`)
          .wait('@login')
          .its('status')
          .should('equal', 401)
          .location('pathname')
          .should('equal', '/login')
          .get('[role="dialog"]')
          .contains('Incorrect username or password.')
          .should('exist')
          .get('button')
          .contains('Dismiss')
          .click()
          .get('[role="dialog"]')
          .should('not.exist')
      })

    })

    context('logging in successfully', () => {

      beforeEach(() => cy.seed('admin'))

      it('redirects the user to the index page', () => {
        cy.get('[name="username"]')
          .type(Cypress.env('ADMIN_USERNAME'))
          .get('[name="password"')
          .type(`${Cypress.env('ADMIN_PASSWORD')}{enter}`)
          .location('pathname')
          .should('equal', '/')
      })

    })

  })

  context('visiting the login page with an active session', () => {

    beforeEach(() => cy.login())

    it('redirects the user to the app', () => {
      cy.visit('/login')
        .location('pathname')
        .should('equal', '/')
    })

  })

})
