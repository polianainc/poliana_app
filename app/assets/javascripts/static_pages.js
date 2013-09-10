$(document).ready(function() {
	$('.mailchimp-form').on('submit', function(event) {
		event.preventDefault();
		
		var $form = $(this);
		$.get('/mailchimp_signup', { email: $(this).find('.email').val(), fname: $(this).find('.fname').val(), lname: $(this).find('.lname').val(), ajax: true }, function(data) {
			if(data == "Success") {
				if($form.hasClass('form1'))
					var theString = '<p class="center">Awesome, we got it. Check your email!</p><ul class="dark"><li><a href="https://www.facebook.com/polianainc" target="_blank"><span aria-hidden="true" class="icon-facebook"></span><span class="iconText">facebook.com/polianainc</span></a></li><li><a href="https://www.twitter.com/poliana" target="_blank"><span aria-hidden="true" class="icon-twitter"></span><span class="iconText">twitter.com/poliana</span></a></li></ul>';
				else
					var theString = '<p class="center">Awesome, we got it. Check your email!</p>';
				
				$form.fadeOut(250, function() {
					$(this).html(theString).fadeIn(250);
				});
			}
		});
	});
});