// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require foundation

$(document).ready(function() {
	$(document).foundation();
	
	absoluteHero();
	
	// Beta signup
	$('.mailchimp-form').on('submit', function(event) {
		event.preventDefault();

		var $form = $(this);
		
		$.get('/mailchimp_signup', {
			email: $form.find('.email').val(),
			fname: $form.find('.fname').val(),
			lname: $form.find('.lname').val(),
			ajax: true
		}, function(data) {
			if(data == "Success") {
				$form.find('.email').val('').attr('disabled', 'disabled');
				$form.find('button').fadeOut(250);
				$form.prev('small').text("You're awesome, thanks!");
			}
		});
	});
	
	$(document).on('click', '.sharable', function(event) {
		event.preventDefault();
		$('#sharable').foundation('reveal', 'open');
	});
	
	$(document).on('click', '.otherModal', function(event) {
		event.preventDefault();
		
		var $otherModal = $('#otherModal');
		var html = $(this).attr('data-othermodal') + '<a class="close-reveal-modal">&#215;</a>';
		
		$otherModal.html(html);
		$otherModal.foundation('reveal', 'open');
	});
	
	$('#otherModal').bind('closed', function() { $(this).html(''); });
	
	$('.menuSearch.notSearch').on('keypress', function(event) {
		if(event.which == 13 && $(this).val() != "") {
			event.preventDefault();
			window.location = '/search/?query=' + $(this).val() + "&fields=bills,politicians";
		}
	});
	
	$('.menuSearchClick').on('click', function(event) {
		event.preventDefault();
		window.location = '/search/?query=' + $(this).prev().val() + "&fields=bills,politicians";
	});
	
	$(document).on('click', '.pagination .current', function(event) {
		event.preventDefault();
	});
});

$(window).resize(function() {
	absoluteHero();
});

function absoluteHero() {
	var $absHero = $('.absoluteHero');
	
	if($(window).width() >= 768)
		$absHero.css('margin-top', -1 * ($absHero.height() / 2));
	else
		$absHero.css('margin-top', '0px');
}

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

function scrollToPos(value, time) {
	if(time == undefined)
		time = 500;
	else
		time = 0;
		
	$('html, body').animate({
		scrollTop: value
	}, time);
}

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

function commaSeparateNumber(val) {
	while(/(\d+)(\d{3})/.test(val.toString()))
		val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');

	return val;
}

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