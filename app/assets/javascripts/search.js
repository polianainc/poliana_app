function runSearch(fields, query, scroll) {
	if(fields == undefined)
		fields = getParam('fields');
		
	if(query == undefined)
		query = getParam('query');
		
	$.get('/search/', { query: query, page: getParam('page'), fields: fields, format: 'json' }, function(search) {
		var length = 0;
		var entities = [];
		var $content = $('.searchArea');
		
		$('.searchSelector li').each(function(index, value) {
			entities.push($(this).text().toLowerCase());
		});
		
		$content.fadeOut(250, function() {
			$(this).html('');
			
			for(var i = 0; i < entities.length; i++) {
				if(search[entities[i]] != undefined) {
					$content.append(formatItem(entities[i], search[entities[i]]));
					length += search[entities[i]].data.length;
				}
			}
			
			$('.searchCount').text(function() {
				if(length == 0)
					return "No results for...";
				else if(length == 1)
					return "1 result for...";
				else
					return length + " results for...";
			});
			
			if(length == 0) {
				$content.html($('<p>')
					.attr('class', 'aligncenter')
					.text("Sorry, we didn't find anything! Try searching more entities.")
				);
			}
			
			$(this).fadeIn(250, function() {
				var $elem = $("div[data-searchType=" + scroll + "]").offset();
				
				if($elem != undefined && scroll != undefined) {
					$('html, body').animate({
						scrollTop: $elem.top - 90
					}, 500);
				}
			});
		});
	});
}

runSearch();

$('.searchSelector a').on('click', function(event) {
	event.preventDefault();
	
	$(this).parent().toggleClass('active');
	
	var selected = getSelected().join();
	var oldFieldsQS = getParam('fields', event.target.href);
	
	// HTML5 wizardry, fuck <= IE9!
	history.pushState('', '', event.target.href.replace("fields=" + oldFieldsQS, "fields=" + selected));
	
	if($(this).parent().hasClass('active'))
		runSearch(selected, $('.searchInput').val(), $(this).text().toLowerCase());
	else
		runSearch(selected, $('.searchInput').val());
});

$('.searchInput, .menuSearch').on('keyup', function() {
	if($(this).hasClass('searchInput'))
		$('.menuSearch').val($(this).val());
	else
		$('.searchInput').val($(this).val());
}).on('keypress', function(event) {
	if(event.which == 13) {
		event.preventDefault();
		
		var oldQueryQS = getParam('query', location.search).split(' ').join('%20');
		history.pushState('', '', location.search.replace("query=" + oldQueryQS, "query=" + $(this).val()));
		
		runSearch(getSelected().join(), $(this).val());
	}
});

$('.menuSearchClick').on('click', function(event) {
	event.preventDefault();
	runSearch(getSelected().join(), $(this).prev().val());
});

function getSelected() {
	var list = [];
	
	$('.searchSelector li').each(function() {
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

function formatItem(type, data) {
	if(data.data.length == 0)
		return false;
		
	var $posts = $('<div>').attr('data-searchType', type);
	
	$posts.append($('<h3>')
		.text(type.charAt(0).toUpperCase() + type.slice(1))
	);
	
	if(type == "users") {
		
	}
	else if(type == "bills") {
		$.each(data.data, function(index, value) {
			var item = this;
			
			$posts.append($('<div>')
				.attr('class', 'searchItem')
				.append($('<h4>')
					.append($('<a>')
						.attr('href', '/bills/' + this._id)
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
					.text(trimByWord(item.summary))
					.append($('<a>')
						.attr('href', '/bills/' + this._id)
						.text("Explore »")
					)
				)
			);
		});
	}
	else if(type == "industries") {
		
	}
	else if(type == "politicians") {
		/*
			<h3>Politicians</h3>
			<div class="searchItem">
				<div class="row">
					<div class="large-2 hide-for-small columns">
						<a href="#"><img src="http://www.rickperry.org/files/portrait_rp.jpg" alt="Rick Perry"></a>
					</div>
					<div class="large-10 small-12 columns">
						<h4><a href="#">Politician One</a></h4>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean auctor lacinia facilisis. In lacinia viverra gravida. Pellentesque fermentum vel enim viverra consequat. Sed eleifend leo leo, ut ultrices nibh elementum et. <a href="#">Explore &raquo;</a></p>
					</div>
				</div>
			</div>
		*/
	}
	else if(type == "pacs") {
		
	}
	else if(type == "lobbyists") {
		
	}
	else if(type == "organizations") {
		
	}
	
	console.log(data);
	
	var count = 0;

	for(var i in data.paging) {
		if(data.paging.hasOwnProperty(i))
			count++;
	}
	
	console.log(count);
	
	if(count != 0) {
		/*
			<div class="pagination-centered">
			  <ul class="pagination">
			    <li class="arrow unavailable"><a href="">&laquo;</a></li>
			    <li class="current"><a href="">1</a></li>
			    <li><a href="">2</a></li>
			    <li><a href="">3</a></li>
			    <li><a href="">4</a></li>
			    <li class="unavailable"><a href="">&hellip;</a></li>
			    <li><a href="">12</a></li>
			    <li><a href="">13</a></li>
			    <li class="arrow"><a href="">&raquo;</a></li>
			  </ul>
			</div>
		*/
		$posts.append($('<div>')
			.attr('class', 'pagination-centered')
			.append($('<ul>')
				.attr('class', 'pagination')
				.append(function() {
					if(data.paging.previous != undefined) {
						return $('<li>')
						.attr('class', 'arrow')
						.append($('<a>')
							.attr('href', '#')
							.text("« Previous")
						);
					}
				})
				.append(function() {
					if(data.paging.previous != undefined && data.paging.next != undefined) {
						return $('<li>')
						.attr('class', 'current')
						.append($('<a>')
							.attr('href', '#')
							.text(data.paging.next - 1)
						);
					}
					else if(data.paging.previous == undefined && data.paging.next != undefined) {
						return $('<li>')
						.attr('class', 'current')
						.append($('<a>')
							.attr('href', '#')
							.text(data.paging.next - 1)
						);
					}
					else if(data.paging.next == undefined && data.paging.previous != undefined) {
						return $('<li>')
						.attr('class', 'current')
						.append($('<a>')
							.attr('href', '#')
							.text(data.paging.previous + 1)
						);
					}
				})
				.append(function() {
					if(data.paging.next != undefined) {
						return $('<li>')
						.attr('class', 'arrow')
						.append($('<a>')
							.attr('href', '#')
							.text("Next »")
						);
					}
				})
			)
		);
		console.log(data.paging);
	}
	
	return $posts;
}

function trimByWord(sentence) {
	var result = sentence;
	var resultArray = result.split(' ');
	
	if(resultArray.length > 30){
		resultArray = resultArray.slice(0, 30);
		result = resultArray.join(' ') + '...';
	}
	
	return result;
}