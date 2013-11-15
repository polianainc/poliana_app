(function() {
/* ----- DECLARATION OF DATA ----- */

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

var geoBD_JSON = {};
var poliView_JSON = {};

//$.get('/assets/bill_test_house.json', function(data) {
$.get('/assets/bill_test_senate.json', function(data) {
	$.each(data.votes.yeas, function(index, value) {
		if(this.party == "D" || this.party == "Democrat") {
			voteBD_JSON[this.state].children[0].children[0].size++;
			voteBD_JSON.total.children[0].children[0].size++;
		}
		else if(this.party == "R" || this.party == "Republican") {
			voteBD_JSON[this.state].children[0].children[1].size++;
			voteBD_JSON.total.children[0].children[1].size++;
		}
		else {
			voteBD_JSON[this.state].children[0].children[2].size++;
			voteBD_JSON.total.children[0].children[2].size++;
		}
	});

	$.each(data.votes.nays, function(index, value) {
		if(this.party == "D" || this.party == "Democrat") {
			voteBD_JSON[this.state].children[1].children[0].size++;
			voteBD_JSON.total.children[1].children[0].size++;
		}
		else if(this.party == "R" || this.party == "Republican") {
			voteBD_JSON[this.state].children[1].children[1].size++;
			voteBD_JSON.total.children[1].children[1].size++;
		}
		else {
			voteBD_JSON[this.state].children[1].children[2].size++;
			voteBD_JSON.total.children[1].children[2].size++;
		}
	});
	
	var chamber = data.billType.charAt(0);
	
	if(chamber == "s" || chamber == "S")
		geoBD_JSON.chamber = "Senate";
	else
		geoBD_JSON.chamber = "House";
		
	geoBD_JSON.yeas = {};
	geoBD_JSON.nays = {};
	
	$.each(data.votes.yeas, function(index, value) {
		if(isNaN(geoBD_JSON.yeas[this.state]))
			geoBD_JSON.yeas[this.state] = 1;
		else
			geoBD_JSON.yeas[this.state]++;
	});
	
	$.each(data.votes.nays, function(index, value) {
		if(isNaN(geoBD_JSON.nays[this.state]))
			geoBD_JSON.nays[this.state] = 1;
		else
			geoBD_JSON.nays[this.state]++;
	});
		
	geoBD_JSON.yeasTotal = data.votes.yeaTotal;
	geoBD_JSON.naysTotal = data.votes.nayTotal;
	
	poliView_JSON = data.votes;
	
	$vote.hide();
	$geo.hide();
	$poli.hide();
	voteBreakdown(voteBD_JSON, "total", data.votes.notVotingTotal, data.votes.presentTotal);
	geographicBreakdown(geoBD_JSON);
	$('.poliViewType li:eq(1)').trigger('click');
});



/* ----- VOTE BREAKDOWN ----- */

$('#graphs').append($('<div>')
	.attr('class', 'large-4 small-10 large-uncentered small-centered columns graph')
	.attr('id', 'voteBD')
	.append($('<h4>')
		.attr('class', 'h4Pad')
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

function voteBreakdown(theData, selector, notVoting, absent) {
	var root = JSON.parse(JSON.stringify(theData));
	
	var yeasTotal = root[selector].children[0].children[0].size + root[selector].children[0].children[1].size + root[selector].children[0].children[2].size;
	var naysTotal = root[selector].children[1].children[0].size + root[selector].children[1].children[1].size + root[selector].children[1].children[2].size;
	
	if(yeasTotal > naysTotal) {
		var winner = "yeas";
		var loser = "nays";
		var winPct = parseInt((yeasTotal / (yeasTotal + naysTotal + notVoting + absent)) * 100);
		var losePct = parseInt((naysTotal / (yeasTotal + naysTotal + notVoting + absent)) * 100);
		var winAmt = yeasTotal;
		var loseAmt = naysTotal;
		var winD = parseInt((root[selector].children[0].children[0].size / yeasTotal) * 100);
		var winR = parseInt((root[selector].children[0].children[1].size / yeasTotal) * 100);
		var winI = parseInt((root[selector].children[0].children[2].size / yeasTotal) * 100);
		var loseD = parseInt((root[selector].children[1].children[0].size / naysTotal) * 100);
		var loseR = parseInt((root[selector].children[1].children[1].size / naysTotal) * 100);
		var loseI = parseInt((root[selector].children[1].children[2].size / naysTotal) * 100);
	}
	else if(yeasTotal < naysTotal) {
		var winner = "nays";
		var loser = "yeas";
		var winPct = parseInt((naysTotal / (yeasTotal + naysTotal + notVoting + absent)) * 100);
		var losePct = parseInt((yeasTotal / (yeasTotal + naysTotal + notVoting + absent)) * 100);
		var winAmt = naysTotal;
		var loseAmt = yeasTotal;
		var winD = parseInt((root[selector].children[1].children[0].size / naysTotal) * 100);
		var winR = parseInt((root[selector].children[1].children[1].size / naysTotal) * 100);
		var winI = parseInt((root[selector].children[1].children[2].size / naysTotal) * 100);
		var loseD = parseInt((root[selector].children[0].children[0].size / yeasTotal) * 100);
		var loseR = parseInt((root[selector].children[0].children[1].size / yeasTotal) * 100);
		var loseI = parseInt((root[selector].children[0].children[2].size / yeasTotal) * 100);
	}
	else {
		var winner = "draw";
		var loser = "draw";
		var winPct, winAmt = 50;
		var losePct, loseAmt = 50;
		var winD = parseInt((root[selector].children[0].children[0].size / yeasTotal) * 100);
		var winR = parseInt((root[selector].children[0].children[1].size / yeasTotal) * 100);
		var winI = parseInt((root[selector].children[0].children[2].size / yeasTotal) * 100);
		var loseD = parseInt((root[selector].children[1].children[0].size / naysTotal) * 100);
		var loseR = parseInt((root[selector].children[1].children[1].size / naysTotal) * 100);
		var loseI = parseInt((root[selector].children[1].children[2].size / naysTotal) * 100);
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
	
	var path = voteBD.svg.datum(root[selector]).selectAll("path")
		.data(voteBD.partition.nodes)
		.enter().append("path")
			.attr('d', voteBD.arc)
			.attr('class', 'interactive')
			.attr('data-depth', function(d) { return d.depth; })
			.style('stroke-width', '1px')
			.style('stroke', '#fafafa')
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
			voteBD.svg.datum(root[selector]).selectAll("path")
				.data(voteBD.partition.nodes)
				.transition().duration(250)
				.attr("d", voteBD.arc);
		}
		else {
			voteBD.svg.datum(root[selector]).selectAll("path")
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
		return voteBD.arc(b);
	};
}

// function transData(root, selector) {
// 	voteBD.svg.datum(root[selector]).selectAll("path")
// 		.data(voteBD.partition.nodes)
// 		.transition()
// 		.duration(1500)
// 		.attrTween("d", arcTween)
// 		.each(stash);
// }

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



/* ----- GEOGRAPHIC BREAKDOWN ----- */

$('#graphs').append($('<div>')
	.attr('class', 'hide-for-small')
	.append($('<div>')
		.attr('class', 'large-6 large-offset-2 columns graph')
		.attr('id', 'geoBD')
		.append($('<h4>')
			.attr('class', 'h4Pad')
			.text('Geographic Breakdown')
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
	)
).append($('<div>')
	.attr('class', 'show-for-small')
	.append($('<h4>')
		.attr('class', 'small-12 columns h4Pad')
		.text('Geographic Breakdown')
	)
	.append($('<form>')
		.attr('class', 'small-12 columns custom')
		.append($('<select>')
			.attr('class', 'large expand')
			.attr('id', 'stateSelector')
			.append($('<option>')
				.attr('selected', 'selected')
				.text("All states")
			)
			.append(getStates())
		)
	)
);

function getStates() {
	var states = convertState('each', 'name').split(',');
	var theString = "";
	
	$.each(states, function(index, value) {
		theString += '<option>' + states[index] + '</option>';
	});
	
	return theString;
}

$(document).on('change', '#stateSelector', function() {
	var theState = $(this).val();
	
	if(theState == "All states") {
		//voteBreakdown(voteBD_JSON, 'total', poliView_JSON.notVotingTotal, poliView_JSON.present);
		
		$('input[name="filterPoliticians"]').val('');
		searchPoli('');
	}
	else {
		//voteBreakdown(voteBD_JSON, convertState(theState, 'abbrev'), poliView_JSON.notVotingTotal, poliView_JSON.present);
		
		$('input[name="filterPoliticians"]').val(theState);
		searchPoli(theState);
	}
});

var geoBD = {};

geoBD.width = 500;
geoBD.height = 500;
geoBD.centered = "";

geoBD.colorSenate = d3.scale.ordinal()
	.range(["#C4D117", "#DDDDDD", "#CFD671"])
	.domain(d3.range(0,3));
	
geoBD.colorHouse = d3.scale.ordinal()
	.range(["#C4D117", "#CAD449", "#D1D77A", "#D7DAAC", "#DDDDDD"])
	.domain(d3.range(0,5));

geoBD.svg = d3.select("#geoBD")
	.append("svg")
		.attr("width", "100%")
		.attr("height", "100%")
		.attr('viewBox','0 0 ' + Math.min(geoBD.width, geoBD.height) + ' ' + Math.min(geoBD.width, geoBD.height))
		.attr('preserveAspectRatio','xMinYMin');

geoBD.projection = d3.geo.albersUsa()
	.scale(900)
	.translate([geoBD.width / 2, geoBD.height / 2]);

geoBD.path = d3.geo.path()
	.projection(geoBD.projection);

geoBD.g = geoBD.svg.append("g")
	.attr("transform", "translate(" + 100 + "," + 0 + ")");

var $geo = $('#geoBD');

function geographicBreakdown(theData) {
	var winner, loser;
	
	if(theData.yeasTotal > theData.naysTotal) {
		winner = "yeas";
		loser = "nays";
	}
	else if(theData.yeasTotal < theData.naysTotal) {
		winner = "nays";
		loser = "yeas";
	}
	else {
		winner = "draw";
		loser = "draw";
	}
	
	d3.json("/assets/us.json", function(error, us) {
		geoBD.g.append("g")
			.selectAll("path")
			.data(topojson.feature(us, us.objects.states).features)
			.enter().append("path")
			.attr("d", geoBD.path)
			.attr("fill", function(d) {
				if(theData.chamber == "Senate") {
					if(theData[winner][d.id] == 0 || theData[winner][d.id] == undefined)
						return geoBD.colorSenate(1);
					else if(theData[winner][d.id] == 1)
						return geoBD.colorSenate(2);
					else
						return geoBD.colorSenate(0);
				}
				else {
					var percentile;
					
					if(theData[winner][d.id] != undefined && theData[loser][d.id] == undefined)
						percentile = 100;
					else if(theData[winner][d.id] == undefined && theData[loser][d.id] != undefined)
						percentile = 0;
					else
						percentile = parseInt((theData[winner][d.id] / (theData[winner][d.id] + theData[loser][d.id])) * 100);
					
					if(isNaN(percentile))
						return "#888888";
						
					if(percentile <= 100 && percentile > 80)
						return geoBD.colorHouse(0);
					else if(percentile <= 80 && percentile > 60)
						return geoBD.colorHouse(1);
					else if(percentile <= 60 && percentile > 40)
						return geoBD.colorHouse(2);
					else if(percentile <= 40 && percentile > 20)
						return geoBD.colorHouse(3);
					else
						return geoBD.colorHouse(4);
				}
			})
			.style("stroke-width", "1px")
			.style("stroke", "#fafafa")
			.attr("class", "interactive")
			.on("mouseover", function(d) { setTooltip(d.id); })
			.on("click", clicked);
			
		$geo.find('path').on('mouseover', function() {
			$geo.find('.d3Tooltip').show();
		}).on('mouseout', function() {
			$geo.find('.d3Tooltip').hide();
		}).on('mousemove', throttle(function(event) {
			var x = event.pageX - $geo.offset().left;
			var y = event.pageY - $geo.offset().top;

			$geo.find('.d3Tooltip').css('left', x + 10).css('top', y + 10);
		}, 10))
			
		if(theData.chamber == "Senate") {
			$geo.find('h4').after($('<ul>')
				.attr('class', 'legend top')
				.append($('<li>')
					.append($('<span>')
						.attr('class', 'square')
						.css('background', geoBD.colorSenate(0))
					)
					.append($('<span>')
						.attr('class', 'title')
						.text(winner)
					)
				)
				.append($('<li>')
					.append($('<span>')
						.attr('class', 'square')
						.css('background', geoBD.colorSenate(1))
					)
					.append($('<span>')
						.attr('class', 'title')
						.text(loser)
					)
				)
			);
		}
		else {
			$geo.find('h4').after($('<ul>')
				.attr('class', 'legend top leftFloat')
				.append($('<li>')
					.append($('<span>')
						.attr('class', 'title')
						.text(winner)
					)
					.append($('<span>')
						.attr('class', 'square')
						.css('background', geoBD.colorHouse(0))
					)
				)
				.append($('<li>')
					.append($('<span>')
						.attr('class', 'square')
						.css('background', geoBD.colorHouse(1))
					)
				)
				.append($('<li>')
					.append($('<span>')
						.attr('class', 'square')
						.css('background', geoBD.colorHouse(2))
					)
				)
				.append($('<li>')
					.append($('<span>')
						.attr('class', 'square')
						.css('background', geoBD.colorHouse(3))
					)
				)
				.append($('<li>')
					.append($('<span>')
						.attr('class', 'square')
						.css('background', geoBD.colorHouse(4))
					)
					.append($('<span>')
						.attr('class', 'title')
						.text(loser)
					)
				)
			);
		}
	});

	$geo.find('svg').before($('<div>')
		.attr('class', 'd3Tooltip')
	);

	$geo.fadeIn(500);

	function clicked(d) {
		$geo.find('.d3Tooltip').fadeOut(250);
		
		var x, y, k;
	
		if(d && geoBD.centered !== d) {
			var centroid = geoBD.path.centroid(d);
			x = centroid[0] - 40;
			y = centroid[1];
			k = 3;
			geoBD.centered = d;
			
			//transData(voteBD_JSON, d.id);
			
			var theState = convertState(d.id, "name");
			$('input[name="filterPoliticians"]').val(theState);
			searchPoli(theState);
		}
		else {
			x = 147;
			y = geoBD.height / 2;
			k = 1;
			geoBD.centered = null;
			
			//transData(voteBD_JSON, "total");
			
			$('input[name="filterPoliticians"]').val('');
			searchPoli('');
		}

		geoBD.g.selectAll("path")
			.classed("active", geoBD.centered && function(d) { return d === geoBD.centered; });

		geoBD.g.transition()
			.duration(500)
			.attr("transform", "translate(" + geoBD.width / 2 + "," + geoBD.height / 2 + ") scale(" + k + ") translate(" + -x + "," + -y + ")");
		
		setGBDHeight();
		
		$geo.find('.d3Tooltip').fadeIn(250);
	}
	
	function setTooltip(theID) {
		var theState = convertState(theID, "name");
		
		if(theData[winner][theID] == undefined)
			var winAmt = 0;
		else
			var winAmt = theData[winner][theID];
			
		if(theData[loser][theID] == undefined)
			var loseAmt = 0;
		else
			var loseAmt = theData[loser][theID];
			
		var winPct = parseInt((winAmt / (winAmt + loseAmt)) * 100)
		var losePct = parseInt((loseAmt / (winAmt + loseAmt)) * 100)
		
		if(isNaN(winPct))
			winPct = 0;
		
		if(isNaN(losePct))
			losePct = 0;
		
		$geo.find('.d3Tooltip').html('').addClass('taller')
			.append($('<h5>').text(theState))
			.append($('<ul>')
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
}

function setGBDHeight() {
	var $svg = $geo.find('svg');
	var width = $vote.find('svg').width();
	
	$svg.height(width + 20);
}



/* ----- POLITICIAN VIEWER ----- */

$('#graphs').append($('<div>')
	.attr('class', 'large-12 columns graph')
	.attr('id', 'poliView')
	.append($('<h4>')
		.text('Politician Viewer')
	)
);

var $poli = $('#poliView');

$poli.append($('<div>')
	.attr('class', 'row collapse')
	.append($('<form>')
		.attr('class', 'large-10 small-9 columns')
		.append($('<input>')
			.attr('name', 'filterPoliticians')
			.attr('type', 'text')
			.attr('placeholder', 'Filter by party, politician, or state')
		)
	)
	.append($('<div>')
		.attr('class', 'large-2 small-3 columns')
		.append($('<ul>')
			.attr('class', 'poliViewType')
			.append($('<li>')
				.append($('<span>')
					.text('View:')
				)
			)
			.append($('<li>')
				.attr('data-type', 'list')
				.append($('<span>')
					.attr('aria-hidden', 'true')
					.attr('class', 'icon-list')
				)
			)
			.append($('<li>')
				.attr('data-type', 'heat')
				.append($('<span>')
					.attr('aria-hidden', 'true')
					.attr('class', 'icon-user')
				)
			)
		)
	)
);

$(document).on('click', '.poliViewType li', function() {
	if($(this).index() != 0) {
		$('.poliViewType li').each(function() { $(this).removeClass('current'); });

		$(this).addClass('current');
		politicianViewer(poliView_JSON, $(this).attr('data-type'));
		searchPoli($('input[name="filterPoliticians"]').val());
		
	}
});

$poli.find('.row.collapse').before($('<div>')
	.attr('class', 'd3Tooltip smallCentered')
);

function politicianViewer(theData, type) {
	$('.poliViewColumn').remove();
	
	$poli.append($('<div>')
		.attr('class', 'row')
		.append($('<div>')
			.attr('class', 'large-4 columns')
			.append($('<div>')
				.attr('class', 'poliViewColumn')
				.append($('<div>')
					.append($('<h5>')
						.html(winningSide('Yeas'))
					)
					.append($('<p>')
						.text(theData.yeaTotal + " votes")
					)
				)
				.append(drawMembers("yeas"))
			)
		)
		.append($('<div>')
			.attr('class', 'large-4 columns')
			.append($('<div>')
				.attr('class', 'poliViewColumn')
				.append($('<div>')
					.append($('<h5>')
						.html(winningSide('Nays'))
					)
					.append($('<p>')
						.text(theData.nayTotal + " votes")
					)
				)
				.append(drawMembers("nays"))
			)
		)
		.append($('<div>')
			.attr('class', 'large-4 columns')
			.append($('<div>')
				.attr('class', 'poliViewColumn')
				.append($('<div>')
					.append($('<h5>')
						.text('Didn\'t Vote')
					)
					.append($('<p>')
						.text(theData.notVotingTotal + " members")
					)
				)
				.append(drawMembers("notVoting"))
			)
			.append($('<div>')
				.attr('class', 'poliViewColumn')
				.append($('<div>')
					.append($('<h5>')
						.text('Absent')
					)
					.append($('<p>')
						.text(theData.presentTotal + " members")
					)
				)
				.append(drawMembers("present"))
			)
		)
	);
	
	$poli.find('table').stupidtable().find('th:eq(1)').trigger('click');
	
	$(document).on('keyup', 'input[name="filterPoliticians"]', function() {
		searchPoli($(this).val());
	}).on('keypress', 'input[name="filterPoliticians"]', function(event) {
		if(event.which == 13)
			event.preventDefault();
	});
	
	$poli.find('.poliViewColumn li').on('mouseover', function() {
		$poli.find('.d3Tooltip').show();
	}).on('mouseout', function() {
		$poli.find('.d3Tooltip').hide();
	}).on('mousemove', throttle(function(event) {
		var x = event.pageX - $poli.offset().left;
		var y = event.pageY - $poli.offset().top;

		$poli.find('.d3Tooltip').css('left', x + 10).css('top', y + 10);
	}, 10)).on('mouseenter', function() {
		setTooltip($(this).attr('data-name'), $(this).attr('data-statelong'), $(this).attr('data-party'));
	});
	
	function winningSide(theSide) {
		var winner;
		
		if(theData.yeaTotal > theData.nayTotal)
			winner = "Yeas";
		else if(theData.yeaTotal < theData.nayTotal)
			winner = "Nays";
		else
			winner = "Draw";
			
		if(theSide == winner)
			return theSide + '<span aria-hidden="true" class="icon-trophy"></span>';
		else
			return theSide;
	}
	
	function drawMembers(location) {
		var theString = $('<div>');
		
		if(theData[location] != undefined) {
			if(type == "list") {
				theString.append($('<table>')
					.append($('<thead>')
						.append($('<tr>')
							.append($('<th>')
								.attr('width', 60)
								.attr('data-sort', 'string')
								.text("Party")
							)
							.append($('<th>')
								.attr('width', 60)
								.attr('data-sort', 'string')
								.text("State")
							)
							.append($('<th>')
								.attr('data-sort', 'string')
								.text("Name")
							)
						)
					)
					.append($('<tbody>'))
				);

				$.each(theData[location], function(index, value) {
					if(this.party == "Democrat" || this.party == "D")
						this.party = "D";
					else if(this.party == "Republican" || this.party == "R")
						this.party = "R";
					else if(this.party == "Independent" || this.party == "I")
						this.party = "I";
						
					if(this._id == null)
						this._id = this.bioguideId;
						
					theString.find('tbody').append($('<tr>')
						.attr('data-party', this.party)
						.attr('data-partylong', getParty(this.party))
						.attr('data-state', this.state)
						.attr('data-statelong', convertState(this.state, "name"))
						.attr('data-name', this.firstName + " " + this.lastName)
						.append($('<td>')
							.append($('<span>')
								.css('background', getColor(this.party))
								.text(this.party)
							)
						)
						.append($('<td>')
							.text(this.state)
						)
						.append($('<td>')
							.append($('<a>')
								.attr('href', "/politicians/" + this.firstName.toLowerCase().replace(/\s+/g,'').replace(/"(.*?)"/ig, '') + "-" + this.lastName.toLowerCase().replace(/\s+/g,'').replace(/"(.*?)"/ig, '') + "/" + this._id)
								.text(this.firstName + " " + this.lastName)
							)
						)
					);
				});
			}
			else {	
				theString.append($('<ul>'));
				
				$.each(theData[location], function(index, value) {
					if(this.party == "Democrat" || this.party == "D")
						this.party = "D";
					else if(this.party == "Republican" || this.party == "R")
						this.party = "R";
					else if(this.party == "Independent" || this.party == "I")
						this.party = "I";
						
					if(this._id == null)
						this._id = this.bioguideId;
						
					theString.find('ul').append($('<li>')
						.attr('data-party', this.party)
						.attr('data-partylong', getParty(this.party))
						.attr('data-state', this.state)
						.attr('data-statelong', convertState(this.state, "name"))
						.attr('data-name', this.firstName + " " + this.lastName)
						.css('background-image', 'url(/assets/pictures/congress-113/' + this._id + '.jpg)')
						.append($('<a>')
							.attr('href', "/politicians/" + this.firstName.toLowerCase().replace(/\s+/g,'').replace(/"(.*?)"/ig, '') + "-" + this.lastName.toLowerCase().replace(/\s+/g,'').replace(/"(.*?)"/ig, '') + "/" + this._id)
							.append($('<span>')
								.css('background', getColor(this.party))
							)
						)
					);
				});
			}
		}
		else {
			if(location == "yeas")
				theString.append($('<p>').attr('class', 'aligncenter').text("No members voted yea"));
			else if(location == "nays")
				theString.append($('<p>').attr('class', 'aligncenter').text("No members voted nay"));
			else if(location == "notVoting")
				theString.append($('<p>').attr('class', 'aligncenter').text("All members voted"));
			else
				theString.append($('<p>').attr('class', 'aligncenter').text("All members were present"));
		}
		
		return theString;
	}
	
	function getColor(party) {
		if(party == "D" || party == "Democrat")
			return "#61D2D6";
		else if(party == "R" || party == "Republican")
			return "#EA3556";
		else
			return "#888888";
	}
	
	function getParty(party) {
		if(party == "D")
			return "Democrat";
		else if(party == "R")
			return "Republican";
		else
			return "Independent";
	}
	
	function setTooltip(name, state, party) {
		$poli.find('.d3Tooltip').html('').append($('<h5>')
			.text(name)
			.append($('<p>')
				.text(party + " - " + state)
			)
		);
	}
	
	$poli.fadeIn(500);
}

function searchPoli(string) {
	string = string.toLowerCase();
	
	$('.poliViewColumn tbody tr, .poliViewColumn li').each(function() {
		if(
			$(this).attr('data-partylong').toLowerCase().indexOf(string) == -1 &&
			$(this).attr('data-state').toLowerCase().indexOf(string) == -1 &&
			$(this).attr('data-statelong').toLowerCase().indexOf(string) == -1 &&
			$(this).attr('data-name').toLowerCase().indexOf(string) == -1
		) {
			$(this).addClass('hide');
		}
		else
			$(this).removeClass('hide');
	});
	
	$('.poliViewColumn tbody, .poliViewColumn ul').each(function() {
		var theSize = $(this).children().not('.hide').length;
		var $elem = $(this).parents('.poliViewColumn').find('div:first-of-type p');
		var theText = $elem.text().substr($elem.text().indexOf(' '));
		
		$elem.text(theSize + theText);
	});
}

$(window).on('resize', function() {
	centerVBDCenter();
	setVBDHeight();
	setGBDHeight();
});

function convertState(name, to) {
	var states = new Array(							{'name':'Alabama', 'abbrev':'AL'},			{'name':'Alaska', 'abbrev':'AK'},
		{'name':'Arizona', 'abbrev':'AZ'},			{'name':'Arkansas', 'abbrev':'AR'},			{'name':'California', 'abbrev':'CA'},
		{'name':'Colorado', 'abbrev':'CO'},			{'name':'Connecticut', 'abbrev':'CT'},		{'name':'Delaware', 'abbrev':'DE'},
		{'name':'Florida', 'abbrev':'FL'},			{'name':'Georgia', 'abbrev':'GA'},			{'name':'Hawaii', 'abbrev':'HI'},
		{'name':'Idaho', 'abbrev':'ID'},			{'name':'Illinois', 'abbrev':'IL'},			{'name':'Indiana', 'abbrev':'IN'},
		{'name':'Iowa', 'abbrev':'IA'},				{'name':'Kansas', 'abbrev':'KS'},			{'name':'Kentucky', 'abbrev':'KY'},
		{'name':'Louisiana', 'abbrev':'LA'},		{'name':'Maine', 'abbrev':'ME'},			{'name':'Maryland', 'abbrev':'MD'},
		{'name':'Massachusetts', 'abbrev':'MA'},	{'name':'Michigan', 'abbrev':'MI'},			{'name':'Minnesota', 'abbrev':'MN'},
		{'name':'Mississippi', 'abbrev':'MS'},		{'name':'Missouri', 'abbrev':'MO'},			{'name':'Montana', 'abbrev':'MT'},
		{'name':'Nebraska', 'abbrev':'NE'},			{'name':'Nevada', 'abbrev':'NV'},			{'name':'New Hampshire', 'abbrev':'NH'},
		{'name':'New Jersey', 'abbrev':'NJ'},		{'name':'New Mexico', 'abbrev':'NM'},		{'name':'New York', 'abbrev':'NY'},
		{'name':'North Carolina', 'abbrev':'NC'},	{'name':'North Dakota', 'abbrev':'ND'},		{'name':'Ohio', 'abbrev':'OH'},
		{'name':'Oklahoma', 'abbrev':'OK'},			{'name':'Oregon', 'abbrev':'OR'},			{'name':'Pennsylvania', 'abbrev':'PA'},
		{'name':'Rhode Island', 'abbrev':'RI'},		{'name':'South Carolina', 'abbrev':'SC'},	{'name':'South Dakota', 'abbrev':'SD'},
		{'name':'Tennessee', 'abbrev':'TN'},		{'name':'Texas', 'abbrev':'TX'},			{'name':'Utah', 'abbrev':'UT'},
		{'name':'Vermont', 'abbrev':'VT'},			{'name':'Virginia', 'abbrev':'VA'},			{'name':'Washington', 'abbrev':'WA'},
		{'name':'West Virginia', 'abbrev':'WV'},	{'name':'Wisconsin', 'abbrev':'WI'},		{'name':'Wyoming', 'abbrev':'WY'}
	);
		
	var returnthis = "";
	
	$.each(states, function(index, value) {
		if(name == 'each') {
			if(to == 'name')
				returnthis += "," + value.name
			else if(to == 'abbrev')
				returnthis += "," + value.abbrev.toUpperCase();
		}
		else {
			if(to == 'name') {
				if(value.abbrev.toLowerCase() == name.toLowerCase()) {
					returnthis = value.name;
					return false;
				}
			}
			else if (to == 'abbrev') {
				if(value.name.toLowerCase() == name.toLowerCase()) {
					returnthis = value.abbrev.toUpperCase();
					return false;
				}
			}
		}
	});
	
	if(name == 'each')
		returnthis = returnthis.slice(1);
	
	return returnthis;
}
})();