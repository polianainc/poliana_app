$(document).ready(function() {
	// Make the footer stick (preferably without duct tape)
	stickyFooter();
	
	// Load page-specific Javascript
	pageSpecific();
	
	// Open the sharable modal dialog
	$(document).on('click', '.sharable', function(event) {
		event.preventDefault();
		$('#sharable').foundation('reveal', 'open');
	});
	
	// Open all other modal dialogs
	$(document).on('click', '.other-modal', function(event) {
		event.preventDefault();
		
		var $otherModal = $('#otherModal');
		var html = $(this).attr('data-othermodal') + '<a class="close-reveal-modal">&#215;</a>';
		
		$otherModal.html(html);
		$otherModal.foundation('reveal', 'open');
	});
	
	// On exiting the other modal dialog, remove all the content within so it can be re-populated
	$('#other-modal').bind('closed', function() { $(this).html(''); });
	
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
});

$(window).load(function() {
	// Call this again just in case any large images offset the height of the document
	stickyFooter();
});

$(window).resize(function() {
	// Reposition the footer if necessary as you resize
	stickyFooter();
});

// This is a Javascript shim to fix some CSS bullshit. Without this we pick between an off-canvas menu (mobile) and a sticky footer.
function stickyFooter() {
	if($(window).height() >= $container.height())
		$container.height($(window).height());
}

// Here we can load page-specific Javascript asynchronously while letting Sprokets handle site-wide dependencies.
function pageSpecific() {
	if($pageSpecific.length > 0) {
		var file = "";
		
		// Is the file specified by the element itself?  If not, we default to the body's data-controller attribute.
		if($pageSpecific.attr('data-controller') != undefined)
			file = $pageSpecific.attr('data-controller');
		else
			file = $('body').attr('data-controller');
			
		// <3 asynch loading
		$.get('/assets/controllers/' + file + ".js", function() {
			// Don't forget we can remove this now useless element.
			$pageSpecific.remove();
		});
	}
}

// Runs a search query
function runSearch(query, fields) {
	if(fields == undefined)
		fields = "bills,politicians";
		
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