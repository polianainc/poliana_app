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