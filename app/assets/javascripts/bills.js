/* ----- VOTE BREAKDOWN ----- */

$.get('assets/bill_test.json', function(data) {
	$.each(data.votes.yeas, function(index, value) {
		if(this.party == "D") {
			voteBD_JSON[this.state].children[0].children[0].size++;
			voteBD_JSON.total.children[0].children[0].size++;
		}
		else if(this.party == "R") {
			voteBD_JSON[this.state].children[0].children[1].size++;
			voteBD_JSON.total.children[0].children[1].size++;
		}
		else {
			voteBD_JSON[this.state].children[0].children[2].size++;
			voteBD_JSON.total.children[0].children[2].size++;
		}
	});

	$.each(data.votes.nays, function(index, value) {
		if(this.party == "D") {
			voteBD_JSON[this.state].children[1].children[0].size++;
			voteBD_JSON.total.children[1].children[0].size++;
		}
		else if(this.party == "R") {
			voteBD_JSON[this.state].children[1].children[1].size++;
			voteBD_JSON.total.children[1].children[1].size++;
		}
		else {
			voteBD_JSON[this.state].children[1].children[2].size++;
			voteBD_JSON.total.children[1].children[2].size++;
		}
	});
	
	$("#voteBD").hide();
	voteBreakdown(voteBD_JSON.total);
});

