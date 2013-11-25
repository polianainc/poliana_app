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
				if(type == "party")
					data = "party data";
				else if(type == "geo")
					data = "geo data";
				else if(type == "most")
					data = "most data";
				else
					data = "least data";
			}
				
			return data;
		}
		this.run = function() {
			party.init(this.populateData("party"));
			geo.init(this.populateData("geo"));
			most.init(this.populateData("most"));
			least.init(this.populateData("least"));
		}
		this.update = function(data) {			
			party.update(this.populateData("party", "party " + data));
			geo.update(this.populateData("geo", "geo " + data));
			most.update(this.populateData("most", "most " + data));
			least.update(this.populateData("least", "least " + data));
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
		cont.update('fuck yes');
	});
})();