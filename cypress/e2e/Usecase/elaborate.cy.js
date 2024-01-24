/// <reference types="cypress" />

context('Hit Elaborate LTV KMB', () => {
  const apiUrl = `${Cypress.env("elaborateUrl")}`;
  const clientKey = `${Cypress.env("clientKey")}`;

  it('Test Case ELA001', () => {
    const TestCaseELA001 = {
      ProspectID: "TESTROAO09062300001",
      BranchID: "477",
      BPKBName: "K",
      CustomerStatus: "RO/AO",
      CategoryCustomer: "REGULAR",
      ResultPefindo: "PASS",
      TotalBakiDebet: null,
      Tenor: 13,
      ManufacturingYear: "2017",
      OTR: 10000000,
      NTF: 4000000
    };


    const
      expect_code = 9601,
      expect_decision = "PASS",
      expect_reason = "PASS - Elaborated Scheme"

    cy.request('POST', apiUrl, {
      client_key: clientKey,
      data: TestCaseELA001
    })
      .then((response) => {
        expect(response).property('status').to.equal(200)
        expect(response.body).to.have.property('errors', null)
        expect(response.body.data.code).to.eq(expect_code)
        expect(response.body.data.decision).to.eq(expect_decision)
        expect(response.body.data.reason).to.eq(expect_reason)
      })
  })

  it('Test Case ELA002', () => {
    const TestCaseELA002 = {
      ProspectID: "TESTROAO09062300002",
      BranchID: "477",
      BPKBName: "O",
      CustomerStatus: "NEW",
      CategoryCustomer: "",
      ResultPefindo: "PASS",
      TotalBakiDebet: null,
      Tenor: 12,
      ManufacturingYear: "2017",
      OTR: 1000000,
      NTF: 4000000
    };


    const
      expect_code = 9603,
      expect_decision = "REJECT",
      expect_reason = "REJECT - NTF Tidak Sesuai Threshold",
      expect_ltv = 90

    cy.request('POST', apiUrl, {
      client_key: clientKey,
      data: TestCaseELA002
    })
      .then((response) => {
        expect(response).property('status').to.eq(200)
        expect(response.body).to.have.property('errors', null)
        expect(response.body.data.code).to.eq(expect_code)
        expect(response.body.data.decision).to.eq(expect_decision)
        expect(response.body.data.reason).to.eq(expect_reason)
        expect(response.body.data.ltv).to.eq(expect_ltv)
      })
  })

  it("error when invalid TotalBakiDebet", function () {

    const TestNegativeCase = {
      ProspectID: "TESTROAO09062300003",
      BranchID: "426",
      BPKBName: "O",
      CustomerStatus: "RO/AO",
      CategoryCustomer: "REGULAR",
      ResultPefindo: "REJECT",
      TotalBakiDebet: null,
      Tenor: 21,
      ManufacturingYear: "2017",
      OTR: 1000000,
      NTF: 4000000
    };

    cy.request({
      method: "POST",
      url: `${apiUrl}`,
      failOnStatusCode: false,
      body:
      {
        client_key: clientKey,
        data: TestNegativeCase
      }
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.errors.length).to.eq(1);
      expect(response.body).to.have.property("data", null)
      expect(response.body.errors).to.be.a("array")
      expect(response.body.errors[0].field).to.eq("total_baki_debet")
    });
  });
})
