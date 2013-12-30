// This is our Mailchimp beta signup form
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