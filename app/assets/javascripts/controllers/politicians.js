var $key = $('.primary-key');

// If this is a single politician page
if($key.length > 0) {
	// Get our bioguide
	var bioguide = $key.attr('data-id');
	var startDate = $key.attr('data-start');
	var endDate = $key.attr('data-end');

	// Define our controller
	var cont = ge.controller();

	// Get all the PACS
	//var getPacs = $.get('http://poliana-staging.elasticbeanstalk.com/politicians/' + bioguide + '/contributions/pacs', { start: startDate, end: endDate, unit: 'congress' }, function(data) {
	var getPacs = $.get('/temp/pacs.json', function(data) {
		var $barSelector = $('#pacs-bar');

		var title = "Top 5 PAC Contributors";

		var $info = $('<div>')
			.addClass('other hide')
			.html("<h3 class='text-center'>What is a PAC?</h3><p>A political action committee (PAC) is an organization that raises and spends campaign contributions for the express purpose of advocating for the election or defeat of candidates seeking federal office. Typically associated with business, labor, or ideological interests, its contributions are considered “hard money”. The Federal Election Commission places limits on how much an individual can give to a PAC as well as how much a PAC can give directly to a candidate.</p><p>In this chart, we see the top 5 PACs that advocated in favor of a politician during a certain time range. Note that these figures include expenditures far beyond direct contributions to the candidate. Move and expand the timeline to see how these PAC contributions have changed over time.</p><p><a href='http://wiki.poliana.com/index.php/Political_Action_Committees_(PACs)' target='_blank'>Click here to know more?</a></p>" + dataPartners);

		$barSelector.append($('<h4>')
			.addClass('text-center')
			.text(title)
		);

		$barSelector.append($info);

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
				top: 30,
				bottom: 15,
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
					data: cfCongress,
					keySelector: 'pac_name',
					valueSelector: 'contribution_sum'
				}
			],
			size: 5,
			filterDimension: 1
		});

		cont.addGraph(pacsBar);
	});

	// Get all the industries
	//var getIndustries = $.get('http://poliana-staging.elasticbeanstalk.com/politicians/' + bioguide + '/contributions/industries', { start: startDate, end: endDate, unit: 'congress' }, function(data) {
	var getIndustries = $.get('/temp/industries.json', function(data) {
		var $barSelector = $('#industries-bar');

		var title = "Top 5 Industry Contributors";

		var $info = $('<div>')
			.addClass('other hide')
			.html("<h3 class='text-center'>What is an industry?</h3><p>Each business sector in the United States has its own special interests, and each contributes heavily to candidates who will advance those interests. In this chart, the totals represent the aggregate amount of contributions from all individuals, businesses, and PACs associated with a particular industry and made in favor of this politician for the given timerange. Move and expand the scrubber to see how these industry contributions have changed over time.</p><p><a href='http://wiki.poliana.com/index.php/Industries' target='_blank'>Click here to know more?</a></p>" + dataPartners);

		$barSelector.append($('<h4>')
			.addClass('text-center')
			.text(title)
		);

		$barSelector.append($info);

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
				top: 30,
				bottom: 15,
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
					data: cfCongress,
					keySelector: 'industry_name',
					valueSelector: 'contribution_sum'
				}
			],
			size: 5,
			filterDimension: 1
		});

		cont.addGraph(industriesBar);
	});

	// Tell jQuery's AJAX to be patient
	$.when(getPacs, getIndustries).done(function(pacs, industries) {
		// Hide the loader
		$loader.fadeOut(250, function() {
			var $timelineArea = $('#timeline-area');
			var $timelineSelect = $('#timeline-select');

			var title = "Timeline";

			$timelineArea.append($('<h4>')
				.text(title)
			);

			var allData = [];

			sumArrays(pacs[0].totals, allData);
			sumArrays(industries[0].totals, allData);

			function sumArrays(array, finalArray) {
				$.each(array, function() {
					var orig = this;
					var count = 0;

					$.each(finalArray, function() {
						if(this.key == orig.key) {
							count++;

							if(orig.value > 0)
								this.value += orig.value;
						}
					});

					if(count === 0) {
						if(orig.value >= 0)
							finalArray.push({ group: "Total Contributions", key: orig.key, value: orig.value });
						else
							finalArray.push({ group: "Total Contributions", key: orig.key, value: 0 });
					}
				});
			}

			var timelineScrub = ge.graph({
				type: 'scrubber',
				width: 940,
				height: 100,
				selector: $timelineArea,
				secondarySelector: $timelineSelect,
				margins: {
					top: 20,
					bottom: 20,
					left: 0,
					right: 0
				},
				colors: monoColors,
				data: [ allData ],
				controller: cont
			});

			cont.addGraph(timelineScrub);

			// Let's rock and roll
			cont.render();

			$timelineSelect.find('option').each(function() {
				if($(this).val() !== "all") {
					var value = parseInt($(this).val()).ordinate();
					var found = false;

					$timelineArea.find('.tick-text').each(function() {
						if($(this).text() === value)
							found = true;
					});

					if(!found)
						$(this).remove();
				}
			});

			// No need for this shit anymore...
			$('.primary-key').remove();
		});
	});
}
else {
	console.log("Index");
}
