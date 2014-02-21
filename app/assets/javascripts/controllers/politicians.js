// Get our bioguide
var bioguide = $('.primary-key').attr('data-id');

// Define our controller
var cont = ge.controller();

// Get all the PACS
//var getPacs = $.get('//default-environment-ygymzummgf.elasticbeanstalk.com/politicians/' + bioguide + '/contributions/pacs', { start: '05-05-2003', end: '05-05-2013', unit: 'congress' }, function(data) {
var getPacs = $.get('/temp/pacs.json', function(data) {
	var $barSelector = $('#pacs-bar');
	var $pieSelector = $('#pacs-pie');
	
	$barSelector.append($('<h4>')
		.addClass('text-center')
		.text('Top 5 PAC Contributors')
	);
	
	$pieSelector.append($('<h4>')
		.addClass('text-center')
		.text('Top 5 PAC Contributors')
	);
	
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
	
	var cfContributions = cf.dimension(function(c) { return +c.contribution_sum; });
	var cfCongress = cf.dimension(function(c) { return +c.congress; });
	var cfNames = cf.dimension(function(c) { return c.pac_name; });
	
	var cfNamesReduce = cfNames.group().reduceSum(function(c) { return +c.contribution_sum; });
	
	var top = cfNamesReduce.top(1);
	
	var pacsBar = ge.graph({
		type: 'verticalBar',
		width: 400,
		height: 300,
		selector: $barSelector,
		margins: {
			top: 20,
			bottom: 20,
			left: 0,
			right: 0
		},
		colors: warmColors,
		data: cf,
		dimensions: [
			{
				data: cfNamesReduce,
				keySelector: 'key',
				valueSelector: 'value'
			},
			{
				data: cfContributions,
				keySelector: 'pac_name',
				valueSelector: 'contribution_sum'
			},
			{
				data: cfCongress,
				keySelector: 'pac_name',
				valueSelector: 'contribution_sum'
			}
		],
		ticks: ge.graph().makeTicks(top),
		size: 5
	});
	
	var pacsPie = ge.graph({
		type: 'pie',
		width: 400,
		height: 400,
		selector: $pieSelector,
		margins: {
			top: 20,
			bottom: 20,
			left: 0,
			right: 0
		},
		colors: warmColors,
		data: cf,
		dimensions: [
			{
				data: cfNamesReduce,
				keySelector: 'key',
				valueSelector: 'value'
			},
			{
				data: cfContributions,
				keySelector: 'pac_name',
				valueSelector: 'contribution_sum'
			},
			{
				data: cfCongress,
				keySelector: 'pac_name',
				valueSelector: 'contribution_sum'
			}
		],
		size: 5
	});
	
	cont.addGraph(pacsBar);
	cont.addGraph(pacsPie);
});

// Get all the industries
//var getIndustries = $.get('//default-environment-ygymzummgf.elasticbeanstalk.com/politicians/' + bioguide + '/contributions/industries', { start: '05-05-2003', end: '05-05-2013', unit: 'congress' }, function(data) {
var getIndustries = $.get('/temp/industries.json', function(data) {
	var $barSelector = $('#industries-bar');
	var $pieSelector = $('#industries-pie');
	
	$barSelector.append($('<h4>')
		.addClass('text-center')
		.text('Top 5 Industry Contributors')
	);
	
	$pieSelector.append($('<h4>')
		.addClass('text-center')
		.text('Top 5 Industry Contributors')
	);
	
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
				industry_id: item.industry_id,
				industry_name: item.industry_name,
				sector: item.sector,
				sector_long: item.sector_long
			});
		}
	}
	
	var cf = crossfilter(transform.contributions);
	
	var cfContributions = cf.dimension(function(c) { return +c.contribution_sum; });
	var cfCongress = cf.dimension(function(c) { return +c.congress; });
	var cfNames = cf.dimension(function(c) { return c.industry_name; });
	
	var cfNamesReduce = cfNames.group().reduceSum(function(c) { return +c.contribution_sum; });
	
	cfCongress.filter([108, 109 + 1]);
	
	var top = cfNamesReduce.top(1);
	
	var industriesBar = ge.graph({
		type: 'verticalBar',
		width: 400,
		height: 300,
		selector: $barSelector,
		margins: {
			top: 20,
			bottom: 20,
			left: 0,
			right: 0
		},
		colors: coolColors,
		data: cf,
		dimensions: [
			{
				data: cfNamesReduce,
				keySelector: 'key',
				valueSelector: 'value'
			},
			{
				data: cfContributions,
				keySelector: 'industry_name',
				valueSelector: 'contribution_sum'
			},
			{
				data: cfCongress,
				keySelector: 'industry_name',
				valueSelector: 'contribution_sum'
			}
		],
		ticks: ge.graph().makeTicks(top),
		size: 5
	});
	
	var industriesPie = ge.graph({
		type: 'pie',
		width: 400,
		height: 400,
		selector: $pieSelector,
		margins: {
			top: 20,
			bottom: 20,
			left: 0,
			right: 0
		},
		colors: coolColors,
		data: cf,
		dimensions: [
			{
				data: cfNamesReduce,
				keySelector: 'key',
				valueSelector: 'value'
			},
			{
				data: cfContributions,
				keySelector: 'pac_name',
				valueSelector: 'contribution_sum'
			},
			{
				data: cfCongress,
				keySelector: 'pac_name',
				valueSelector: 'contribution_sum'
			}
		],
		size: 5
	});
	
	cont.addGraph(industriesBar);
	cont.addGraph(industriesPie);
});

// Tell jQuery's AJAX to be patient
$.when(getPacs, getIndustries).done(function() {
	// Hide the loader
	$('.loader').fadeOut(250, function() {		
		// Let's rock and roll
		cont.render();
		
		// No need for this shit anymore...
		$('.primary-key').remove();

		// Tell me what ya got
		console.log(cont.listGraphs());
	});
});