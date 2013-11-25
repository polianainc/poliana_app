(function() {
	var controller = function() {		
		this.populateData = function(type) {
			if(type == "party")
				data = "hello";
				
			return data;
		}
		this.run = function() {
			var partyData = this.populateData("party");
			
			if(partyData) {
				var party = new partyContributions();

				party.draw(partyData);
			}
		}
	}
	
	var partyContributions = function() {
		this.draw = function(data) {
			console.log(data);
		}
		this.update = function() {
			console.log('party update');
		}
	}
	
	var geographicBreakdown = function() {
		this.draw = function() {
			console.log('geo draw');
		}
		this.update = function() {
			console.log('geo update');
		}
	}
	
	var mostPaidPoliticians = function() {
		this.draw = function() {
			console.log('mostPaid draw');
		}
		this.update = function() {
			console.log('mostPaid update');
		}
	}
	
	var leastPaidPolitcians = function() {
		this.draw = function() {
			console.log('leastPaid draw');
		}
		this.update = function() {
			console.log('leastPaid update');
		}
	}
	
	var myCont = new controller();
	myCont.run();
})();