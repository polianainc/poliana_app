var $searchArea = $('.search-area');

function runSearch(params) {
	var fields, query, extra;
	var theData = {};
	
	if(params.fields == undefined)
		fields = getParam('fields');
	else
		fields = params.fields;
		
	if(params.query == undefined)
		query = getParam('query');
	else
		query = params.query;
	
	theData.query = query;
	theData.fields = fields;
	theData.format = "json";
	
	$.each(params, function(index, value) {
		if(index != "fields" && index != "query" && index != "scroll") {
			theData[index + "_page"] = value;
			extra = index;
		}
	});
	
	$.get('/search/', theData, function(search) {
		var length = 0;
		var entities = [];
		
		$('.search-selector li').each(function(index, value) {
			entities.push($(this).text().toLowerCase());
		});
		
		$searchArea.fadeOut(250, function() {
			if(extra == undefined) {
				$(this).html('');
			
				for(var i = 0; i < entities.length; i++) {
					if(search[entities[i]] != undefined)
						$searchArea.append(formatItem(entities[i], search[entities[i]], false));
				}
			}
			else
				$searchArea.append(formatItem(extra, search[extra], true));
			
			length = $('.search-item').length;
			
			$('.search-count').text(function() {
				if(length == 0)
					return "No results for...";
				else if(length == 1)
					return "1 result for...";
				else
					return length + " results for...";
			});
			
			if(length == 0) {
				$searchArea.html($('<p>')
					.attr('class', 'text-center')
					.text("Sorry, we didn't find anything! Try searching more entities.")
				);
			}
			
			$(this).fadeIn(250, function() {
				if(extra == undefined || extra == "") {
					var $elem = $("div[data-searchtype=" + params.scroll + "]").offset();
				
					if($elem != undefined && params.scroll != undefined)
						scrollToPos($elem.top - 90);
					else
						scrollToPos(0);
				}
			});
		});
	});
}

if(getParam('fields') && getParam('query'))
	runSearch({ fields: getSelected().join(), query: $('.search-input').val() });

$('.search-selector a').on('click', function(event) {
	event.preventDefault();
	
	$(this).parent().toggleClass('active');
	
	var selected = getSelected().join();
	var oldFieldsQS = getParam('fields', event.target.href);
	
	// HTML5 wizardry, fuck <= IE9!
	history.pushState('', '', event.target.href.replace("fields=" + oldFieldsQS, "fields=" + selected));
	
	if($(this).parent().hasClass('active'))
		runSearch({ fields: selected, query: $('.search-input').val(), scroll: $(this).text().toLowerCase() });
	else
		runSearch({ fields: selected, query: $('.search-input').val() });
});

$('.search-input, .menu-search').on('keyup', function() {
	if($(this).hasClass('search-input'))
		$('.menu-search').val($(this).val());
	else
		$('.search-input').val($(this).val());
}).on('keypress', function(event) {
	if(event.which == 13) {
		event.preventDefault();
		
		var oldQueryQS = getParam('query', location.search).split(' ').join('%20');
		
		// HTML5 wizardry, fuck <= IE9!
		history.pushState('', '', location.search.replace("query=" + oldQueryQS, "query=" + $(this).val()));
		
		runSearch({ fields: getSelected().join(), query: $(this).val() });
	}
});

$('.menu-search-click').on('click', function(event) {
	event.preventDefault();
	runSearch({ fields: getSelected().join(), query: $(this).prev().val() });
});

$(document).on('click', '.search-type-container .pagination a', function(event) {
	event.preventDefault();
	
	var thePage = $(this).attr('data-page');
	var theType = $(this).parents('.search-type-container').attr('data-searchtype');
	var theData = {};
	
	theData.fields = getSelected().join();
	theData.query = $('.search-input').val();
	theData.scroll = theType;
	theData[theType] = thePage;
	
	runSearch(theData);
});

