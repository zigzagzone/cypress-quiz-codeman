// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("prepareData", function (fixturePath = "", aliasName = "alias") {
    cy.fixture("header")
    .as("headers")

    cy.fixture("endpoint")
    .as("endpoints")

    cy.fixture(fixturePath)
    .as(aliasName)
})

Cypress.Commands.add("checkVersion", function () {
    cy.request({
        url: this.endpoints.checkVersion,// baseUrl is at cypress.json
        method: "GET",
        headers: this.headers,
        auth: {
            bearer: this.getTokenResponse.body.access_token,
        },
    }).as("checkVersionResponse")
})