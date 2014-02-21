ge = (function() {
	"use strict"
	
	var ge = {
		version: '1.0'
	};
	
	// On click of either graph icons
	$(document).on('click', '.information .icons li', function() {
		if($(this).index() == 0) {
			console.log('information');
		}
		else {
			console.log('share');
		}
	});
	
	ge.controller = function(_controller) {
		if(_controller === undefined)
			var _controller = {};
			
		_controller.graphs = [];
			
		return {
			addGraph: function(graph) {
				_controller.graphs.push(graph);
				return this;
			},
			getGraph: function(index) {
				return _controller.graphs[index];
			},
			listGraphs: function() {
				return _controller.graphs;
			},
			settings: function() {
				return _controller;
			},
			render: function() {
				for(var i = 0; i < _controller.graphs.length; i++)
					_controller.graphs[i].render();
				
				return this;
			},
			redraw: function() {
				for(var i = 0; i < _controller.graphs.length; i++)
					_controller.graphs[i].redraw('redraw');
				
				return this;
			}
		};
	};
	
	ge.graph = function(_graph) {
		// If we don't pass any settings, we have to get them from their functions, at least define _graph
		if(_graph === undefined)
			var _graph = {};
			
		// Set our defaults
		_graph.width = _graph.width === undefined ? 400 : _graph.width;
		_graph.height = _graph.height === undefined ? 400 : _graph.height;
		_graph.selector = _graph.selector === undefined ? $('body') : _graph.selector;
		_graph.data = _graph.data === undefined ? "" : _graph.data;
		_graph.dimensions = _graph.dimensions === undefined ? {} : _graph.dimensions;
		_graph.colors = _graph.colors === undefined ? warmColors : _graph.colors;
		_graph.size = _graph.size === undefined ? 5 : _graph.size;
		_graph.type = _graph.type === undefined ? "" : _graph.type;
		_graph.ticks = _graph.ticks === undefined ? undefined : _graph.ticks;
		
		if(_graph.margins === undefined)
			setMargins();
		else
			setMargins(_graph.margins);
			
		_graph.unique_id = getUniqueID();
		
		// Trickle down our settings by calling the specific graph function
		if(_graph.type !== undefined && _graph.type !== "")
			ge[_graph.type](_graph);
		
		function getUniqueID() {
			return Math.random().toString(36).substr(2, 9);
		}
		
		function setMargins(margins) {
			var globalMargin = 20;
			
			// If no params are defined, set to our defaults
			if(margins === undefined) {
				_graph.margins = {};
				
				_graph.margins.top = globalMargin;
				_graph.margins.bottom = globalMargin;
				_graph.margins.left = globalMargin;
				_graph.margins.right = globalMargin;
			}
			// If the all param is defined, then we set all our margins to that
			else if(margins.all !== undefined) {
				_graph.margins.top = margins.all;
				_graph.margins.bottom = margins.all;
				_graph.margins.left = margins.all;
				_graph.margins.right = margins.all;
			}
			// Otherwise, we rely on being explicit, with a safeguard to fallback to globalMargin
			else {
				_graph.margins.top = margins.top === undefined ? globalMargin : margins.top;
				_graph.margins.bottom = margins.bottom === undefined ? globalMargin : margins.bottom;
				_graph.margins.left = margins.left === undefined ? globalMargin : margins.left;
				_graph.margins.right = margins.right === undefined ? globalMargin : margins.right;
			}
			
			// Delete anything useless to avoid object clutter
			for(var key in _graph.margins) {
				if(key !== 'top' && key != 'bottom' && key != 'left' && key != 'right')
					delete _graph.margins[key];
			}
		}
		
		_graph.drawIcons = function(location) {
			var icons = location.append("ul")
				.attr("class", "icons");

			icons.append("li")
				.append("span")
					.attr("aria-hidden", "true")
					.attr("class", "icon-info");

			icons.append("li")
				.append("span")
					.attr("aria-hidden", "true")
					.attr("class", "icon-bubbles");
		};
		
		_graph.drawLegend = function(location, data, key, colors) {
			var legend = location.append("ul")
				.attr("class", "legend vertical");

			var legendItems = legend.selectAll('li')
				.data(data)
				.enter().append('li')
					.style("opacity", 0)
					.each(function(d, i) {
						var li = d3.select(this);
						var iteration = i;
						
						li.append("span").style("background-color", function(d, i) { return colors(iteration); });
						li.append("p").text(function(d) { return d[key]; });
					});
					
			legendItems.transition()
				.delay(function(d, i) { return i * 100; })
				.duration(500)
				.style("opacity", 1);
		};
		
		_graph.makeTicks = function(data) {
			var top = nearest(data[0].value, 10000);
			
			return [0, top * 0.25 , top * 0.5, top * 0.75, top];
		};
		
		return _graph;
	};
	
	ge.verticalBar = function(_graph) {
		// This is so that we have a jQuery-namespaced variable to work with	
		var $graph;

		if(_graph.selector !== undefined)
			$graph = _graph.selector;
		
		var margin = {
				top: _graph.margins.top,
				bottom: _graph.margins.bottom,
				left: _graph.margins.left,
				right: _graph.margins.right
			},
			width = _graph.width - margin.left - margin.right,
			height = _graph.height - margin.top - margin.bottom;
		
		var x = d3.scale.ordinal()
			.rangeRoundBands([30, width], .05, 0.5);

		var y = d3.scale.linear()
			.range([height, 0]);

		var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom");

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("right")
			.ticks(5)
			// Defaults to nothing if _graph.ticks isn't defined
			.tickValues(_graph.ticks)
			.tickSize(width)
			.tickFormat(function(d) { return "$" + currencyNumber(d, 1); });
			
		var colors = d3.scale.ordinal()
			.domain([0, (_graph.colors.length - (_graph.colors.length - 1))])
			.range(_graph.colors);

		var svg = d3.select($graph.selector).append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.attr("class", camelToHyphen(_graph.type))
			.attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
			.attr("preserveAspectRatio", "xMidYMid")
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
				
		var aspect = (width + margin.left + margin.right) / (height + margin.top + margin.bottom);
		
		function resizeGraph() {
			var targetWidth = $graph.width();
			var $svg = $graph.find('svg');
			
			$svg.attr("width", targetWidth);
			$svg.attr("height", targetWidth / aspect);
		}
		
		resizeGraph();
		
		$(window).on("resize", function() { resizeGraph(); });
			
		function topRoundedRect(x, y, width, height, radius, start) {
			start = start === undefined ? 1 : 0;
			
			return "M" + x + "," + (_graph.height - margin.top - margin.bottom)
				+ "h" + (width - radius)
				+ "v" + (radius - height) * start
				+ "a" + radius + "," + radius + " 0 0 0 " + -radius + "," + -radius
				+ "h" + ((radius * 2) - width + radius)
				+ "a" + radius + "," + radius + " 0 0 0 " + -radius + "," + radius
				+ "z";
		}
			
		_graph.redraw = function(newData) {
			console.log(newData);
		};
		
		_graph.render = function() {
			var data;
			
			if(_graph.dimensions[0].data !== undefined)
				data = _graph.dimensions[0].data.top(_graph.size);
				
			var theKey = _graph.dimensions[0].keySelector;
			var theValue = _graph.dimensions[0].valueSelector;
				
			if(data !== undefined) {				
				x.domain(data.map(function(d) { return d[theKey]; }));
				y.domain([0, d3.max(data, function(d) { return d[theValue]; })]);
					
				var information = d3.select($graph.selector).append("div")
					.attr("class", "information");
					
				ge.graph().drawIcons(information);
					
				ge.graph().drawLegend(information, data, theKey, colors);
					
				var gy = svg.append("g")
					.attr("class", "y axis")
					.call(yAxis);
					
				gy.selectAll("g").filter(function(d) { return d; })
					.classed("minor", true);

				gy.selectAll("text")
					.attr("x", 4)
					.attr("dy", -4);

				var bars = svg.selectAll(".bar")
					.data(data)
					.enter().append("path")
						// We use a custom path function rather than SVG's rect element to get rounded corners
						.attr("d", function(d) {
							return topRoundedRect(
								x(d[theKey]),
								y(d[theValue]),
								x.rangeBand(),
								height - y(d[theValue]),
								5,
								true
							);
						})
						.attr("class", "bar")
						.attr("fill", function(d, i) { return colors(i); });
						
				bars.transition()
					.delay(function(d, i) { return i * 100; })
					.duration(500)
					// We use a custom path function rather than SVG's rect element to get rounded corners
					.attr("d", function(d) {
						return topRoundedRect(
							x(d[theKey]),
							y(d[theValue]),
							x.rangeBand(),
							height - y(d[theValue]),
							5
						);
					});
			}
		};
		
		return _graph;
	};
	
	ge.pie = function(_graph) {
		// This is so that we have a jQuery-namespaced variable to work with	
		var $graph;

		if(_graph.selector !== undefined)
			$graph = _graph.selector;
		
		var margin = {
				top: _graph.margins.top,
				bottom: _graph.margins.bottom,
				left: _graph.margins.left,
				right: _graph.margins.right
			},
			width = _graph.width - margin.left - margin.right,
			height = _graph.height - margin.top - margin.bottom,
			radius = Math.min(width, height) / 2;
			
		var colors = d3.scale.ordinal()
			.domain([0, (_graph.colors.length - (_graph.colors.length - 1))])
			.range(_graph.colors);

		var svg = d3.select($graph.selector).append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.attr("class", camelToHyphen(_graph.type))
			.attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
			.attr("preserveAspectRatio", "xMidYMid")
			.append("g")
				.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
				
		var aspect = (width + margin.left + margin.right) / (height + margin.top + margin.bottom);
		
		function resizeGraph() {
			var targetWidth = $graph.width();
			var $svg = $graph.find('svg');
			
			$svg.attr("width", targetWidth);
			$svg.attr("height", targetWidth / aspect);
		}
		
		resizeGraph();
		
		function arcTween(a) {
			var i = d3.interpolate(this._current, a);
			this._current = i(0);
			
			return function(t) {
				return arc(i(t));
			};
		}
		
		$(window).on("resize", function() { resizeGraph(); });
			
		_graph.redraw = function(newData) {
			console.log(newData);
		};
		
		_graph.render = function() {
			var data;
			
			if(_graph.dimensions[0].data !== undefined)
				data = _graph.dimensions[0].data.top(_graph.size);
				
			var theKey = _graph.dimensions[0].keySelector;
			var theValue = _graph.dimensions[0].valueSelector;
				
			if(data !== undefined) {
				var arc = d3.svg.arc()
					.outerRadius(radius - 10)
					.innerRadius(0);

				var pie = d3.layout.pie()
					.sort(null)
					.value(function(d) { return d[theValue]; });
						
				var information = d3.select($graph.selector).append("div")
					.attr("class", "information");
					
				ge.graph().drawIcons(information);

				ge.graph().drawLegend(information, data, theKey, colors);

				var g = svg.selectAll(".arc")
					.data(pie(data))
					.enter().append("g")
						.attr("class", "arc");

				var path = g.append("path")
					.style("fill", function(d, i) { return colors(i); })
					.transition()
						.delay(function(d, i) { return i * 100; })
						.duration(500)
						.attrTween('d', function(d) {
							var i = d3.interpolate(d.startAngle, d.endAngle);
							return function(t) {
								d.endAngle = i(t);
								return arc(d);
							}
						});

				g.append("text")
					.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
					.attr("dy", ".35em")
					.attr("fill", "#fafafa")
					.style("text-anchor", "middle")
					.text(function(d) { return "$" + currencyNumber(d[theValue], 1); })
					.attr("display", function(d) {
						var text = "$" + currencyNumber(d.value, 1);
						
						// We might want to play with this formula a bit...
						if(text.length / (d.endAngle - d.startAngle) > 10.25)
							return "none";
					});
			}
		};
		
		return _graph;
	};
	
	return ge;
})();