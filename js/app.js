
 // Create app namespace to hold all methods
    var indeedApp = {};

	indeedApp.apiKey = '1211867702868069'
    indeedApp.apiUrl = 'http://api.indeed.com/ads/apisearch?'


    // Collect user input
    indeedApp.collectInfo = function() {

    }

    // Make AJAX request with user inputted data
    indeedApp.getInfo = function() {

    	$.ajax({
    		url: indeedApp.apiUrl,
    		method: 'GET',
    		dataType: 'json',
    		data: { 
    			format: 'json'
    		}
    	}).then(function(res) {
    		console.log('I did it!', res);
    	});	

    }

    // Display data on the page
    indeedApp.displayInfo = function() {

    }

    // Start app
    indeedApp.init = function() {

    }

    $(function() {
        indeedApp.init();
    });