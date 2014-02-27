$(document).ready(function() {	
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
		
		var html = $(this).attr('data-othermodal');
		
		$otherModal.html(html);
		$otherModal.foundation('reveal', 'open');
	});
	
	// On exiting the other modal dialog, remove all the content within so it can be re-populated
	$otherModal.on('closed', function() { $(this).html(''); });
	
	$(document).on('opened', '[data-reveal]', function() {
		var html = $(this).html();
		
		$(this).html(html + '<a class="close-reveal-modal">&#215;</a>');
	});
	
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
	$loader.each(function() {
		$(this).append($('<div>'));
	});
	
	// Create foldable sections for mobile
	$foldable.find('.foldable-header').on('click', function(event, speed) {
		if(speed === undefined)
			speed = 250;
			
		if(speed === 0)
			$(this).siblings('.foldable-content').hide();
		else
			$(this).siblings('.foldable-content').slideToggle(speed);
			
		$(this).toggleClass('down');
		
		// Force graphs to re-render
		$(window).trigger('resize');
	});
	
	// Fold everything down
	$foldable.find('.foldable-header').trigger('click', [0]);
	
	// Parallax backgrounds
	$(window).stellar();
	
	if($errors.length > 0) {
		$errors.animate({
			top: 80
		}, 500, 'swing');
	}
});

$(window).resize(throttle(function() {
	// Change all the full backgrounds
	fullBackgrounds();
}, 500));

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