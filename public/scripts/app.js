'use strict';

// Create app namespace to hold all methods
var indeedApp = {};

indeedApp.apiKey = '1211867702868069';
indeedApp.apiUrl = 'http://api.indeed.com/ads/apisearch';
indeedApp.googleKey = 'AIzaSyBTN4GtBR709ug6SMg-Sbr55JZvv5ctXys';

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
                sort: 'date',
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

//get location

// indeedApp.getGeocode = function() {
//     navigator.geolocation.getCurrentPosition(success);
//     //send geolocation location to map
//     function success(position) {
//         indeedApp.centerLat = position.coords.latitude;
//         indeedApp.centerLon = position.coords.longitude;
//         initMap(indeedApp.centerLat,indeedApp.centerLon)
//     };
// }

// Display data on the page
indeedApp.displayInfo = function (jobs) {
    console.log(jobs);
    if (jobs.length < 1) {
        var noResult = $('<h3>').addClass('error').text('No results for ' + indeedApp.title + ' in ' + indeedApp.location + '. Please try other keyword or location.');
        $('.results').append(noResult);
    }
    //for each job return title, company,city,state,description and date:
    jobs.forEach(function (job) {
        var jobTitle = job.jobtitle;
        var company = job.company;
        var city = job.city;
        var state = job.state;
        var shortDes = job.snippet;
        var datePosted = job.formattedRelativeTime;
        var applyUrl = job.url;
        //generate html
        var jobTitleEl = $('<h3>').addClass('jobTitle').html('' + jobTitle);
        var compLoc = $('<h4>').addClass('location').html(company + ' - ' + city + ', ' + state);
        var shortDesEl = $('<p>').addClass('shortDes').html('' + shortDes);
        var dateEl = $('<p>').addClass('date').html('' + datePosted);
        var apply = $('<a>').text("Apply Now!").addClass('seeBtn').attr('href', applyUrl);
        var showMap = $('<button>').text("Show on Map").addClass('showMapBtn').attr('data-lat', job.latitude).attr('data-lon', job.longitude).attr('data-com', job.company).attr('data-ci', job.city);
        //display on html

        var resultsTitleDate = $('<div>').addClass('resultsTitleDate').append(jobTitleEl, dateEl);
        var resultsContainer = $('<div>').addClass('resultsItem').append(resultsTitleDate, compLoc, shortDesEl, apply, showMap);
        $('.results').append(resultsContainer);
    });

    $('.showMapBtn').on('click', function () {
        var jobCompany = $(this).data('com');
        jobCompany = jobCompany.replace(/ /g, '+');
        var jobCity = $(this).data('ci');
        console.log(jobCity);
        $('iframe').attr('src', 'https://www.google.com/maps/embed/v1/search?key=AIzaSyBTN4GtBR709ug6SMg-Sbr55JZvv5ctXys&q=' + jobCompany + '+' + jobCity);
        $('.mapContainer').css('display', 'block').addClass('animated fadeIn');
    });

    $('.closeMap').on('click', function () {
        $('.mapContainer').css('display', 'none');
        $('iframe').attr("src", "");
    });

    $('.map').on('click', function () {
        $('.mapContainer').css('display', 'none');
        $('iframe').attr("src", "");
    });

    // the following was our original paired programming efforts on integrating google maps

    // $('.showMapBtn').on('click', function(){
    //     var jobCompany = $(this).data('com');
    //     var jobCity = $(this).data('ci')
    //     var lat = $(this).data('lat');
    //     var lng = $(this).data('lon');
    //     var jobLocation = {lat, lng}
    //     // test
    //     var geocoder  = new google.maps.Geocoder();             // create a geocoder object
    //     var location  = new google.maps.LatLng(jobLocation);    // turn coordinates into an object          
    //     geocoder.geocode({'latLng': location}, function (results, status) {
    //     if(status == google.maps.GeocoderStatus.OK) {           // if geocode success
    //     var add = results[0].formatted_address;         // if address found, pass to processing function
    //     console.log(add)
    //      }
    //     });


    //     if (window.marker) {
    //         window.marker.setMap(null);
    //     }
    //     window.marker = new google.maps.Marker({
    //         position: jobLocation,
    //         map: map
    //     });

    //     map.setZoom(15);
    //     map.panTo(window.marker.position);

    //       var contentString = `<div id="content"><h2>${jobCompany}</h2><h3>${jobCity}</h3></div>`;

    //       var infowindow = new google.maps.InfoWindow({
    //         content: contentString,
    //         maxWidth: 200
    //       });

    //       marker.addListener('click', function() {
    //         infowindow.open(map, marker);
    //       });
    //     })
}; // display info ends


indeedApp.events = function () {

    $('.formMain').on('submit', function (e) {
        e.preventDefault();
        $('.results').empty().css('display', 'block').addClass('animated fadeIn');
        var location = $('#location').val();
        var title = $('#title').val();
        indeedApp.location = location;
        indeedApp.title = title;
        indeedApp.getInfo(location, title);
        // animation fade out
        var animation = $('.formContainer').addClass('animated zoomOutDown');
        $.when(animation).done(function () {
            // display nav
            $('.formContainerTop').css('display', 'flex');
            // scroll down
            var scroll = $('html, body').animate({
                scrollTop: $("#nav").offset().top
            }, 1000);
            // take out title
            $.when(scroll).done(function () {
                $('.formContainer').css('display', 'none');
            });
        });
    });

    $('.formTop').on('submit', function (e) {
        e.preventDefault();
        $('.results').empty();
        var location = $('#locationTop').val();
        var title = $('#titleTop').val();
        indeedApp.location = location;
        indeedApp.title = title;
        indeedApp.getInfo(location, title);
    });
};

// var map;
// function initMap() {
//   var GeoLo = {lat:  indeedApp.centerLat, lng:  indeedApp.centerLon};
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: indeedApp.centerLat, lng: indeedApp.centerLon},
//     zoom: 10
//   });
// }

// Start app
indeedApp.init = function () {
    indeedApp.events();
};

$(function () {
    indeedApp.init();
});