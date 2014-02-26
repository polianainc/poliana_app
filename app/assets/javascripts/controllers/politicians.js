// Get our bioguide
var bioguide = $('.primary-key').attr('data-id');

// Define our controller
var cont = ge.controller();

// Get all the PACS
//var getPacs = $.get('//default-environment-ygymzummgf.elasticbeanstalk.com/politicians/' + bioguide + '/contributions/pacs', { start: '05-05-2003', end: '05-05-2013', unit: 'congress' }, function(data) {
var getPacs = $.get('/temp/pacs.json', function(data) {
	var $barSelector = $('#pacs-bar');
	var $pieSelector = $('#pacs-pie');
	
	var title = "Top 5 PAC Contributors";
	
	var $info = $('<div>')
		.addClass('other hide')
		.text("Top 5 PACs");
	
	$barSelector.append($('<h4>')
		.addClass('text-center')
		.text(title)
	);
	
	$pieSelector.append($('<h4>')
		.addClass('text-center')
		.text(title)
	);
	
	$barSelector.append($info);
	$pieSelector.append($info.clone());
	
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
	
	var pacReduced = cfCongress.group().reduceSum(function(c) { return +c.contribution_sum; });
	var pacTotals = pacReduced.all();
	$.each(pacTotals, function(key, value) { pacTotals[key].group = "All PACs"; });
	
	data.totals = pacTotals;
	
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
		size: 5,
		filterDimension: 2
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
		size: 5,
		filterDimension: 2
	});
	
	cont.addGraph(pacsBar);
	cont.addGraph(pacsPie);
});

// Get all the industries
//var getIndustries = $.get('//default-environment-ygymzummgf.elasticbeanstalk.com/politicians/' + bioguide + '/contributions/industries', { start: '05-05-2003', end: '05-05-2013', unit: 'congress' }, function(data) {
var getIndustries = $.get('/temp/industries.json', function(data) {
	var $barSelector = $('#industries-bar');
	var $pieSelector = $('#industries-pie');
	
	var title = "Top 5 Industry Contributors";
	
	var $info = $('<div>')
		.addClass('other hide')
		.text("Top 5 Industries");
	
	$barSelector.append($('<h4>')
		.addClass('text-center')
		.text(title)
	);
	
	$pieSelector.append($('<h4>')
		.addClass('text-center')
		.text(title)
	);
	
	$barSelector.append($info);
	$pieSelector.append($info.clone());
	
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
	
	var industryReduced = cfCongress.group().reduceSum(function(c) { return +c.contribution_sum; });
	var industryTotals = industryReduced.all();
	$.each(industryTotals, function(key, value) { industryTotals[key].group = "All Industries"; });
	
	data.totals = industryTotals;
	
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
		size: 5,
		filterDimension: 2
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
		size: 5,
		filterDimension: 2
	});
	
	cont.addGraph(industriesBar);
	cont.addGraph(industriesPie);
});

function runFilter(dimension, filter, controller) {
	for(var i = 0; i < controller.listGraphs().length; i++) {
		if(controller.getGraph(i).type !== "scrubber") {
			controller.getGraph(i).dimensions[dimension].data.filter(filter);
			//var top = controller.getGraph(i).dimensions[0].data.top(1);
			//controller.getGraph(i).ticks = ge.graph().makeTicks(top);
		}
	}
}

// Tell jQuery's AJAX to be patient
$.when(getPacs, getIndustries).done(function(pacs, industries) {
	// Hide the loader
	$loader.fadeOut(250, function() {
		var $timelineSelector = $('#timeline-area');
		
		var timelineScrub = ge.graph({
			type: 'scrubber',
			width: 940,
			height: 100,
			selector: $timelineSelector,
			margins: {
				top: 20,
				bottom: 20,
				left: 0,
				right: 0
			},
			colors: monoColors,
			data: [ pacs[0].totals, industries[0].totals ],
			controller: cont
		});
		
		cont.addGraph(timelineScrub);
		
		// Run our initial filters
		//runFilter(2, [108, 109 + 1], cont);
			
		// Let's rock and roll
		cont.render();
		
		// No need for this shit anymore...
		$('.primary-key').remove();
	});
});