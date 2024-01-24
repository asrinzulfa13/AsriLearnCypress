describe("Environemnt KMB API Dev", () => {
	it("Set environment to DEV", function () {
		cy.writeFile('../../setup_env.json', { env: 'dev' })

		cy.readFile('../../setup_env.json').then((set) => {
			expect(set.env).to.equal('dev') // true
		})
	});
});