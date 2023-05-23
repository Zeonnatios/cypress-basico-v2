/// <reference types="cypress"/>

describe('Página Privacy', () => { 
  it('testa a página da política de privacidade de forma independente', () => {
    cy.visit('src/privacy.html');
  });
});