// Get our bioguide
var bioguide = $('#primary-key').attr('data-id');

// Define our controller
var cont = ge.controller();

// Get all the PACS
//var getPacs = $.get('//default-environment-ygymzummgf.elasticbeanstalk.com/politicians/' + bioguide + '/contributions/pacs', { start: '05-05-2003', end: '05-05-2013', unit: 'congress' }, function(data) {
var getPacs = $.get('/temp/pacs.json', function(data) {
	// Format data from API return to our specifications
	var transform = {};
	var firstItem = data[Object.keys(data)[0]][0];
	
	transform.bioguide_id = firstItem.bioguide_id;
	transform.first_name = firstItem.first_name;
	transform.last_name = firstItem.last_name;
	transform.party = firstItem.party;
	transform.religion = firstItem.religion;
	transform.contributions = [];
	
	for(var key in data) {
		for(var i = 0; i < data[key].length; i++) {
			var item = data[key][i];
			transform.contributions.push({
				congress: item.congress,
				contribution_count: item.contribution_count,
				contribution_sum: item.contribution_sum,
				pac_id: item.pac_id,
				pac_name: item.pac_name
			});
		}
	}
	
	var cf = crossfilter(transform.contributions);
	
	var cf_contributions = cf.dimension(function(c) { return +c.contribution_sum; });
	var cf_congress = cf.dimension(function(c) { return +c.congress; });
	
	var pacsBar = ge.graph({
		type: 'verticalBar',
		width: 400,
		height: 300,
		selector: $('#pacs-bar'),
		margins: {
			top: 60,
			bottom: 20,
			left: 0,
			right: 0
		},
		colors: warmColors,
		data: cf,
		primaryDimension: cf_contributions,
		otherDimensions: {
			congress: cf_congress
		},
		size: 5,
		keySelector: 'pac_name',
		valueSelector: 'contribution_sum'
	});
	
	cont.addGraph(pacsBar);
});

// Get all the industries
//var getIndustries = $.get('//default-environment-ygymzummgf.elasticbeanstalk.com/politicians/' + bioguide + '/contributions/industries', { start: '05-05-2003', end: '05-05-2013', unit: 'congress' }, function(data) {
var getIndustries = $.get('/temp/industries.json', function(data) {
	var industriesBar = ge.graph({
		type: 'verticalBar',
		width: 400,
		height: 400,
		selector: $('#industries-bar'),
		margins: {
			top: 40,
			bottom: 30,
			left: 20,
			right: 10
		},
		colors: coolColors,
		data: data
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