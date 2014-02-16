$(document).ready(function() {
	// Make the footer stick (preferably without duct tape)
	stickyFooter();
	
	// Load page-specific Javascript
	pageSpecific();
	
	// Change all the full backgrounds
	fullBackgrounds();
	
	// Open the sharable modal dialog
	$(document).on('click', '.sharable', function(event) {
		event.preventDefault();
		$sharable.foundation('reveal', 'open');
	});
	
	// Open all other modal dialogs
	$(document).on('click', '.other-modal', function(event) {
		event.preventDefault();
		
		var html = $(this).attr('data-othermodal') + '<a class="close-reveal-modal">&#215;</a>';
		
		$otherModal.html(html);
		$otherModal.foundation('reveal', 'open');
	});
	
	// On exiting the other modal dialog, remove all the content within so it can be re-populated
	$otherModal.bind('closed', function() { $(this).html(''); });
	
	// Run a search query
	$('.menu-search.not-search').on('keypress', function(event) {
		if(event.which == 13 && $(this).val() != "") {
			event.preventDefault();
			runSearch($(this).val());
		}
	});
	
	// Run a search query
	$('.menu-search-click').on('click', function(event) {
		event.preventDefault();
		runSearch($(this).prev().val());
	});
	
	// Ignore the natural pagination Javascript
	$(document).on('click', '.pagination .current', function(event) {
		event.preventDefault();
	});
	
	// Add a div to loaders, so front-end doesn't have to be cluttered in view
	$('.loader').each(function() {
		$(this).append($('<div>'));
	});
});

$(window).load(function() {
	// Call this again just in case any large images offset the height of the document
	stickyFooter();
});

$(window).resize(throttle(function() {
	// Reposition the footer if necessary as you resize
	stickyFooter();

	// Change all the full backgrounds
	fullBackgrounds();
}, 500));

// This is a Javascript shim to fix some CSS bullshit. Without this we pick between an off-canvas menu (mobile) and a sticky footer.
function stickyFooter() {
	if($(window).height() >= $container.height())
		$container.height($(window).height());
}

// Here we can load page-specific Javascript asynchronously while letting Sprokets handle site-wide dependencies.
function pageSpecific() {
	if($pageSpecific.length > 0) {
		$pageSpecific.each(function() {
			var file = "";
			var $elem = $(this);

			// Is the file specified by the element itself?  If not, we default to the body's data-controller attribute.
			if($elem.attr('data-controller') != undefined)
				file = $elem.attr('data-controller');
			else
				file = $('body').attr('data-controller');

			$.ajax({
				url: '/assets/controllers/' + file + '.js',
				async: false,
				type: 'GET'
			}).done(function() {
				// Don't forget we can remove this now useless element.
				$elem.remove();
			})
		});
	}
}

// Runs a search query
function runSearch(query, fields) {
	// This is a comma-separated list of entities to search by
	if(fields == undefined)
		fields = "politicians";
		
	window.location = '/search/?query=' + query + '&fields=' + fields;
}

// Get the current media query
function getMediaQuery() {
	var level = parseInt($stateIndicator.css('z-index'));
	
	if(level > 0 && level <= 2)
		return "small";
	else if(level > 2 && level <= 4)
		return "medium";
	else
		return "large";
}

// Responsive full background images
function fullBackgrounds() {
	var newImage = $fullBackground.attr('data-' + getMediaQuery());
	
	$fullBackground.css('background-image', 'url(\'/assets/backgrounds/' + newImage + '\')');
}