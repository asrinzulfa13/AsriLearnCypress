/// <reference types="cypress" />

let env = '';

it("Set environment", function () {
  cy.readFile('../../setup_env.json').then((set) => {
    env = set.env
    cy.log('Success set to environment ' + set.env);
  })
});

describe("Handling Check Baki Debet Rejection PBK", () => {
  context('Status Konsumen NEW', () => {

    const bedaBakiDebetSesuai = "Nama Beda & Baki Debet Sesuai Ketentuan"
    const bedaBakiDebetTidakSesuai = "Nama Beda & Baki Debet > 20 Juta"
    const samaBakiDebetSesuai = "Nama Sama & Baki Debet Sesuai Ketentuan"
    const samaWoAgunanBakiDebetSesuai = "Nama Sama & Ada Fasilitas WO Agunan"
    const bedaWoAgunanBakiDebetSesuai = "Nama Beda & Ada Fasilitas WO Agunan"
    const samaBakiDebetTidakSesuai = "Nama Sama & Baki Debet > 20 Juta"

    const dummyWoContractYesAgunanYes = {
      IDNumberBakiSesuai: "3275066006780010",
      IDNumberBakiTidakSesuai: "3275066006780011"
    }

    const dummyWoContractYesAgunanNo = {
      IDNumberBakiSesuai: "3275066006780012",
      IDNumberBakiTidakSesuai: "3275066006780013"
    }

    const dummyWoContractNoAgunanNo = {
      IDNumberBakiSesuai: "3275066006780014",
      IDNumberBakiTidakSesuai: "3275066006780015"
    }

    const param = {
      BranchID: "426",
      LegalName: "ERNY NURAENY",
      BirthPlace: "JAKARTA",
      BirthDate: "1978-06-20",
      SurgateMotherName: "KARTINAH",
      Gender: "M",
      MaritalStatus: "S",
      ProfessionID: "KRYSW",
      Spouse: null,
      MobilePhone: "089533770003"
    }

    const expect_decision = "REJECT"
    const expect_is_blacklist = 0
    const expect_baki_debet = 20000000
    const expect_code = 9107
    
    it('Test Case FLT001', () => {

      let TestCaseFLT001 = param
      TestCaseFLT001.BPKBName = "P",
        TestCaseFLT001.ProspectID = "TESTNEW18072300001",
        TestCaseFLT001.IDNumber = dummyWoContractYesAgunanYes.IDNumberBakiSesuai

      const
        expect_reason = samaWoAgunanBakiDebetSesuai,
        expect_status_konsumen = "NEW",
        expect_next_process = 0

      cy.request('POST', Cypress.env(env).filteringUrl, {
        client_key: Cypress.env(env).clientKey,
        data: TestCaseFLT001
      })
        .then((response) => {
          let baki = false

          if (response.body.data.total_baki_debet <= expect_baki_debet) {
            baki = true
          }

          expect(response).property('status').to.equal(200)
          expect(response.body).to.have.property('errors', null)
          expect(response.body.data.code).to.eq(expect_code)
          expect(response.body.data.decision).to.eq(expect_decision)
          expect(response.body.data.reason).to.eq(expect_reason)
          expect(response.body.data.status_konsumen).to.eq(expect_status_konsumen)
          expect(response.body.data.is_blacklist).to.eq(expect_is_blacklist)
          expect(response.body.data.next_process).to.eq(expect_next_process)
          expect(baki).to.be.true
        })
    });

    it('Test Case FLT002', () => {

      let TestCaseFLT002 = param
      TestCaseFLT002.BPKBName = "P",
        TestCaseFLT002.ProspectID = "TESTNEW18072300002",
        TestCaseFLT002.IDNumber = dummyWoContractYesAgunanYes.IDNumberBakiTidakSesuai

      const
        expect_reason = samaBakiDebetTidakSesuai,
        expect_status_konsumen = "NEW",
        expect_next_process = 0

       cy.request('POST', Cypress.env(env).filteringUrl, {
        client_key: Cypress.env(env).clientKey,
        data: TestCaseFLT002
      })
        .then((response) => {
          let baki = false

          if (response.body.data.total_baki_debet <= expect_baki_debet) {
            baki = true
          }

          expect(response).property('status').to.equal(200)
          expect(response.body).to.have.property('errors', null)
          expect(response.body.data.code).to.eq(expect_code)
          expect(response.body.data.decision).to.eq(expect_decision)
          expect(response.body.data.reason).to.eq(expect_reason)
          expect(response.body.data.status_konsumen).to.eq(expect_status_konsumen)
          expect(response.body.data.is_blacklist).to.eq(expect_is_blacklist)
          expect(response.body.data.next_process).to.eq(expect_next_process)
          expect(baki).to.be.false
        })
    });

    it('Test Case FLT003', () => {

      let TestCaseFLT003 = param
      TestCaseFLT003.BPKBName = "P",
        TestCaseFLT003.ProspectID = "TESTNEW18072300003",
        TestCaseFLT003.IDNumber = dummyWoContractYesAgunanNo.IDNumberBakiSesuai

      const
        expect_reason = samaBakiDebetSesuai,
        expect_status_konsumen = "NEW",
        expect_next_process = 1

       cy.request('POST', Cypress.env(env).filteringUrl, {
        client_key: Cypress.env(env).clientKey,
        data: TestCaseFLT003
      })
        .then((response) => {
          let baki = false

          if (response.body.data.total_baki_debet <= expect_baki_debet) {
            baki = true
          }

          expect(response).property('status').to.equal(200)
          expect(response.body).to.have.property('errors', null)
          expect(response.body.data.code).to.eq(expect_code)
          expect(response.body.data.decision).to.eq(expect_decision)
          expect(response.body.data.reason).to.eq(expect_reason)
          expect(response.body.data.status_konsumen).to.eq(expect_status_konsumen)
          expect(response.body.data.is_blacklist).to.eq(expect_is_blacklist)
          expect(response.body.data.next_process).to.eq(expect_next_process)
          expect(baki).to.be.true
        })
    });

    it('Test Case FLT004', () => {

      let TestCaseFLT004 = param
      TestCaseFLT004.BPKBName = "P",
        TestCaseFLT004.ProspectID = "TESTNEW18072300004",
        TestCaseFLT004.IDNumber = dummyWoContractYesAgunanNo.IDNumberBakiTidakSesuai

      const
        expect_reason = samaBakiDebetTidakSesuai,
        expect_status_konsumen = "NEW",
        expect_next_process = 0

       cy.request('POST', Cypress.env(env).filteringUrl, {
        client_key: Cypress.env(env).clientKey,
        data: TestCaseFLT004
      })
        .then((response) => {
          let baki = false

          if (response.body.data.total_baki_debet <= expect_baki_debet) {
            baki = true
          }

          expect(response).property('status').to.equal(200)
          expect(response.body).to.have.property('errors', null)
          expect(response.body.data.code).to.eq(expect_code)
          expect(response.body.data.decision).to.eq(expect_decision)
          expect(response.body.data.reason).to.eq(expect_reason)
          expect(response.body.data.status_konsumen).to.eq(expect_status_konsumen)
          expect(response.body.data.is_blacklist).to.eq(expect_is_blacklist)
          expect(response.body.data.next_process).to.eq(expect_next_process)
          expect(baki).to.be.false
        })
    });

    it('Test Case FLT009', () => {

      let TestCaseFLT009 = param
      TestCaseFLT009.BPKBName = "P",
        TestCaseFLT009.ProspectID = "TESTNEW18072300009",
        TestCaseFLT009.IDNumber = dummyWoContractNoAgunanNo.IDNumberBakiSesuai

      const
        expect_reason = samaBakiDebetSesuai,
        expect_status_konsumen = "NEW",
        expect_next_process = 1

       cy.request('POST', Cypress.env(env).filteringUrl, {
        client_key: Cypress.env(env).clientKey,
        data: TestCaseFLT009
      })
        .then((response) => {
          let baki = false

          if (response.body.data.total_baki_debet <= expect_baki_debet) {
            baki = true
          }

          expect(response).property('status').to.equal(200)
          expect(response.body).to.have.property('errors', null)
          expect(response.body.data.code).to.eq(expect_code)
          expect(response.body.data.decision).to.eq(expect_decision)
          expect(response.body.data.reason).to.eq(expect_reason)
          expect(response.body.data.status_konsumen).to.eq(expect_status_konsumen)
          expect(response.body.data.is_blacklist).to.eq(expect_is_blacklist)
          expect(response.body.data.next_process).to.eq(expect_next_process)
          expect(baki).to.be.true
        })
    });

    it('Test Case FLT010', () => {

      let TestCaseFLT010 = param
      TestCaseFLT010.BPKBName = "P",
        TestCaseFLT010.ProspectID = "TESTNEW18072300010",
        TestCaseFLT010.IDNumber = dummyWoContractNoAgunanNo.IDNumberBakiTidakSesuai

      const
        expect_reason = samaBakiDebetTidakSesuai,
        expect_status_konsumen = "NEW",
        expect_next_process = 0

       cy.request('POST', Cypress.env(env).filteringUrl, {
        client_key: Cypress.env(env).clientKey,
        data: TestCaseFLT010
      })
        .then((response) => {
          let baki = false

          if (response.body.data.total_baki_debet <= expect_baki_debet) {
            baki = true
          }

          expect(response).property('status').to.equal(200)
          expect(response.body).to.have.property('errors', null)
          expect(response.body.data.code).to.eq(expect_code)
          expect(response.body.data.decision).to.eq(expect_decision)
          expect(response.body.data.reason).to.eq(expect_reason)
          expect(response.body.data.status_konsumen).to.eq(expect_status_konsumen)
          expect(response.body.data.is_blacklist).to.eq(expect_is_blacklist)
          expect(response.body.data.next_process).to.eq(expect_next_process)
          expect(baki).to.be.false
        })
    });

    it('Test Case FLT017', () => {

      let TestCaseFLT017 = param
      TestCaseFLT017.BPKBName = "O",
        TestCaseFLT017.ProspectID = "TESTNEW18072300017",
        TestCaseFLT017.IDNumber = dummyWoContractYesAgunanYes.IDNumberBakiSesuai

      const
        expect_reason = bedaWoAgunanBakiDebetSesuai,
        expect_status_konsumen = "NEW",
        expect_next_process = 0

       cy.request('POST', Cypress.env(env).filteringUrl, {
        client_key: Cypress.env(env).clientKey,
        data: TestCaseFLT017
      })
        .then((response) => {
          let baki = false

          if (response.body.data.total_baki_debet <= expect_baki_debet) {
            baki = true
          }

          expect(response).property('status').to.equal(200)
          expect(response.body).to.have.property('errors', null)
          expect(response.body.data.code).to.eq(expect_code)
          expect(response.body.data.decision).to.eq(expect_decision)
          expect(response.body.data.reason).to.eq(expect_reason)
          expect(response.body.data.status_konsumen).to.eq(expect_status_konsumen)
          expect(response.body.data.is_blacklist).to.eq(expect_is_blacklist)
          expect(response.body.data.next_process).to.eq(expect_next_process)
          expect(baki).to.be.true
        })
    });

    it('Test Case FLT018', () => {

      let TestCaseFLT018 = param
      TestCaseFLT018.BPKBName = "O",
        TestCaseFLT018.ProspectID = "TESTNEW18072300018",
        TestCaseFLT018.IDNumber = dummyWoContractYesAgunanYes.IDNumberBakiTidakSesuai

      const
        expect_reason = bedaBakiDebetTidakSesuai,
        expect_status_konsumen = "NEW",
        expect_next_process = 0

       cy.request('POST', Cypress.env(env).filteringUrl, {
        client_key: Cypress.env(env).clientKey,
        data: TestCaseFLT018
      })
        .then((response) => {
          let baki = false

          if (response.body.data.total_baki_debet <= expect_baki_debet) {
            baki = true
          }

          expect(response).property('status').to.equal(200)
          expect(response.body).to.have.property('errors', null)
          expect(response.body.data.code).to.eq(expect_code)
          expect(response.body.data.decision).to.eq(expect_decision)
          expect(response.body.data.reason).to.eq(expect_reason)
          expect(response.body.data.status_konsumen).to.eq(expect_status_konsumen)
          expect(response.body.data.is_blacklist).to.eq(expect_is_blacklist)
          expect(response.body.data.next_process).to.eq(expect_next_process)
          expect(baki).to.be.false
        })
    });

    it('Test Case FLT019', () => {

      let TestCaseFLT019 = param
      TestCaseFLT019.BPKBName = "O",
        TestCaseFLT019.ProspectID = "TESTNEW18072300019",
        TestCaseFLT019.IDNumber = dummyWoContractYesAgunanNo.IDNumberBakiSesuai

      const
        expect_reason = bedaBakiDebetSesuai,
        expect_status_konsumen = "NEW",
        expect_next_process = 1

       cy.request('POST', Cypress.env(env).filteringUrl, {
        client_key: Cypress.env(env).clientKey,
        data: TestCaseFLT019
      })
        .then((response) => {
          let baki = false

          if (response.body.data.total_baki_debet <= expect_baki_debet) {
            baki = true
          }

          expect(response).property('status').to.equal(200)
          expect(response.body).to.have.property('errors', null)
          expect(response.body.data.code).to.eq(expect_code)
          expect(response.body.data.decision).to.eq(expect_decision)
          expect(response.body.data.reason).to.eq(expect_reason)
          expect(response.body.data.status_konsumen).to.eq(expect_status_konsumen)
          expect(response.body.data.is_blacklist).to.eq(expect_is_blacklist)
          expect(response.body.data.next_process).to.eq(expect_next_process)
          expect(baki).to.be.true
        })
    });

    it('Test Case FLT020', () => {

      let TestCaseFLT020 = param
      TestCaseFLT020.BPKBName = "O",
        TestCaseFLT020.ProspectID = "TESTNEW18072300020",
        TestCaseFLT020.IDNumber = dummyWoContractYesAgunanNo.IDNumberBakiTidakSesuai

      const
        expect_reason = bedaBakiDebetTidakSesuai,
        expect_status_konsumen = "NEW",
        expect_next_process = 0

       cy.request('POST', Cypress.env(env).filteringUrl, {
        client_key: Cypress.env(env).clientKey,
        data: TestCaseFLT020
      })
        .then((response) => {
          let baki = false

          if (response.body.data.total_baki_debet <= expect_baki_debet) {
            baki = true
          }

          expect(response).property('status').to.equal(200)
          expect(response.body).to.have.property('errors', null)
          expect(response.body.data.code).to.eq(expect_code)
          expect(response.body.data.decision).to.eq(expect_decision)
          expect(response.body.data.reason).to.eq(expect_reason)
          expect(response.body.data.status_konsumen).to.eq(expect_status_konsumen)
          expect(response.body.data.is_blacklist).to.eq(expect_is_blacklist)
          expect(response.body.data.next_process).to.eq(expect_next_process)
          expect(baki).to.be.false
        })
    });

    it('Test Case FLT025', () => {

      let TestCaseFLT025 = param
      TestCaseFLT025.BPKBName = "O",
        TestCaseFLT025.ProspectID = "TESTNEW18072300025",
        TestCaseFLT025.IDNumber = dummyWoContractNoAgunanNo.IDNumberBakiSesuai

      const
        expect_reason = bedaBakiDebetSesuai,
        expect_status_konsumen = "NEW",
        expect_next_process = 1

       cy.request('POST', Cypress.env(env).filteringUrl, {
        client_key: Cypress.env(env).clientKey,
        data: TestCaseFLT025
      })
        .then((response) => {
          let baki = false

          if (response.body.data.total_baki_debet <= expect_baki_debet) {
            baki = true
          }

          expect(response).property('status').to.equal(200)
          expect(response.body).to.have.property('errors', null)
          expect(response.body.data.code).to.eq(expect_code)
          expect(response.body.data.decision).to.eq(expect_decision)
          expect(response.body.data.reason).to.eq(expect_reason)
          expect(response.body.data.status_konsumen).to.eq(expect_status_konsumen)
          expect(response.body.data.is_blacklist).to.eq(expect_is_blacklist)
          expect(response.body.data.next_process).to.eq(expect_next_process)
          expect(baki).to.be.true
        })
    });

    it('Test Case FLT026', () => {

      let TestCaseFLT026 = param
      TestCaseFLT026.BPKBName = "O",
        TestCaseFLT026.ProspectID = "TESTNEW18072300026",
        TestCaseFLT026.IDNumber = dummyWoContractNoAgunanNo.IDNumberBakiTidakSesuai

      const
        expect_reason = bedaBakiDebetTidakSesuai,
        expect_status_konsumen = "NEW",
        expect_next_process = 0

       cy.request('POST', Cypress.env(env).filteringUrl, {
        client_key: Cypress.env(env).clientKey,
        data: TestCaseFLT026
      })
        .then((response) => {
          let baki = false

          if (response.body.data.total_baki_debet <= expect_baki_debet) {
            baki = true
          }

          expect(response).property('status').to.equal(200)
          expect(response.body).to.have.property('errors', null)
          expect(response.body.data.code).to.eq(expect_code)
          expect(response.body.data.decision).to.eq(expect_decision)
          expect(response.body.data.reason).to.eq(expect_reason)
          expect(response.body.data.status_konsumen).to.eq(expect_status_konsumen)
          expect(response.body.data.is_blacklist).to.eq(expect_is_blacklist)
          expect(response.body.data.next_process).to.eq(expect_next_process)
          expect(baki).to.be.false
        })
    });

  })
})
