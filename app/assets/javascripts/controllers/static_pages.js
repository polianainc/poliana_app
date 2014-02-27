$('.play-video a').on('click', function(event) {
	event.preventDefault();
	
	var $theVideo = $(this).next('.vimeo-player');
	var $origin = $(this);
	
	// Fade out the background
	$origin.parents('.full-background .row').animate({ opacity: 0 }, 250, 'swing', function() {
		// Move the video into the right DOM position and add the modal background
		$('body').append($theVideo).append($('<div>').addClass('reveal-modal-bg').fadeIn(250, function() {
			// Set the video size
			resizeVideo();
			
			// Set the video CSS and fade that bad boy in
			$theVideo.addClass('full-video').fadeIn(250);
			
			// If we click/touch out then reset everything back to normal
			$(document).on('click', '.reveal-modal-bg', function() {
				var $reveal = $(this);

				// Fade out the video
				$theVideo.fadeOut(250, function() {
					// Followed by a fade out of the modal background
					$reveal.fadeOut(250, function() {
						// And fade back our text
						$('.full-background .row').animate({ opacity: 1 }, 250, 'swing');
					}).remove();
				});
				
				// Don't forget to put the video back in place!
				$origin.after($theVideo);
			});
		}));
	});
	
	// Resize the video on screen resize
	$(window).resize(function() {
		resizeVideo();
	});
	
	// Nifty function to resize the video
	function resizeVideo() {
		var width = $(window).width();
		var height = $(window).height() * 0.75;
		
		$theVideo.css('width', width).css('height', height).find('iframe').width(width).height(height);
	}
});