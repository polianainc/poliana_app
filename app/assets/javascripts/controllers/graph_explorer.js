ge = (function() {
	"use strict"
	
	var ge = {
		version: '1.0'
	};
	
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
		_graph.primaryDimension = _graph.primaryDimension === undefined ? "" : _graph.primaryDimension;
		_graph.otherDimensions = _graph.otherDimensions === undefined ? {} : _graph.otherDimensions;
		_graph.colors = _graph.colors === undefined ? warmColors : _graph.colors;
		_graph.size = _graph.size === undefined ? 5 : _graph.size;
		_graph.type = _graph.type === undefined ? "" : _graph.type;
		_graph.keySelector = _graph.keySelector === undefined ? "" : _graph.keySelector;
		_graph.valueSelector = _graph.valueSelector === undefined ? "" : _graph.valueSelector;
		
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
			.tickSize(width)
			.tickFormat(function(d) { return "$" + currencyNumber(d, 1); });

		var svg = d3.select($graph.selector).append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.attr("class", camelToHyphen(_graph.type))
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
				
		var colors = d3.scale.ordinal()
			.domain([0, (_graph.colors.length - (_graph.colors.length - 1))])
			.range(_graph.colors);
			
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
			
			if(_graph.primaryDimension !== undefined)
				data = _graph.primaryDimension.top(_graph.size);
				
			if(data !== undefined) {				
				x.domain(data.map(function(d) { return d[_graph.keySelector]; }));
				y.domain([0, d3.max(data, function(d) { return d[_graph.valueSelector] * 1.15; })]);

				svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0, " + height + ")")
					.call(xAxis);

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
								x(d[_graph.keySelector]),
								y(d[_graph.valueSelector]),
								x.rangeBand(),
								height - y(d[_graph.valueSelector]),
								5,
								true
							);
						})
						.attr("class", "bar")
						.attr("fill", function(d, i) { return colors(i); });
						
				bars.transition()
					.delay(function(d, i){ return i * 100;})
					.duration(500)
					// We use a custom path function rather than SVG's rect element to get rounded corners
					.attr("d", function(d) {
						return topRoundedRect(
							x(d[_graph.keySelector]),
							y(d[_graph.valueSelector]),
							x.rangeBand(),
							height - y(d[_graph.valueSelector]),
							5
						);
					});
			}
		};
		
		return _graph;
	};
	
	return ge;
})();