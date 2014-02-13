ge = (function() {
	var ge = {
		version: '1.0'
	};
	
	ge.controller = function(_controller) {
		if(_controller === undefined)
			_controller = {};
			
		var _graphs = {};
		
		_controller.addGraph = function(graph) {
			_graphs[graph.name] = graph;
		};
		
		return {
			add: function(graph) {
				_controller.addGraph(graph);
				return this;
			},
			list: function() {
				return _graphs;
			}
		};
	};
	
	ge.verticalBarGraph = function(_chart) {
		return _chart;
	};
	
	return ge;
})();