function getSelected() {
	var list = [];
	
	$('.search-selector li').each(function() {
		if($(this).hasClass('active'))
			list.push($(this).text().toLowerCase());
	})
	
	return list;
}

function getParam(name, string) {
	if(string == undefined)
		string = location.search;
		
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(string);
		
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function formatItem(type, data, partial) {
	if(data.data.length == 0)
		return false;
		
	var $posts;
		
	if(partial == false) {
		$posts = $('<div>').attr('class', 'search-type-container').attr('data-searchtype', type);
	
		$posts.append($('<h3>')
			.text(type.charAt(0).toUpperCase() + type.slice(1))
		);
	}
	else
		$posts = $("div[data-searchtype=" + type + "]");
		
	$posts.find('.pagination-centered').remove();
	
	if(type == "users") {
		
	}
	else if(type == "bills") {
		$.each(data.data, function(index, value) {
			var item = this;
			
			$posts.append($('<div>')
				.attr('class', 'search-item')
				.append($('<h4>')
					.append($('<a>')
						.attr('href', '/congress/bills/' + this.billId)
						.text(function() {
							if(item.popularTitle != null)
								return item.popularTitle;
							else if(item.shortTitle != null)
								return item.shortTitle;
							
							return item.officialTitle;
						})
					)
				)
				.append($('<p>')
					.text(trimByWord(item.summary, 30))
					.append($('<a>')
						.attr('href', '/congress/bills/' + this.billId)
						.text("Explore »")
					)
				)
			);
		});
	}
	else if(type == "industries") {
		$.each(data.data, function(index, value) {
			var item = this;
			
			$posts.append($('<div>')
				.attr('class', 'search-item')
				.append($('<h4>')
					.append($('<a>')
						.attr('href', '/industries/' + this.name.toLowerCase().replace(/\W/g, ' ').replace(/\s{2,}/g, ' ').split(' ').join('-') + "/" + this.industry_id)
						.text(this.name)
					)
				)
				.append($('<p>')
					.html('<b>Industry: </b>' + this.industry + '<br><b>Sector: </b>' + this.sector_long + '<br>')
					.append($('<a>')
						.attr('href', '/industries/' + this.name.toLowerCase().replace(/\W/g, ' ').replace(/\s{2,}/g, ' ').split(' ').join('-') + "/" + this.industry_id)
						.text("Explore »")
					)
				)
			);
		});
	}
	else if(type == "politicians") {
		$.each(data.data, function(index, value) {
			var item = this;
			
			this.name = this.first_name + ' ' + this.last_name;
			
			$posts.append($('<div>')
				.attr('class', 'search-item')
				.append($('<div>')
					.attr('class', 'row')
					.append($('<div>')
						.attr('class', 'large-2 show-for-large-up columns')
						.append($('<a>')
							.attr('href', '/congress/politicians/' + this.bioguide_id)
							.append($('<img>')
								.attr('src', '#')
								.attr('alt', this.name)
							)
						)
					)
					.append($('<div>')
						.attr('class', 'large-10 small-12 columns')
						.append($('<h4>')
							.append($('<a>')
								.attr('href', '/congress/politicians/' + this.bioguide_id)
								.text(this.name)
							)
						)
					)
				)
			);
		});
	}
	else if(type == "pacs") {
		
	}
	else if(type == "lobbyists") {
		
	}
	else if(type == "organizations") {
		
	}
	
	if(data.paging.next != undefined) {
		$posts.append($('<div>')
			.attr('class', 'pagination-centered')
			.append($('<ul>')
				.attr('class', 'pagination')
				.append($('<li>')
					.attr('class', 'current')
					.append($('<a>')
						.attr('href', '#')
						.attr('data-page', data.paging.next - 1)
						.text(data.paging.next - 1)
					)
				)
				.append($('<li>')
					.attr('class', 'arrow')
					.append($('<a>')
						.attr('href', '#')
						.attr('data-page', data.paging.next)
						.text("More results »")
					)
				)
			)
		);
	}
	
	return $posts;
}