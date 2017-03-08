'use strict';

console.log("working");
// Create app namespace to hold all methods
var indeedApp = {};

indeedApp.apiKey = '1211867702868069';
indeedApp.apiUrl = 'http://api.indeed.com/ads/apisearch';

// // Collect user input
// indeedApp.collectInfo = function() {

// }

// Make AJAX request with user inputted data
indeedApp.getInfo = function (location, title) {

    indeedApp.allJobs = $.ajax({
        url: 'http://proxy.hackeryou.com',
        dataType: 'json',
        method: 'GET',
        data: {
            reqUrl: indeedApp.apiUrl,
            params: {
                publisher: indeedApp.apiKey,
                v: 2,
                format: 'json',
                q: title,
                l: location,
                sort: 'default',
                radius: 25,
                st: 'jobsite',
                jt: 'fulltime',
                start: 0,
                limit: 10,
                fromage: 14,
                filter: 0,
                latlong: 1,
                co: 'ca'
            }
        }
    }).then(function (res) {
        var data = res.results;
        indeedApp.displayInfo(data);
    });
};

// Display data on the page
indeedApp.displayInfo = function (jobs) {
    if (jobs.length < 1) {
        console.log('no jobs');
    }
    //for each job return title, company,city,state,description and date:
    jobs.forEach(function (job) {
        // console.log("job", job);
        var jobTitle = job.jobtitle;
        var company = job.company;
        var city = job.city;
        var state = job.state;
        var shortDes = job.snippet;
        var datePosted = job.formattedRelativeTime;
        //generate html
        var jobTitleEl = $('<h3>').addClass('jobTitle').html('' + jobTitle);
        var companyEl = $('<h4>').addClass('company').html('' + company);
        var locationEl = $('<h4>').addClass('location').html(city + ', ' + state);
        var shortDesEl = $('<p>').addClass('shortDes').html('' + shortDes);
        var dateEl = $('<p>').addClass('date').html('' + datePosted);
        //display on html
        $('.results').append(dateEl, jobTitleEl, companyEl, locationEl, shortDesEl);
    });
};

indeedApp.events = function () {

    $('form').on('submit', function (e) {
        e.preventDefault();
        $('.results').empty();
        var location = $('#location').val();
        var title = $('#title').val();
        indeedApp.location = location;
        indeedApp.title = title;
        indeedApp.getInfo(location, title);
        console.log(indeedApp.title, indeedApp.location);
    });
};

// Start app
indeedApp.init = function () {
    indeedApp.events();
};

$(function () {
    indeedApp.init();
});