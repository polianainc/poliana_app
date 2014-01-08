describe("Home page", function() {	
	it("should have a heading", function() {
		loadFixtures('static_pages/index.html.erb');
		expect($('h1')).toExist();
	});
});