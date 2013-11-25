(function() {
	var party, geo, most, least;
	
	var controller = function() {
		this.init = function() {
			party = new partyContributions();
			geo = new geographicBreakdown();
			most = new mostPaidPoliticians();
			least = new leastPaidPoliticians();
			
			this.run();
		}	
		this.populateData = function(type, data) {
			if(data == undefined) {
				data = type.charAt(0).toUpperCase() + type.slice(1) + ": Initialized";
			}
			else
				data = type.charAt(0).toUpperCase() + type.slice(1) + ": " + data;
				
			return data;
		}
		this.run = function() {
			party.init(this.populateData("party"));
			geo.init(this.populateData("geo"));
			most.init(this.populateData("most"));
			least.init(this.populateData("least"));
		}
		this.update = function(data) {			
			party.update(this.populateData("party", data));
			geo.update(this.populateData("geo", data));
			most.update(this.populateData("most", data));
			least.update(this.populateData("least", data));
		}
	}
	
	var partyContributions = function() {
		this.init = function(data) {
			console.log(data);
		}
		this.update = function(data) {
			console.log(data);
		}
	}
	
	var geographicBreakdown = function() {
		this.init = function(data) {
			console.log(data);
		}
		this.update = function(data) {
			console.log(data);
		}
	}
	
	var mostPaidPoliticians = function() {
		this.init = function(data) {
			console.log(data);
		}
		this.update = function(data) {
			console.log(data);
		}
	}
	
	var leastPaidPoliticians = function() {
		this.init = function(data) {
			console.log(data);
		}
		this.update = function(data) {
			console.log(data);
		}
	}
	
	var cont = new controller();
	cont.init();
	
	$('h1').on('click', function() {
		var time = new Date().getTime();
		cont.update("You clicked the title of industry " + $('#industryID').html() + " at time of " + time);
	});
})();