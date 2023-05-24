/// <reference types="cypress"/>

describe('Página Privacy', () => { 
  Cypress._.times(5, () => {
    it('testa a página da política de privacidade de forma independente', () => {
      cy.visit('src/privacy.html');
    });
  });
});