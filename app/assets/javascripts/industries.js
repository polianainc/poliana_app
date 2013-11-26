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
				tempCont.run(data);
				
				$('#industrySlug, #industryID').remove();
			});
		}	
		this.populateData = function(type, data) {
			var newData;
			
			if(type == "party") {
				console.log(data);
				newData = partyFormat;
				newData.children[0].size = data.monthly_total.democrat_sum;
				newData.children[1].size = data.monthly_total.republican_sum;
				newData.children[2].size = data.monthly_total.independent_sum;
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
					.attr('class', 'h4Pad')
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
			var thirdPct = parseInt((sorted[2].value / partyTotals) * 100);

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

				$center.css('margin-top', (groupHeight / 2) - (centerHeight / 2) - 2).css('margin-left', (groupWidth / 2) - (centerWidth / 2) - 3);
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
		this.init = function(data) {
			console.log(data);
		}
		this.update = function(data) {
			console.log(data);
		}
	}
	
	var mostPaidPoliticians = function() {
		this.init = function(data) {
			console.log(data);
		}
		this.update = function(data) {
			console.log(data);
		}
	}
	
	var leastPaidPoliticians = function() {
		this.init = function(data) {
			console.log(data);
		}
		this.update = function(data) {
			console.log(data);
		}
	}
	
	var cont = new controller();
	cont.init();
	
	$('h1').on('click', function() {
		var time = new Date().getTime();
		cont.update("You clicked the title of industry " + $('#industryID').html() + " at time of " + time);
	});
})();