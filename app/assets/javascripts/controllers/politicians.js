var cont = ge.controller();

var pacsBar = ge.verticalBarGraph({
	width: 400,
	height: 400,
	selector: $('#pacs-bar'),
	margins: {
		all: 40
	}
});

var industriesBar = ge.verticalBarGraph({
	width: 400,
	height: 400,
	selector: $('#industries-bar'),
	margins: {
		top: 40,
		bottom: 30,
		left: 20,
		right: 10
	}
});

cont.addGraph(pacsBar)
	.addGraph(industriesBar);

console.log(cont.listGraphs());

cont.render();
