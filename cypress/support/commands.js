/// <reference types="cypress"/>

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(firstName, lastName, email, longText, phoneNumber) {

  cy.get('#firstName')
    .should('be.visible')
    .type(firstName)
    .should('have.value', firstName);

  cy.get('#lastName')
    .should('be.visible')
    .type(lastName)
    .should('have.value', lastName);

  cy.get('#email')
    .should('be.visible')
    .type(email)
    .should('have.value', email);

  cy.get('#open-text-area')
    .should('be.visible')
    .type(longText, { delay: 0 })
    .should('have.value', longText);

  cy.get('#phone')
    .should('be.visible')
    .type(phoneNumber)
    .should('have.value', phoneNumber);
  
  cy.contains('button', 'Enviar').click();
});
