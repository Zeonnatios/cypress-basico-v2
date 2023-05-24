/// <reference types="cypress"/>

const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
  "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam," + 
  "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " +
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const phoneNumber = 1234567890;

describe("Central de Atendimento ao Cliente TAT", () => {

  const THREE_SECONDS = 3000;

  beforeEach(() => {
    cy.visit('src/index.html');
  });

  it('Verifica o título da aplicação', () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
    cy.title().should("to.equal", "Central de Atendimento ao Cliente TAT");
  });

  it('Preenche os campos obrigatórios e envia o formulário', () => {

    cy.clock();

    cy.get('#firstName')
      .should('be.visible')
      .type('Matheus')
      .should('have.value', 'Matheus');

    cy.get('#lastName')
      .should('be.visible')
      .type('Antonio')
      .should('have.value', 'Antonio');

    cy.get('#email')
      .should('be.visible')
      .type('matheusantonio@email.com')
      .should('have.value', 'matheusantonio@email.com');

    cy.get('#open-text-area')
      .should('be.visible')
      .type(text, { delay: 0 })
      .should('have.value', text);
    
    //cy.get('.button').click();
    //cy.get('button[type="submit"]').click();
    cy.contains('button', 'Enviar').click();


    cy.get('.success').should('be.visible');
    
    cy.tick(THREE_SECONDS);

    cy.get('.success').should('not.be.visible');
  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

    cy.clock();

    cy.get('#firstName')
      .should('be.visible')
      .type('Matheus')
      .should('have.value', 'Matheus');

    cy.get('#lastName')
      .should('be.visible')
      .type('Antonio')
      .should('have.value', 'Antonio');

    cy.get('#email')
      .should('be.visible')
      .type('matheusantonioemail.com');

    cy.get('#open-text-area')
      .should('be.visible')
      .type(text, { delay: 0 })
      .should('have.value', text);
    
    //cy.get('.button').click();
    cy.contains('button', 'Enviar').click();
    cy.get('.error ').should('be.visible');
    cy.tick(THREE_SECONDS);
    cy.get('.error ').should('not.be.visible');

  });

  it('Input telefone continua vazio ao tentar inserir valor não numérico', () => {
    cy.get('#phone')
    .should('be.visible')
    .type('text string', { delay: 0 })
    .should('have.value', '');
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    
    cy.clock();
    cy.get('#firstName')
      .should('be.visible')
      .type('Matheus')
      .should('have.value', 'Matheus');

    cy.get('#lastName')
      .should('be.visible')
      .type('Antonio')
      .should('have.value', 'Antonio');

    cy.get('#email')
      .should('be.visible')
      .type('matheusantonio@email.com')
      .should('have.value', 'matheusantonio@email.com');

    cy.get('#open-text-area')
      .should('be.visible')
      .type(text, { delay: 0 })
      .should('have.value', text);

    cy.get('#phone-checkbox').check();
    
    //cy.get('.button').click();
    cy.contains('button', 'Enviar').click();
    cy.get('.error ').should('be.visible');
    cy.tick(THREE_SECONDS);
    cy.get('.error ').should('not.be.visible');
  });

  Cypress._.times(5, () => {
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
      cy.get('#firstName')
      .should('be.visible')
      .type('Matheus')
      .should('have.value', 'Matheus')
      .clear()
      .should('have.value', '');

      cy.get('#lastName')
        .should('be.visible')
        .type('Antonio')
        .should('have.value', 'Antonio')
        .clear()
        .should('have.value', '');

      cy.get('#email')
        .should('be.visible')
        .type('matheusantonio@email.com')
        .should('have.value', 'matheusantonio@email.com')
        .clear()
        .should('have.value', '');

      cy.get('#open-text-area')
        .should('be.visible')
        .type(text, { delay: 0 })
        .should('have.value', text)
        .clear()
        .should('have.value', '');

      cy.get('#phone')
        .should('be.visible')
        .type(phoneNumber)
        .should('have.value', phoneNumber)
        .clear()
          .should('have.value', '');
    });
  });
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    //cy.get('.button').click();
    cy.clock();
    cy.contains('button', 'Enviar').click();
    cy.get('.error ').should('be.visible');
    cy.tick(THREE_SECONDS);
    cy.get('.error ').should('not.be.visible');
  });

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.clock();
    cy.fillMandatoryFieldsAndSubmit("Matheus", "Antonio", "matheusantonio@email.com", text, phoneNumber);
    cy.get('.success').should('be.visible');
    cy.tick(THREE_SECONDS);
    cy.get('.success ').should('not.be.visible');
  });

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube');
  });

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria');
  });

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog');
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('[type="radio"][value="feedback"]').check().should('be.checked');
    cy.get('[type="radio"]').check('feedback').should('be.checked');
    cy.get('[data-testid="feedback"]').check().should('be.checked');
  });

  it('marca cada tipo de atendimento', () => {
    cy.get('[type="radio"]')
      .should('have.length', 3)
      .each(($radio) => {
        cy.wrap($radio)
          .check()
          .should('be.checked');
      });
  });

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('#check [type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked');
  });

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should((input) => {
        console.log(input);
        expect(input[0].files[0].name).to.be.equal("example.json")
      });
  });

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
    .should('not.have.value')
    .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
    .should((input) => {
      console.log(input);
      expect(input[0].files[0].name).to.be.equal("example.json")
    });
  });

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture("example.json").as("sampleFile");
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should((input) => {
        console.log(input);
        expect(input[0].files[0].name).to.be.equal("example.json")
      });;

  });

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('[data-testid="privacy-link"]')
      .should('have.attr', 'target', '_blank');
  });

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('[data-testid="privacy-link"]')
      .invoke('removeAttr', 'target')
      .click();

      cy.title().should('to.equal', "Central de Atendimento ao Cliente TAT - Política de privacidade");
      cy.contains("Talking About Testing").should("be.visible")
  });

  it('achar o gato', () => {
    cy.get("#cat")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible");
  });

  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible');

    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible');
  });

  it('preenche a area de texto usando o comando invoke', () => {
    cy.get('#open-text-area')
    .should('be.visible')
    .invoke('val', text)
    .should('have.value', text);
  });

  it('faz uma requisição HTTP', () => {
    cy.request("https://cac-tat.s3.eu-central-1.amazonaws.com/index.html")
      .should((response) => {
        console.log(response);
        expect(response.status).equal(200);
        expect(response.statusText).equal("OK");
        expect(response.body).to.include("CAC TAT");
      });
  });
  
});