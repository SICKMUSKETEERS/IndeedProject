console.log("working");
 // Create app namespace to hold all methods
    var indeedApp = {};

	indeedApp.apiKey = '1211867702868069'
    indeedApp.apiUrl = 'http://api.indeed.com/ads/apisearch'



    // Collect user input
    indeedApp.collectInfo = function() {

    }

    // Make AJAX request with user inputted data
    indeedApp.getInfo = function() {

        $.ajax({
            url: 'http://proxy.hackeryou.com',
            dataType: 'json',
            method:'GET',
            data: {
                reqUrl: indeedApp.apiUrl,
                params: {
                    publisher: indeedApp.apiKey,
                    v: 2,
                    format: 'json',
                    q: 'web developer',
                    l: 'toronto',
                    sort: 'default',
                    radius: 25,
                    st: 'jobsite',
                    jt: 'fulltime',
                    start: 0,
                    limit: 10,
                    fromage: 14,
                    filter: 1,
                    latlong: 1,
                    co: 'ca'
                }
            }
        })
        .then(function(res) {
            var data = res.results;
            console.log(data);
            indeedApp.displayInfo(data);

        });
    }

    // Display data on the page
    indeedApp.displayInfo = function(jobs) {
        jobs.forEach(function(job){
            var jobTitle = job.jobtitle;
            var company = job.company;
            var city = job.city;
            var state = job.state;
            var shortDes = job.snippet;
            var datePosted = job.formattedRelativeTime;
            console.log(jobTitle,company,city,state,shortDes,datePosted);
        })
    }

    // Start app
    indeedApp.init = function() {
        indeedApp.getInfo();
        indeedApp.displayInfo();
    }

    $(function() {
        indeedApp.init();
    });