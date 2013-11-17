function runSearch() {
	var fields = [];
	
	if(getParam('users'))
		fields.push("users");
	if(getParam('bills'))
		fields.push("bills");
	if(getParam('politicians'))
		fields.push("politicians");
	if(getParam('industries'))
		fields.push("industries");
	if(getParam('pacs'))
		fields.push("pacs");
	if(getParam('lobbyists'))
		fields.push("lobbyists");
	if(getParam('organizations'))
		fields.push("organizations");
	
	$.get('/search/', { query: getParam('query'), page: getParam('page'), fields: fields.join(), format: 'json' }, function(data) {
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