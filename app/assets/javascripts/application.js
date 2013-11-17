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
	
	$(document).on('click', '.sharable', function() {
		$('#sharable').foundation('reveal', 'open');
	});
	
	$('.menuSearch.notSearch').on('keypress', function(event) {
		if(event.which == 13 && $(this).val() != "") {
			event.preventDefault();
			window.location = '/search/?query=' + $(this).val() + "&page=1&fields=bills,politicians";
		}
	});
	
	$('.menuSearchClick').on('click', function(event) {
		event.preventDefault();
		window.location = '/search/?query=' + $(this).prev().val() + "&page=1&fields=bills,politicians";
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