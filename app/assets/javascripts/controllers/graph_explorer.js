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
			},
			redraw: function() {
				// Compute changes in data and draw incremental changes
			}
		};
	};
	
	// colors
	// data
	// render?
	// onClick
	// onHover
	// classes
	
	ge.verticalBarGraph = function(_graph) {
		if(_graph === undefined)
			var _graph = {};
			
		_graph.unique_id = getUniqueID();
		
		_graph.draw = function() {
			console.log('d3 time');
		}
		
		function getUniqueID() {
			return Math.random().toString(36).substr(2, 9);
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
			settings: function() {
				return _graph;
			}
		};
	};
	
	return ge;
})();