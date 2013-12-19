(function() {
	var party, geo, most, least;
	var $graphs = $('#graphs');
	
	var partyFormat = { "name": "total", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] };
	
	var controller = function() {
		this.init = function() {
			party = new partyContributions();
			geo = new geographicBreakdown();
			most = new mostPaidPoliticians();
			least = new leastPaidPoliticians();
			
			var tempCont = this;
			
			$.get('/industries/' + $('#industrySlug').text() + "/" + $('#industryID').text(), { format: 'json' }, function(data) {
				if(data.monthly_total.democrat_sum != 0
				&& data.monthly_total.republican_sum != 0
				&& data.monthly_total.independent_sum != 0
				&& data.monthly_total.states != undefined
				&& data.monthly_total.top_recipients != undefined
				&& data.monthly_total.bottom_recipients != undefined) {
					tempCont.run(data);	
				}
				
				$graphs.append($('<p>')
					.attr('class', 'hero')
					.html('<b>Sorry, we don\'t have enough data on this industry yet.</b>')
				);
				
				$('#industrySlug, #industryID').remove();
			});
		}	
		this.populateData = function(type, data) {
			var newData;
			
			if(type == "party") {
				newData = partyFormat;
				newData.children[0].size = data.monthly_total.democrat_sum;
				newData.children[1].size = data.monthly_total.republican_sum;
				newData.children[2].size = data.monthly_total.independent_sum;
			}
			else if(type == "geo") {
				newData = new Array();
				
				$.each(data.monthly_total.states, function(key, value) {
					newData.push(value);
				});
				
				function compare(a, b) {
					if(a.sum < b.sum)
						return -1;

					if(a.sum > b.sum)
						return 1;

					return 0;
				}

				newData = newData.sort(compare).reverse();
			}
			else if(type == "most") {
				newData = new Array();

				$.each(data.monthly_total.top_recipients, function(key, value) {
					newData.push(value);
				});
				
				function compare(a, b) {
					if(a.sum < b.sum)
						return -1;

					if(a.sum > b.sum)
						return 1;

					return 0;
				}

				newData = newData.sort(compare).reverse();
			}
			else if(type == "least") {
				newData = new Array();

				$.each(data.monthly_total.bottom_recipients, function(key, value) {
					newData.push(value);
				});
				
				function compare(a, b) {
					if(a.sum < b.sum)
						return -1;

					if(a.sum > b.sum)
						return 1;

					return 0;
				}

				newData = newData.sort(compare).reverse();
			}
				
			return newData;
		}
		this.run = function(data) {
			party.init(this.populateData("party", data));
			geo.init(this.populateData("geo", data));
			most.init(this.populateData("most", data));
			least.init(this.populateData("least", data));
		}
		this.update = function(data) {
			party.update(this.populateData("party", data));
			geo.update(this.populateData("geo", data));
			most.update(this.populateData("most", data));
			least.update(this.populateData("least", data));
		}
	}
	
	var partyContributions = function() {
		var settings = {};
		
		this.init = function(data) {			
			$graphs.append($('<div>')
				.attr('class', 'large-4 small-10 large-uncentered small-centered columns graph')
				.attr('id', 'partyContributions')
				.append($('<h4>')
					.attr('class', function() { if(data != undefined) return 'h4Pad'; })
					.text('Party Contributions')
				)
				.append($('<div>')
					.attr('class', 'sharable')
					.append($('<span>')
						.attr('aria-hidden', true)
						.attr('class', 'icon-earth')
					)
					.append($('<span>')
						.text('Share')
					)
				)
			);
			
			var $party = $('#partyContributions');
			
			$party.hide();

			settings.width = 300;
			settings.height = 300;
			settings.radius = Math.min(settings.width, settings.height) / 2;
			settings.color = d3.scale.ordinal()
				.range(["#61D2D6", "#EA3556", "#888888"])
				.domain(d3.range(0, 3));

			settings.svg = d3.select("#partyContributions")
				.append("svg")
					.attr("width", "100%")
					.attr("height", "100%")
					.attr('viewBox','0 0 ' + Math.min(settings.width, settings.height) + ' ' + Math.min(settings.width, settings.height))
					.attr('preserveAspectRatio','xMinYMin')
					.append("g")
					.attr("transform", "translate(" + settings.width / 2 + "," + settings.height / 2 + ") rotate(90)");

			settings.partition = d3.layout.partition()
				.sort(null)
				.size([2 * Math.PI, settings.radius * settings.radius])
				.value(function(d) { return d.size; });

			settings.arc = d3.svg.arc()
				.startAngle(function(d) { return d.x; })
				.endAngle(function(d) { return d.x + d.dx; })
				.innerRadius(function(d) { return Math.sqrt(d.y) - 20; })
				.outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });
				
			$party.find('h4').after($('<ul>')
				.attr('class', 'legend top')
				.append($('<li>')
					.append($('<span>')
						.attr('class', 'square')
						.css('background', settings.color(0))
					)
					.append($('<span>')
						.attr('class', 'title')
						.text("Democrat")
					)
				)
				.append($('<li>')
					.append($('<span>')
						.attr('class', 'square')
						.css('background', settings.color(1))
					)
					.append($('<span>')
						.attr('class', 'title')
						.text("Republican")
					)
				)
				.append($('<li>')
					.append($('<span>')
						.attr('class', 'square')
						.css('background', settings.color(2))
					)
					.append($('<span>')
						.attr('class', 'title')
						.text("Independent")
					)
				)
			);
				
			this.update(data);
		}
		this.update = function(data) {
			var $party = $('#partyContributions');
			
			var path = settings.svg.datum(data).selectAll("path")
				.data(settings.partition.nodes)
				.enter().append("path")
					.attr('d', settings.arc)
					.style('stroke-width', '1px')
					.style('stroke', '#fafafa')
					.style("fill", function(d) {
						if(d.depth == 0)
							return "#fafafa";
						else {
							if(d.name == "D")
								return settings.color(0);
							else if(d.name == "R")
								return settings.color(1);
							else
								return settings.color(2);
						}
					});
					
			var partyTotals = data.children[0].size + data.children[1].size + data.children[2].size;
			
			function compare(a, b) {
				if(a.value < b.value)
					return -1;
			
				if(a.value > b.value)
					return 1;
			
				return 0;
			}

			var sorted = data.children.sort(compare).reverse();
			
			var first = convertParty(sorted[0].name);
			var second = convertParty(sorted[1].name);
			var third = convertParty(sorted[2].name);
			
			var firstPct = parseInt((sorted[0].value / partyTotals) * 100);
			var secondPct = parseInt((sorted[1].value / partyTotals) * 100);
			var thirdPct = 100 - (firstPct + secondPct);

			$party.find('.legend').after($('<ul>')
				.attr('class', 'partyCT-center interactive')
				.append($('<li>')
					.append($('<span>')
						.attr('class', 'title')
						.text(first)
					)
					.append($('<span>')
						.attr('class', 'amount')
						.text(firstPct + "%")
					)
				)
				.append($('<li>')
					.append($('<span>')
						.attr('class', 'title')
						.text(second)
					)
					.append($('<span>')
						.attr('class', 'amount')
						.text(secondPct + "%")
					)
				)
				.append($('<li>')
					.append($('<span>')
						.attr('class', 'title')
						.text(third)
					)
					.append($('<span>')
						.attr('class', 'amount')
						.text(thirdPct + "%")
					)
				)
			);
			
			setCenter(0);
			
			$party.find('.partyCT-center').on('click', function() {
				var center = getCenter();
				
				if(center + 1 >= $(this).siblings().length - 1)
					setCenter(0);
				else
					setCenter(center + 1);
			});
			
			function setCenter(theNumber) {
				$('.partyCT-center li').removeClass('currentCenter').hide();
				$('.partyCT-center li:eq(' + theNumber + ')').addClass('currentCenter').fadeIn(250);
			}
			
			function getCenter() {
				return parseInt($('.partyCT-center li.currentCenter').index());
			}
			
			function centerPCTCenter() {
				var $group = $party.find('svg g:first-of-type');
				var groupHeight = $group[0].getBoundingClientRect().height;
				var groupWidth = $group[0].getBoundingClientRect().width;

				var $center = $party.find('.partyCT-center');
				var centerHeight = $center.height();
				var centerWidth = $center.width();

				$center.css('margin-top', (groupHeight / 2) - (centerHeight / 2) - 12).css('margin-left', (groupWidth / 2) - (centerWidth / 2) - 3);
			}
			
			function setPCTHeight() {
				var $svg = $party.find('svg');
				var width = $svg.width();

				$svg.height(width + 20);
			}

			$party.fadeIn(500);
			
			centerPCTCenter();
			setPCTHeight();
			
			$(window).on('resize', function() {
				centerPCTCenter();
				setPCTHeight();
			});
		}
	}
	
	var geographicBreakdown = function() {
		var settings = {};
		
		this.init = function(data) {
			$graphs.append($('<div>')
				.attr('class', 'large-6 large-offset-2 columns graph hide-for-small')
				.append($('<div>')
					.attr('id', 'geoCT')
					.append($('<h4>')
						.attr('class', function() { if(data.length != 0) return 'h4Pad'; })
						.text('Geographic Contributions')
					)
					.append($('<div>')
						.attr('class', 'sharable')
						.append($('<span>')
							.attr('aria-hidden', true)
							.attr('class', 'icon-earth')
						)
						.append($('<span>')
							.text('Share')
						)
					)
				)
			).append($('<div>')
				.attr('class', 'small-12 columns show-for-small')
				.append($('<h4>')
					.attr('class', function() { if(data.length != 0) return 'h4Pad'; })
					.text('Geographic Contributions')
				)
				.append($('<div>')
					.append($('<table>')
						.attr('class', 'sortable prettyTable')
						.append($('<thead>')
							.append($('<tr>')
								.append($('<th>')
									.attr('width', 140)
									.attr('data-sort', 'string')
									.text("State")
								)
								.append($('<th>')
									.attr('data-sort', 'currency')
									.text("Amount")
								)
							)
						)
						.append($('<tbody>'))
					)
				)
			);
			
			for(var i = 0; i < data.length; i++) {
				if(convertState(data[i].state, "name") != "") {
					$graphs.find('tbody').append($('<tr>')
						.append($('<td>')
							.text(convertState(data[i].state, "name"))
						)
						.append($('<td>')
							.text("$" + commaSeparateNumber(data[i].sum))
						)
					);
				}
			}
			
			var currencyToNum = function(str) {
				return str.replace('$', '').replace(/,/g, '');
			}
			
			$('table.sortable').stupidtable({
				"currency": function(a, b) {
					aDate = currencyToNum(a);
					bDate = currencyToNum(b);

					return aDate - bDate;
				}
			}).find('th:eq(0)').trigger('click');

			function getStates() {
				var states = convertState('each', 'name').split(',');
				var theString = "";

				$.each(states, function(index, value) {
					theString += '<option>' + states[index] + '</option>';
				});

				return theString;
			}
			
			var $geo = $('#geoCT');
			
			$geo.hide();
			
			settings.width = 500;
			settings.height = 500;
			settings.centered = "";

			settings.color = d3.scale.ordinal()
				.range(["#C4D117", "#CAD449", "#D1D77A", "#D7DAAC", "#DDDDDD"])
				.domain(d3.range(0, 5));

			settings.svg = d3.select("#geoCT")
				.append("svg")
					.attr("width", "100%")
					.attr("height", "100%")
					.attr('viewBox','0 0 ' + Math.min(settings.width, settings.height) + ' ' + Math.min(settings.width, settings.height))
					.attr('preserveAspectRatio','xMinYMin');

			settings.projection = d3.geo.albersUsa()
				.scale(900)
				.translate([settings.width / 2, settings.height / 2]);

			settings.path = d3.geo.path()
				.projection(settings.projection);

			settings.g = settings.svg.append("g")
				.attr("transform", "translate(" + 100 + "," + 0 + ")");
				
			$geo.find('h4').after($('<ul>')
				.attr('class', 'legend top leftFloat')
				.append($('<li>')
					.append($('<span>')
						.attr('class', 'title')
						.text("Most")
					)
					.append($('<span>')
						.attr('class', 'square')
						.css('background', settings.color(0))
					)
				)
				.append($('<li>')
					.append($('<span>')
						.attr('class', 'square')
						.css('background', settings.color(1))
					)
				)
				.append($('<li>')
					.append($('<span>')
						.attr('class', 'square')
						.css('background', settings.color(2))
					)
				)
				.append($('<li>')
					.append($('<span>')
						.attr('class', 'square')
						.css('background', settings.color(3))
					)
				)
				.append($('<li>')
					.append($('<span>')
						.attr('class', 'square')
						.css('background', settings.color(4))
					)
					.append($('<span>')
						.attr('class', 'title')
						.text("Least")
					)
				)
			);
			
			$geo.find('svg').before($('<div>')
				.attr('class', 'd3Tooltip smallCentered')
			);
				
			this.update(data);
		}
		this.update = function(data) {
			var $geo = $('#geoCT');
			
			d3.json("/assets/us.json", function(error, us) {
				settings.g.append("g")
					.selectAll("path")
					.data(topojson.feature(us, us.objects.states).features)
					.enter().append("path")
					.attr("d", settings.path)
					.attr("fill", function(d, i) {
						var myIndex = -1;
						
						$.each(data, function(index, value) {
							if(value.state == d.id)
								myIndex = index;
						});
						
						if(myIndex == -1)
							return "#888888";
						
						if(myIndex >= 0) {							
							if(myIndex >= 0 && myIndex < 10)
								return settings.color(0);
							else if(myIndex >= 10 && myIndex < 20)
								return settings.color(1);
							else if(myIndex >= 20 && myIndex < 30)
								return settings.color(2);
							else if(myIndex >= 30 && myIndex < 40)
								return settings.color(3);
							else
								return settings.color(4);
						}
					})
					.style("stroke-width", "1px")
					.style("stroke", "#fafafa")
					.attr("class", "interactive")
					.on("mouseover", function(d) { setTooltip(d.id); })
					.on("click", clicked);

				$geo.find('path').on('mouseover', function() {
					$geo.find('.d3Tooltip').show();
				}).on('mouseout', function() {
					$geo.find('.d3Tooltip').hide();
				}).on('mousemove', throttle(function(event) {
					var x = event.pageX - $geo.offset().left;
					var y = event.pageY - $geo.offset().top;

					if(x < $geo.width() / 2)
						$geo.find('.d3Tooltip').css('left', x + 20).css('top', y + 10);
					else
						$geo.find('.d3Tooltip').css('left', x + ($('.d3Tooltip').width() * -1) - 10).css('top', y + 10);
				}, 10));

				$geo.fadeIn(500);

				function clicked(d) {
					$geo.find('.d3Tooltip').fadeOut(250);

					var x, y, k;

					if(d && settings.centered !== d) {
						var centroid = settings.path.centroid(d);
						x = centroid[0] - 40;
						y = centroid[1];
						k = 3;
						settings.centered = d;
					}
					else {
						x = 147;
						y = settings.height / 2;
						k = 1;
						settings.centered = null;
					}

					settings.g.selectAll("path")
						.classed("active", settings.centered && function(d) { return d === settings.centered; });

					settings.g.transition()
						.duration(500)
						.attr("transform", "translate(" + settings.width / 2 + "," + settings.height / 2 + ") scale(" + k + ") translate(" + -x + "," + -y + ")");

					$geo.find('.d3Tooltip').fadeIn(250);
				}

				function setTooltip(theID) {
					var theState = convertState(theID, "name");
					var amount;
					
					$.each(data, function(index, value) {
						if(value.state == theID) {
							amount = value.sum;
							return;
						}
					});

					$geo.find('.d3Tooltip').html('').append($('<h5>')
						.text(theState)
						.append($('<p>')
							.html(function() {
								if(amount != undefined)
									return "Contributions: <i>$" + commaSeparateNumber(amount) + "</i>";
								else
									return "Contributions: <i>$0</i>";
							})
						)
					);
				}
				
				function setGCTHeight() {
					var $svg = $geo.find('svg');
					var width = $('#partyContributions').find('svg').width();

					$svg.height(width + 20);
				}
				
				setGCTHeight();
				
				$(window).on('resize', function() {
					setGCTHeight();
				});
			});
		}
	}
	
	var mostPaidPoliticians = function() {
		var settings = {};
		
		this.init = function(data) {
			$graphs.append($('<div>')
				.attr('class', 'large-6 small-12 large-uncentered small-centered columns graph')
				.attr('id', 'mostPaid')
				.append($('<h4>')
					.text('Most Paid Politicians')
				)
				.append($('<div>')
					.attr('class', 'sharable')
					.append($('<span>')
						.attr('aria-hidden', true)
						.attr('class', 'icon-earth')
					)
					.append($('<span>')
						.text('Share')
					)
				)
			);
			
			var $mostPaid = $('#mostPaid');
			
			$mostPaid.hide();
			
			settings.width = 460;
			settings.height = 200;

			settings.x = d3.scale.ordinal()
				.rangeRoundBands([0, settings.width], .1);

			settings.y = d3.scale.linear()
				.range([settings.height, 0]);

			settings.xAxis = d3.svg.axis()
				.scale(settings.x)
				.orient("bottom");
				
			var tickVals = [];
			var iterations = 6;
			var average = data[0].sum / iterations;
			
			for(var i = 0; i < iterations; i++)
				tickVals.push(Math.floor(i * average));

			settings.yAxis = d3.svg.axis()
				.scale(settings.y)
				.tickValues(tickVals)
				.tickFormat(function(d) { return "$" + currencyNumber(d, 0); })
				.orient("left");
				
			settings.color = d3.scale.ordinal()
				.range(["#A82221", "#DB5E31", "#EDA23E", "#F2CB67", "#D6BF59"])
				.domain(d3.range(0, 5));
				
			settings.svg = d3.select("#mostPaid")
				.append("svg")
					.attr("width", "100%")
					.attr("height", "100%")
					.attr('viewBox','0 0 ' + settings.width + ' ' + settings.height)
					.attr('preserveAspectRatio','xMinYMin')
					.append("g")
					.attr("transform", "translate(" + 55 + "," + 0 + ") scale(0.87)");
					
			$mostPaid.find('svg').after($('<ul>')
				.attr('class', 'legend bottom leftPad')
			);
			
			$.each(data, function(index, value) {
				$mostPaid.find('.legend').append($('<li>')
					.append($('<span>')
						.attr('class', 'square')
						.css('background', settings.color(index))
					)
					.append($('<a>')
						.attr('href', "/politicians/" + value.first_name.toLowerCase().replace(/\s+/g,'').replace(/"(.*?)"/ig, '') + "-" + value.last_name.toLowerCase().replace(/\s+/g,'').replace(/"(.*?)"/ig, '') + "/" + value.bioguide_id)
						.append($('<span>')
							.attr('class', 'title')
							.text(value.first_name + " " + value.last_name + " (" + convertParty(value.party, "abbrev") + " - " + value.state + ")")
						)
					)
				)
			});

			this.update(data);
		}
		this.update = function(data) {
			var $mostPaid = $('#mostPaid');
			
			data = JSON.parse(JSON.stringify(data));
			
			settings.x.domain(data.map(function(d) { return d.bioguide_id; }));
			settings.y.domain([0, d3.max(data, function(d) { return d.sum; })]);

			var yAxis = settings.svg.append("g")
				.attr("class", "y axis")
				.call(settings.yAxis);
				
			yAxis.selectAll("line")
				.attr('x1', 4)
				.attr('x2', settings.width - 4);
			
			yAxis.selectAll("text")
				.attr('font-size', '1.25em')
				.attr('x', -4);

			settings.svg.selectAll(".bar")
				.data(data)
				.enter().append("rect")
				.attr("class", "bar")
				.attr("x", function(d) { return settings.x(d.bioguide_id); })
				.attr("width", settings.x.rangeBand())
				.attr("y", function(d) { return settings.y(d.sum); })
				.attr("height", function(d) {
					if(d.sum < 0)
						d.sum = 0;
						
					return settings.height - settings.y(d.sum);
				})
				.attr("fill", function(d, i) { return settings.color(i); });
			
			$mostPaid.fadeIn(500);
			
			function setMPPHeight() {
				var $svg = $mostPaid.find('svg');
				var $group = $svg.find('g:first-of-type');
				var height = $group[0].getBoundingClientRect().height;

				$svg.height(height + 20);
			}
			
			setMPPHeight();
			
			$(window).on('resize', function() {
				setMPPHeight();
			});
		}
	}
	
	var leastPaidPoliticians = function() {
		var settings = {};
		
		this.init = function(data) {
			$graphs.append($('<div>')
				.attr('class', 'large-6 small-12 large-uncentered small-centered columns graph')
				.attr('id', 'leastPaid')
				.append($('<h4>')
					.text('Least Paid Politicians')
				)
				.append($('<div>')
					.attr('class', 'sharable')
					.append($('<span>')
						.attr('aria-hidden', true)
						.attr('class', 'icon-earth')
					)
					.append($('<span>')
						.text('Share')
					)
				)
			);
			
			var $leastPaid = $('#leastPaid');
			
			$leastPaid.hide();
			
			settings.width = 460;
			settings.height = 200;

			settings.x = d3.scale.ordinal()
				.rangeRoundBands([0, settings.width], .1);

			settings.y = d3.scale.linear()
				.range([settings.height, 0]);

			settings.xAxis = d3.svg.axis()
				.scale(settings.x)
				.orient("bottom");

			var tickVals = [];
			var iterations = 6;
			var average = data[0].sum / iterations;

			for(var i = 0; i < iterations; i++)
				tickVals.push(Math.floor(i * average));

			settings.yAxis = d3.svg.axis()
				.scale(settings.y)
				.tickValues(tickVals)
				.tickFormat(function(d) { return "$" + currencyNumber(d, 0); })
				.orient("left");
				
			settings.color = d3.scale.ordinal()
				.range(["#0B486B", "#3B8686", "#79BD9A", "#A8DBA8", "#CEF0B7"])
				.domain(d3.range(0, 5));
				
			settings.svg = d3.select("#leastPaid")
				.append("svg")
					.attr("width", "100%")
					.attr("height", "100%")
					.attr('viewBox','0 0 ' + settings.width + ' ' + settings.height)
					.attr('preserveAspectRatio','xMinYMin')
					.append("g")
					.attr("transform", "translate(" + 55 + "," + 0 + ") scale(0.87)");
					
			$leastPaid.find('svg').after($('<ul>')
				.attr('class', 'legend bottom leftPad')
			);
			
			$.each(data, function(index, value) {
				$leastPaid.find('.legend').append($('<li>')
					.append($('<span>')
						.attr('class', 'square')
						.css('background', settings.color(index))
					)
					.append($('<a>')
						.attr('href', "/politicians/" + value.first_name.toLowerCase().replace(/\s+/g,'').replace(/"(.*?)"/ig, '') + "-" + value.last_name.toLowerCase().replace(/\s+/g,'').replace(/"(.*?)"/ig, '') + "/" + value.bioguide_id)
						.append($('<span>')
							.attr('class', 'title')
							.text(value.first_name + " " + value.last_name + " (" + convertParty(value.party, "abbrev") + " - " + value.state + ")")
						)
					)
				)
			});
			
			this.update(data);
		}
		this.update = function(data) {
			var $leastPaid = $('#leastPaid');
			
			data = JSON.parse(JSON.stringify(data));
			
			settings.x.domain(data.map(function(d) { return d.bioguide_id; }));
			settings.y.domain([0, d3.max(data, function(d) { return d.sum; })]);

			var yAxis = settings.svg.append("g")
				.attr("class", "y axis")
				.call(settings.yAxis);
				
			yAxis.selectAll("line")
				.attr('x1', 4)
				.attr('x2', settings.width - 4);
			
			yAxis.selectAll("text")
				.attr('font-size', '1.25em')
				.attr('x', -4);

			settings.svg.selectAll(".bar")
				.data(data)
				.enter().append("rect")
				.attr("class", "bar")
				.attr("x", function(d) { return settings.x(d.bioguide_id); })
				.attr("width", settings.x.rangeBand())
				.attr("y", function(d) { return settings.y(d.sum); })
				.attr("height", function(d) {
					if(d.sum < 0)
						d.sum = 0;
						
					return settings.height - settings.y(d.sum);
				})
				.attr("fill", function(d, i) { return settings.color(i); });
			
			$leastPaid.fadeIn(500);
			
			function setLPPHeight() {
				var $svg = $leastPaid.find('svg');
				$svg.height($('#mostPaid svg').height());
			}
			
			setLPPHeight();
			
			$(window).on('resize', function() {
				setLPPHeight();
			});
		}
	}
	
	var cont = new controller();
	cont.init();
})();