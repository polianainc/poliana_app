var cont = ge.controller({
	name: "dat-controller"
});

var bar1 = ge.verticalBarGraph({
	name: "my-bar",
	width: 100,
	height: 200
});

var bar2 = ge.verticalBarGraph({
	name: "your-bar",
	width: 300,
	height: 100
});

cont.add(bar1).add(bar2);
console.log(cont.list());