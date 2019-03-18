Cypress.Commands.add('login', () => {
  cy.request({
    log: false,
    method: 'POST',
    url: '/api/auth/login',
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    body: {
      username: Cypress.env('ADMIN_USERNAME'),
      password: Cypress.env('ADMIN_PASSWORD')
    }
  })
})
