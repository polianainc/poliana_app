//= require controllers/static_pages

describe("Home page", function() {	
	it("should play a video", function() {
		var $videoLink = $('.play-video a');
		
		expect($videoLink).toExist();
	});
});