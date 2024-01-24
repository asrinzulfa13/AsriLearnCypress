describe("Environemnt", () => {
	it("Set environment to TESTING", function () {
		cy.writeFile('../../setup_env.json', { env: 'testing' })

		cy.readFile('../../setup_env.json').then((set) => {
			expect(set.env).to.equal('testing') // true
		})
	});
});