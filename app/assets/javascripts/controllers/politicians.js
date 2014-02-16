// Get our bioguide
var bioguide = $('#primary-key').attr('data-id');

// Define our controller
var cont = ge.controller();

// Get all the PACS
//var getPacs = $.get('//default-environment-ygymzummgf.elasticbeanstalk.com/politicians/' + bioguide + '/contributions/pacs', function(data) {
var getPacs = $.get('/temp/pacs.json', function(data) {
	var pacsBar = ge.verticalBarGraph({
		width: 400,
		height: 400,
		selector: $('#pacs-bar'),
		margins: {
			all: 40
		},
		colors: warmColors
	});
	
	cont.addGraph(pacsBar);
});

// Get all the industries
//var getIndustries = $.get('//default-environment-ygymzummgf.elasticbeanstalk.com/politicians/' + bioguide + '/contributions/industries', function(data) {
var getIndustries = $.get('/temp/industries.json', function(data) {
	var industriesBar = ge.verticalBarGraph({
		width: 400,
		height: 400,
		selector: $('#industries-bar'),
		margins: {
			top: 40,
			bottom: 30,
			left: 20,
			right: 10
		},
		colors: coolColors
	});
	
	cont.addGraph(industriesBar);
});

// Tell jQuery's AJAX to be patient
$.when(getPacs, getIndustries).done(function() {
	// Hide the loader
	$('.loader').fadeOut(250, function() {
		// Let's rock and roll
		cont.render();
		$('#primary-key').remove();

		// Show me what ya got
		console.log(cont.listGraphs());
	});
});