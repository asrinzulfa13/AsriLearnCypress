describe("Environemnt", () => {
	it("Set environment to PROD", function () {
		cy.writeFile('../../setup_env.json', { env: 'prod' })

		cy.readFile('../../setup_env.json').then((user) => {
			expect(user.env).to.equal('prod') // true
		})
	});
});