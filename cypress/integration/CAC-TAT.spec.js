// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("Central de Atendimento ao Cliente TAT", () => {
  it('Verifica o título da aplicação', () => {
    cy.visit('src/index.html');

    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
    cy.title().should("to.equal", "Central de Atendimento ao Cliente TAT");
  });
});