describe('Check the elements on Discovery Page', () => {
    beforeEach(() => {
      // Discovery Page
      cy.visit('http://localhost:3000/discover')
    })

    it.skip('displays the search bar', () => {
        cy.get('.sc-bkkeKt').should('have.text', 'Search ...')
      })
})