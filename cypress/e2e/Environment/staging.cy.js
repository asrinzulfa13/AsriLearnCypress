describe("Environemnt", () => {
	it("Set environment to STAGING", function () {
		cy.writeFile('../../setup_env.json', { env: 'staging' })

		cy.readFile('../../setup_env.json').then((user) => {
			expect(user.env).to.equal('staging') // true
		})
	});
});