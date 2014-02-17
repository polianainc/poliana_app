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
				_controller.graphs.push(graph.settings());
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
				for(var i = 0; i < _controller.graphs.length; i++) {
					_controller.graphs[i].draw();
				}
				return this;
			},
			redraw: function() {
				// Compute changes in data and draw incremental changes
			}
		};
	};
	
	// data
	// render?
	// onClick
	// onHover
	// classes
	
	ge.verticalBarGraph = function(_graph) {
		// If we don't pass any settings, we have to get them from their functions, at least define _graph
		if(_graph === undefined)
			var _graph = {};
		
		// This is so that we have a jQuery-namespaced variable to work with	
		var $graph;
			
		if(_graph.selector !== undefined)
			$graph = _graph.selector;
			
		// Set our defaults
		_graph.width = _graph.width === undefined ? 400 : _graph.width;
		_graph.height = _graph.height === undefined ? 400 : _graph.height;
		_graph.colors = _graph.color === undefined ? warmColors : _graph.colors;
		_graph.crossfilter = _graph.crossfilter === undefined ? crossfilter(_graph.data) : _graph.crossfilter;
		
		if(_graph.margins === undefined)
			setMargins()
		else
			setMargins(_graph.margins);
			
		_graph.unique_id = getUniqueID();
		
		_graph.draw = function() {
			var margin = {
					top: _graph.margins.top,
					bottom: _graph.margins.bottom,
					left: _graph.margins.left,
					right: _graph.margins.right
				},
				width = _graph.width - margin.left - margin.right,
				height = _graph.height - margin.top - margin.bottom;
			
			var x = d3.scale.ordinal()
				.rangeRoundBands([0, width], .1);

			var y = d3.scale.linear()
				.range([height, 0]);

			var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom");

			var yAxis = d3.svg.axis()
				.scale(y)
				.orient("left")
				.ticks(10, "%");

			var svg = d3.select($graph.selector).append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
					
			var colors = d3.scale.ordinal()
				.domain([0, _graph.colors.length - 1])
				.range(_graph.colors);
				
			var data;
			
			/*if(_graph.dataSelector !== undefined)
				data = crossfilter(_graph.data[_graph.dataSelector]);
			else
				data = crossfilter(_graph.data);
				
			var dimension = data.dimension(function(c) { return c[_graph.dimension]; });
			
			console.log("Top 5 all-time:");
			
			dimension.top(5).forEach(function(p, i) {
				console.log(p.pac_name + " (" + p.congress + ")" + ": $" + commaSeparateNumber(p.contribution_sum));
			});
						
			console.log("Top 5 for 109th Congress:");
			
			data.dimension(function(c) { return c.congress; }).filter(110).group().order(function(c) { console.log(c); return c; }).top(5).forEach(function(p, i) {
				console.log(p.pac_name + " (" + p.congress + ")" + ": $" + commaSeparateNumber(p.contribution_sum));
			});
			
			if(data !== undefined) {				
				x.domain(data.map(function(d) { return d[_graph.keySelector]; }));
				y.domain([0, d3.max(data, function(d) { return d[_graph.valueSelector]; })]);

				svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0, " + height + ")")
					.call(xAxis);

				svg.append("g")
					.attr("class", "y axis")
					.call(yAxis)
					.append("text")
					.attr("transform", "rotate(-90)")
					.attr("y", 6)
					.attr("dy", ".71em")
					.style("text-anchor", "end")
					.text("Frequency");

				svg.selectAll(".bar")
					.data(data)
					.enter().append("rect")
						.attr("class", "bar")
						.attr("x", function(d) { return x(d[_graph.keySelector]); })
						.attr("width", x.rangeBand())
						.attr("y", function(d) { return y(d[_graph.valueSelector]); })
						.attr("height", function(d) { return height - y(d[_graph.valueSelector]); })
						.attr("fill", function(d, i) { return colors(i); });
			}
			*/
		}
		
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
		
		return {
			width: function(width) {
				_graph.width = width;
				return this;
			},
			height: function(height) {
				_graph.height = height;
				return this;
			},
			selector: function(elem) {
				_graph.selector = elem;
				$graph = _graph.selector;
				return this;
			},
			margins: function(margins) {
				setMargins(margins);
				return this;
			},
			data: function(data) {
				_graph.data = data;
				return this;
			},
			crossfilter: function(cf) {
				_graph.crossfilter = cf;
				return this;
			},
			dimensions: function(dimensions) {
				_graph.dimensions = dimensions;
				return this;
			},
			settings: function() {
				return _graph;
			}
		};
	};
	
	return ge;
})();