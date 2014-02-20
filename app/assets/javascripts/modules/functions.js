// This is a way to throttle refreshes of anything in Javascript via a given threshhold
function throttle(fn, threshhold, scope) {
	threshhold || (threshhold = 250);
	
	var last, deferTimer;
	
	return function() {
		var context = scope || this;
		
		var now = +new Date,
		args = arguments;
		
		if (last && now < last + threshhold) {
			clearTimeout(deferTimer);
			deferTimer = setTimeout(function() {
				last = now;
				fn.apply(context, args);
			}, threshhold);
		}
		else {
			last = now;
			fn.apply(context, args);
		}
	};
}

// Trim a sentence by an optional amount of words
function trimByWord(sentence, count) {
	var result = sentence;
	var resultArray = result.split(' ');
	
	if(count == undefined)
		count = 100;
	
	if(resultArray.length > count){
		resultArray = resultArray.slice(0, count);
		result = resultArray.join(' ') + '...';
	}
	
	return result;
}

// Scroll to a section on a page in an optional amount of time
function scrollToPos(value, time) {
	if(time == undefined)
		time = 500;
	else
		time = 0;
		
	$('html, body').animate({
		scrollTop: value
	}, time);
}

// Helpful function to convert political parties to and from their full names and respective abbreviations
function convertParty(party, to) {
	if(to == "abbrev") {
		if(party == "Democrat" || party == "Democrats")
			return "D";
		else if(party == "Republican" || party == "Republicans")
			return "R";
		else
			return "I";
	}
	else {
		if(party == "D")
			return "Democrat";
		else if(party == "R")
			return "Republican";
		else	
			return "Independent";
	}
}

// Helpful function to convert states to and from their full names and respective abbreviations
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

// Place commas in any give number
function commaSeparateNumber(val) {
	while(/(\d+)(\d{3})/.test(val.toString()))
		val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');

	return val;
}

// Abbreviate a number into its currency value
function currencyNumber(number, decPlaces) {
	decPlaces = Math.pow(10, decPlaces);
	var abbrev = ["k", "m", "b", "t"];

	for(var i = abbrev.length - 1; i >= 0; i--) {
		var size = Math.pow(10, (i + 1) * 3);

		if(size <= number) {
			 number = Math.round(number * decPlaces / size) / decPlaces;

			 if((number == 1000) && (i < abbrev.length - 1)) {
				 number = 1;
				 i++;
			 }

			 number += abbrev[i];
			 break;
		}
	}

	return number;
}

// Camelcase to hyphen conversion
function camelToHyphen(string) {
	return string.replace(/([a-z][A-Z])/g, function (g) { return g[0] + '-' + g[1].toLowerCase() });
}

// Return the ordinated value of a number
Number.prototype.ordinate = function() {
	var num = this,
		numStr = num.toString(),
		last = numStr.slice(-1),
		len = numStr.length,
		ord = '';

	switch(last) {
		case '1':
			ord = numStr.slice(-2) === '11' ? 'th' : 'st';
			break;
		case '2':
			ord = numStr.slice(-2) === '12' ? 'th' : 'nd';
			break;
		case '3':
			ord = numStr.slice(-2) === '13' ? 'th' : 'rd';
			break;
		default:
			ord = 'th';
			break;
	}
	return num.toString() + ord;
};