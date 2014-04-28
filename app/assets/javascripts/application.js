//= require vendor/ga
//= require jquery
//= require jquery_ujs
//= require vendor/modernizr
//= require foundation
//= require modules/variables
//= require modules/functions
//= require modules/layout
//= require vendor/jquery.cookie
//= require vendor/mailchimp
//= require vendor/disqus
//= require vendor/stupidtable
//= require vendor/stellar
//= require vendor/wow
//= require vendor/d3.v3
//= require vendor/crossfilter

$(document).ready(function() {
	// Initialize Foundation
	$(document).foundation({
		joyride: {
			scroll_speed: 500,
			scroll_animation: 'swing',
			template: {
				link: '<a href="#close" class="joyride-close-tip">&times;</a>',
				timer: '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
				tip: '<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',
				wrapper: '<div class="joyride-content-wrapper"></div>',
				button: '<div class="hide"></div>',
				modal: '<div class="joyride-modal-bg"></div>',
				expose: '<div class="joyride-expose-wrapper"></div>',
				expose_cover: '<div class="joyride-expose-cover"></div>'
			},
			post_ride_callback: function() {
				scrollToPos(0);
				$('.joyride-modal-bg').remove();
			}
		}
	});

	// They see me ridin'... they hatin'...
	if($('.joyride-list').length > 0) {
		if($('.joyride-list').attr('data-cookie') != "") {
			if($.cookie($('.joyride-list').attr('data-cookie')) !== "seen") {
				$(document).foundation('joyride', 'start');
				$.cookie($('.joyride-list').attr('data-cookie'), "seen", { expires: 365, path: '/' });
			}
		}
		else
			$(document).foundation('joyride', 'start');
	}
});
