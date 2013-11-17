function runSearch() {
	var types = [];
	
	if(getParam('users'))
		types.push("users");
	if(getParam('bills'))
		types.push("bills");
	if(getParam('politicians'))
		types.push("politicians");
	if(getParam('industries'))
		types.push("industries");
	if(getParam('pacs'))
		types.push("pacs");
	if(getParam('lobbyists'))
		types.push("lobbyists");
	if(getParam('organizations'))
		types.push("organizations");
	
	$.get('/search/', { query: getParam('query'), page: getParam('page'), types: types.join(), format: 'json' }, function(data) {
		console.log(data);
	});
}

runSearch();

$('#searchSelector a').on('click', function() {
	runSearch();
});

function getParam(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}