/* QUIZ
Cypress Backend
——————————————
1. Build an environmen setting file with "MTL_AGENCY_SMP_VERSION"  to be called with Cypress.env
2. Use Fixtures to store ALL test data the test  spec should not contains any hard-code data .
Fixture file should be prefix with version number eg, "191203-settings.json".
Use the Cypress.env with fixture
3. Use getToken with Before /api/Auth/GetToken
Then use Alias to store that token 
4. Build a Command for /api/Version
5. Before Every test spec Do check Version with BeforeEach
6.  Stuffed the call with bearer Call API with Token Alias  From (2)
7. retrieve data /api/Setting/LoadSettings
8. Cross check load settings with Fixtures
** hint **
https://docs.cypress.io/guides/guides/environment-variables.html
*/

describe("api", function() {
    before(function() {
        cy.prepareData("user/test-user", "user")
        .then(function() {
            console.log("prepareData", this.endpoints, this.user, this.headers)
            cy.request({
                url: this.endpoints.getToken,// baseUrl is at cypress.json
                method: "POST",
                headers: this.headers,
                body: {
                    ...this.user,
                },
            }).as("getTokenResponse")
        })
    })

    beforeEach(function() {
        cy.checkVersion()
        .then(function(){
            expect(this.checkVersionResponse.body)
            .to.be.eq(Cypress.env("MTL_AGENCY_SMP_VERSION"))
        })
    })

    it("should load settings correctly", function() {
        cy.fixture("mock/191201-settings.json")
        .as("mockSettings")
        cy.request({
            url: this.endpoints.loadSettings + `?agentCode=${this.user.userName}`,
            method: "GET",
            headers: this.headers,
            auth: {
                bearer: this.getTokenResponse.body.access_token,
            },
        })
        .as("loadSettingsResponse")
        .its("status") // short team of response.status
        .should("be.eq", 200) // or ("be.not.eq")
        .then(function() {
            expect(this.loadSettingsResponse.body).to.deep.eq(this.mockSettings)
        })
    })
})

