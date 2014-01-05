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
			$form.find('.email').val('See you in the beta!').attr('disabled', 'disabled');
		}
	});
});