var voteBD_JSON = {
	"total": { "name": "total", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"AL": { "name": "AL", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"AK": { "name": "AK", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"AZ": { "name": "AZ", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"AR": { "name": "AR", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"CA": { "name": "CA", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"CO": { "name": "CO", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"CT": { "name": "CT", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"DE": { "name": "DE", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"FL": { "name": "FL", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"GA": { "name": "GA", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"HI": { "name": "HI", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"ID": { "name": "ID", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"IL": { "name": "IL", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"IN": { "name": "IN", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"IA": { "name": "IA", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"KS": { "name": "KS", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"KY": { "name": "KY", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"LA": { "name": "LA", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"ME": { "name": "ME", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"MD": { "name": "MD", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"MA": { "name": "MA", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"MI": { "name": "MI", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"MN": { "name": "MN", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"MS": { "name": "MS", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"MO": { "name": "MO", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"MT": { "name": "MT", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"NE": { "name": "NE", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"NV": { "name": "NV", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"NH": { "name": "NH", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"NJ": { "name": "NJ", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"NM": { "name": "NM", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"NY": { "name": "NY", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"NC": { "name": "NC", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"ND": { "name": "ND", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"OH": { "name": "OH", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"OK": { "name": "OK", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"OR": { "name": "OR", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"PA": { "name": "PA", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"RI": { "name": "RI", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"SC": { "name": "SC", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"SD": { "name": "SD", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"TN": { "name": "TN", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"TX": { "name": "TX", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"UT": { "name": "UT", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"VT": { "name": "VT", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"VA": { "name": "VA", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"WA": { "name": "WA", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"WV": { "name": "WV", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"WI": { "name": "WI", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
	"WY": { "name": "WY", "children": [ { "name": "yeas", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] }, { "name": "nays", "children": [ { "name": "D", "size": 0 }, { "name": "R", "size": 0 }, { "name": "I", "size": 0 } ] } ] },
}

$('#graphs').append($('<div>')
	.attr('class', 'large-4 small-10 large-uncentered small-centered columns graph')
	.attr('id', 'voteBD')
	.append($('<h4>')
		.text('Vote Breakdown')
	)
	.append($('<div>')
		.attr('class', 'sharable')
		.append($('<span>')
			.attr('aria-hidden', true)
			.attr('class', 'icon-earth')
		)
		.append($('<span>')
			.text('Share')
		)
	)
);

var voteBD = {};

voteBD.width = 300;
voteBD.height = 300;
voteBD.radius = Math.min(voteBD.width, voteBD.height) / 2;
voteBD.color = d3.scale.ordinal()
	.range(["#C4D117", "#DDDDDD", "#61D2D6", "#EA3556", "#888888"])
	.domain(d3.range(0,5));

voteBD.svg = d3.select("#voteBD")
	.append("svg")
		.attr("width", "100%")
		.attr("height", "100%")
		.attr('viewBox','0 0 ' + Math.min(voteBD.width, voteBD.height) + ' ' + Math.min(voteBD.width, voteBD.height))
		.attr('preserveAspectRatio','xMinYMin')
		.append("g")
		.attr("transform", "translate(" + voteBD.width / 2 + "," + voteBD.height / 2 + ") rotate(90)");
		
voteBD.partition = d3.layout.partition()
	.sort(null)
	.size([2 * Math.PI, voteBD.radius * voteBD.radius])
	.value(function(d) { return d.size; });

voteBD.arc = d3.svg.arc()
	.startAngle(function(d) { return d.x; })
	.endAngle(function(d) { return d.x + d.dx; })
	.innerRadius(function(d) {
		if(d.depth != 2)
			return Math.sqrt(d.y);
		else
			return Math.sqrt(d.y) + 22;
	})
	.outerRadius(function(d) {
		if(d.depth != 2)
			return Math.sqrt(d.y + d.dy) + 22;
		else
			return Math.sqrt(d.y + d.dy);
	});

voteBD.arc2 = d3.svg.arc()
	.startAngle(function(d) { return d.x; })
	.endAngle(function(d) { return d.x + d.dx; })
	.innerRadius(function(d) { return Math.sqrt(d.y); })
	.outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });
	
var $vote = $('#voteBD');

function voteBreakdown(theData) {
	var root = JSON.parse(JSON.stringify(theData));
	
	var yeasTotal = root.children[0].children[0].size + root.children[0].children[1].size + root.children[0].children[2].size;
	var naysTotal = root.children[1].children[0].size + root.children[1].children[1].size + root.children[1].children[2].size;
	
	if(yeasTotal > naysTotal) {
		var winner = "yeas";
		var loser = "nays";
		var winPct = parseInt((yeasTotal / (yeasTotal + naysTotal)) * 100);
		var losePct = 100 - winPct;
		var winAmt = yeasTotal;
		var loseAmt = naysTotal;
		var winD = parseInt((root.children[0].children[0].size / yeasTotal) * 100);
		var winR = parseInt((root.children[0].children[1].size / yeasTotal) * 100);
		var winI = parseInt((root.children[0].children[2].size / yeasTotal) * 100);
		var loseD = parseInt((root.children[1].children[0].size / naysTotal) * 100);
		var loseR = parseInt((root.children[1].children[1].size / naysTotal) * 100);
		var loseI = parseInt((root.children[1].children[2].size / naysTotal) * 100);
	}
	else if(yeasTotal < naysTotal) {
		var winner = "nays";
		var loser = "yeas";
		var winPct = parseInt((naysTotal / (yeasTotal + naysTotal)) * 100);
		var losePct = 100 - winPct;
		var winAmt = naysTotal;
		var loseAmt = yeasTotal;
		var winD = parseInt((root.children[1].children[0].size / naysTotal) * 100);
		var winR = parseInt((root.children[1].children[1].size / naysTotal) * 100);
		var winI = parseInt((root.children[1].children[2].size / naysTotal) * 100);
		var loseD = parseInt((root.children[0].children[0].size / yeasTotal) * 100);
		var loseR = parseInt((root.children[0].children[1].size / yeasTotal) * 100);
		var loseI = parseInt((root.children[0].children[2].size / yeasTotal) * 100);
	}
	else {
		var winner = "draw";
		var loser = "draw";
		var winPct, winAmt = 50;
		var losePct, loseAmt = 50;
		var winD = parseInt((root.children[0].children[0].size / yeasTotal) * 100);
		var winR = parseInt((root.children[0].children[1].size / yeasTotal) * 100);
		var winI = parseInt((root.children[0].children[2].size / yeasTotal) * 100);
		var loseD = parseInt((root.children[1].children[0].size / naysTotal) * 100);
		var loseR = parseInt((root.children[1].children[1].size / naysTotal) * 100);
		var loseI = parseInt((root.children[1].children[2].size / naysTotal) * 100);
	}
		
	$vote.find('h4').after($('<ul>')
		.attr('class', 'legend top')
		.append($('<li>')
			.attr('data-depth', 1)
			.append($('<span>')
				.attr('class', 'square')
				.css('background', voteBD.color(0))
			)
			.append($('<span>')
				.attr('class', 'title')
				.text(winner)
			)
		)
		.append($('<li>')
			.attr('data-depth', 1)
			.append($('<span>')
				.attr('class', 'square')
				.css('background', voteBD.color(1))
			)
			.append($('<span>')
				.attr('class', 'title')
				.text(loser)
			)
		)
		.append($('<li>')
			.attr('data-depth', 2)
			.append($('<span>')
				.attr('class', 'square')
				.css('background', voteBD.color(2))
			)
			.append($('<span>')
				.attr('class', 'title')
				.text("Democrat")
			)
		)
		.append($('<li>')
			.attr('data-depth', 2)
			.append($('<span>')
				.attr('class', 'square')
				.css('background', voteBD.color(3))
			)
			.append($('<span>')
				.attr('class', 'title')
				.text("Republican")
			)
		)
		.append($('<li>')
			.attr('data-depth', 2)
			.append($('<span>')
				.attr('class', 'square')
				.css('background', voteBD.color(4))
			)
			.append($('<span>')
				.attr('class', 'title')
				.text("Independent")
			)
		)
	)
	
	$vote.find('.legend').after($('<ul>')
		.attr('class', 'voteBD-center interactive')
		.append($('<li>')
			.append($('<span>')
				.attr('class', 'title')
				.text(winner)
			)
			.append($('<span>')
				.attr('class', 'amount')
				.text(winPct + "%")
			)
		)
		.append($('<li>')
			.append($('<span>')
				.attr('class', 'title')
				.text(loser)
			)
			.append($('<span>')
				.attr('class', 'amount')
				.text(losePct + "%")
			)
		)
	);
	
	$vote.find('svg').before($('<div>')
		.attr('class', 'd3Tooltip')
	);
	
	var path = voteBD.svg.datum(root).selectAll("path")
		.data(voteBD.partition.nodes)
		.enter().append("path")
			.attr('d', voteBD.arc)
			.attr('class', 'interactive')
			.attr('data-depth', function(d) { return d.depth; })
			.style("fill", function(d) {
				if(d.depth == 0)
					return "#fafafa";
				else if(d.depth == 1) {
					if(d.name == winner)
						return voteBD.color(0);
					else
						return voteBD.color(1);
				}
				else {
					if(d.name == "D")
						return voteBD.color(2);
					else if(d.name == "R")
						return voteBD.color(3);
					else
						return voteBD.color(4);
				}
			})
			.each(stash);
		
	// PATRICK
	//	- Transitions
		
	$vote.fadeIn(500);
	setDepth(1);
	setCenter(0);
	centerVBDCenter();
	setVBDHeight();
	
	$vote.find('path').on('click', function() {
		if($(this).attr('data-depth') == 0) {
			if(getCenter() == 1)
				setCenter(0);
			else
				setCenter(1);
		}
		else {
			if(getDepth() == 1) {
				setDepth(2);
				setTooltip(2);
			}
			else {
				setDepth(1);
				setTooltip(1);
			}
		}
	}).on('mouseover', function() {
		if($(this).attr('data-depth') != 0)
			$vote.find('.d3Tooltip').show();
	}).on('mouseout', function() {
		$vote.find('.d3Tooltip').hide();
	}).on('mousemove', throttle(function(event) {
		setTooltip(getDepth());
		
		var x = event.pageX - $vote.offset().left;
		var y = event.pageY - $vote.offset().top;

		$vote.find('.d3Tooltip').css('left', x + 10).css('top', y + 10);
	}, 10));
	
	$vote.find('.voteBD-center').on('click', function() { $vote.find('path:first-of-type').trigger('click'); });
	
	function setDepth(theDepth) {
		$('#voteBD .legend li').each(function() {
			if($(this).attr('data-depth') != theDepth)
				$(this).hide().removeClass('currentDepth');
			else
				$(this).fadeIn(250).addClass('currentDepth');
		});
		
		if(theDepth == 1) {
			voteBD.svg.datum(root).selectAll("path")
				.data(voteBD.partition.nodes)
				.transition().duration(250)
				.attr("d", voteBD.arc);
		}
		else {
			voteBD.svg.datum(root).selectAll("path")
				.data(voteBD.partition.nodes)
				.transition().duration(250)
				.attr("d", voteBD.arc2);
		}
	}
	
	function getDepth() {
		return parseInt($('#voteBD .legend li.currentDepth').attr('data-depth'));
	}
	
	function setCenter(theNumber) {
		$('#voteBD .voteBD-center li').removeClass('currentCenter').hide();
		$('#voteBD .voteBD-center li:eq(' + theNumber + ')').addClass('currentCenter').fadeIn(250);
	}
	
	function getCenter() {
		return parseInt($('#voteBD .voteBD-center li.currentCenter').index());
	}
	
	function setTooltip(theDepth) {
		if(theDepth == 1) {
			$vote.find('.d3Tooltip').html('').removeClass('taller').append($('<ul>')
				.attr('class', 'tooltipSplit')
				.append($('<li>')
					.append($('<span>')
						.attr('class', 'title')
						.text(winner)
					)
					.append($('<span>')
						.attr('class', 'amount')
						.text(winPct + "%")
					)
					.append($('<span>')
						.attr('class', 'subAmount')
						.text(winAmt + " votes")
					)
				)
				.append($('<li>')
					.append($('<span>')
						.attr('class', 'title')
						.text(loser)
					)
					.append($('<span>')
						.attr('class', 'amount')
						.text(losePct + "%")
					)
					.append($('<span>')
						.attr('class', 'subAmount')
						.text(loseAmt + " votes")
					)
				)
			);
		}
		else {
			$vote.find('.d3Tooltip').html('').addClass('taller').append($('<ul>')
				.attr('class', 'tooltipSplit')
				.append($('<li>')
					.append($('<span>')
						.attr('class', 'title')
						.text(winner)
					)
					.append($('<ul>')
						.attr('class', 'legend')
						.append($('<li>')
							.append($('<span>')
								.attr('class', 'square')
								.css('background', voteBD.color(2))
							)
							.append($('<span>')
								.attr('class', 'title')
								.text(winD + "%")
							)
						)
						.append($('<li>')
							.append($('<span>')
								.attr('class', 'square')
								.css('background', voteBD.color(3))
							)
							.append($('<span>')
								.attr('class', 'title')
								.text(winR + "%")
							)
						)
						.append($('<li>')
							.append($('<span>')
								.attr('class', 'square')
								.css('background', voteBD.color(4))
							)
							.append($('<span>')
								.attr('class', 'title')
								.text(winI + "%")
							)
						)
					)
				)
				.append($('<li>')
					.append($('<span>')
						.attr('class', 'title')
						.text(loser)
					)
					.append($('<ul>')
						.attr('class', 'legend')
						.append($('<li>')
							.append($('<span>')
								.attr('class', 'square')
								.css('background', voteBD.color(2))
							)
							.append($('<span>')
								.attr('class', 'title')
								.text(loseD + "%")
							)
						)
						.append($('<li>')
							.append($('<span>')
								.attr('class', 'square')
								.css('background', voteBD.color(3))
							)
							.append($('<span>')
								.attr('class', 'title')
								.text(loseR + "%")
							)
						)
						.append($('<li>')
							.append($('<span>')
								.attr('class', 'square')
								.css('background', voteBD.color(4))
							)
							.append($('<span>')
								.attr('class', 'title')
								.text(loseI + "%")
							)
						)
					)
				)
			);
		}
	}
	
	function stash(d) {
		d.x0 = d.x;
		d.dx0 = d.dx;
	}

	function arcTween(a) {
		var i = d3.interpolate({x: a.x0, dx: a.dx0}, a);
		
		return function(t) {
			var b = i(t);
			a.x0 = b.x;
			a.dx0 = b.dx;
			return arc(b);
		};
	}
}

function centerVBDCenter() {
	var $group = $vote.find('svg g:first-of-type');
	var groupHeight = $group[0].getBoundingClientRect().height;
	var groupWidth = $group[0].getBoundingClientRect().width;
	
	var $center = $vote.find('.voteBD-center');
	var centerHeight = $center.height();
	var centerWidth = $center.width();
	
	$center.css('margin-top', (groupHeight / 2) - (centerHeight / 2) - 12).css('margin-left', (groupWidth / 2) - (centerWidth / 2) - 3);
}

function setVBDHeight() {
	var $svg = $vote.find('svg');
	var width = $svg.width();
	
	$svg.height(width + 20);
}

$(window).on('resize', function() {
	centerVBDCenter();
	setVBDHeight();
});