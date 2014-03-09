$('.play-video a').on('click', function(event) {
	event.preventDefault();
	
	var $theVideo = $(this).next('.vimeo-player').clone();
	
	$otherModal.removeClass('medium').addClass('large').html($theVideo);
	$otherModal.foundation('reveal', 'open');
});