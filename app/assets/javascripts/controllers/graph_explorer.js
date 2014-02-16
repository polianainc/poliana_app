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
			}
		};
	};
	
	ge.verticalBarGraph = function(_graph) {
		if(_graph === undefined)
			var _graph = {};
			
		_graph.unique_id = getUniqueID();
		
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