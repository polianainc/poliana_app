var cont = ge.controller({
	name: "controller"
});

var bar1 = ge.verticalBarGraph();

var bar2 = ge.verticalBarGraph({
	width: 500,
	height: 300
}).width(100);

cont.addGraph(bar1).addGraph(bar2);

bar1.width(400).height(200);

console.log(cont.listGraphs());