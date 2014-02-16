var cont = ge.controller();

var pacs = ge.verticalBarGraph();
var industries = ge.verticalBarGraph();

cont.addGraph(pacs).addGraph(industries);

console.log(cont.listGraphs());

cont.render();



// Go ahead and make the politicians graphs now... abstract them later --------------------

