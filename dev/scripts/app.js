console.log("working");
 // Create app namespace to hold all methods
    var indeedApp = {};

    indeedApp.apiKey = '1211867702868069'
    indeedApp.apiUrl = 'http://api.indeed.com/ads/apisearch'
    indeedApp.googleKey = 'AIzaSyBTN4GtBR709ug6SMg-Sbr55JZvv5ctXys'
    indeedApp.googleSearch = "https://www.google.ca/maps/search/"
   
    // // Collect user input
    // indeedApp.collectInfo = function() {

    // }

    // Make AJAX request with user inputted data
    indeedApp.getInfo = function(location, title) {

    indeedApp.allJobs = $.ajax({
            url: 'http://proxy.hackeryou.com',
            dataType: 'json',
            method:'GET',
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
        })
        .then(function(res) {
            var data = res.results;
            indeedApp.displayInfo(data);
        });
    }

    //get location

indeedApp.getGeocode = function() {
    navigator.geolocation.getCurrentPosition(success);
    //send geolocation location to map
    function success(position) {
        console.log('success');
        indeedApp.centerLat = position.coords.latitude;
        indeedApp.centerLon = position.coords.longitude;
        console.log(position)
        console.log(typeof indeedApp.centerLat);
        console.log(typeof indeedApp.centerLon);
        initMap(indeedApp.centerLat,indeedApp.centerLon)
    };
}
    //send geolocation to input:
  //   function initialize() {
  //   geocoder = new google.maps.Geocoder();
  //   }
  //   function codeLatLng(indeedApp.centerLat, indeedApp.centerLon) {

  //   var latlng = new google.maps.LatLng(lat, lng);
  //   geocoder.geocode({'latLng': latlng}, function(results, status) {
  //     if (status == google.maps.GeocoderStatus.OK) {
  //     console.log(results)
  //       if (results[1]) {
  //        //formatted address
  //        alert(results[0].formatted_address)
  //       //find country name
  //            for (var i=0; i<results[0].address_components.length; i++) {
  //           for (var b=0;b<results[0].address_components[i].types.length;b++) {

  //           //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
  //               if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
  //                   //this is the object you are looking for
  //                   city= results[0].address_components[i];
  //                   break;
  //               }
  //           }
  //       }
  //       //city data
  //       alert(city.short_name + " " + city.long_name)
  //       } else {
  //         alert("No results found");
  //       }
  //     } else {
  //       alert("Geocoder failed due to: " + status);
  //     }
  //   });
  // }

    // Display data on the page
    indeedApp.displayInfo = function(jobs) {
        console.log(jobs);
        if (jobs.length < 1) {
            var noResult = $('<h3>').addClass('error').text(`No results for ${indeedApp.title} in ${indeedApp.location}. Please try other keyword or location.`);
            $('.results').append(noResult);
        }
        //for each job return title, company,city,state,description and date:
            jobs.forEach(function(job){
                // console.log("job", job);
                var jobTitle = job.jobtitle;
                var company = job.company;
                var city = job.city;
                var state = job.state;
                var shortDes = job.snippet;
                var datePosted = job.formattedRelativeTime;
                var applyUrl = job.url;
                //generate html
                var jobTitleEl = $('<h3>').addClass('jobTitle').html(`${jobTitle}`);
                var compLoc = $('<h4>').addClass('location').html(`${company} - ${city}, ${state}`);
                var shortDesEl = $('<p>').addClass('shortDes').html(`${shortDes}`);
                var dateEl = $('<p>').addClass('date').html(`${datePosted}`);
                var apply = $('<a>').text("Apply Now!").addClass('seeBtn').attr('href', applyUrl);
                var showMap = $('<button>').text("Show Map").addClass('showMapBtn').attr('data-lat', job.latitude).attr('data-lon', job.longitude)
                //display on html
                $('.results').append(dateEl,jobTitleEl,compLoc,shortDesEl,apply,showMap);
            })

            $('.showMapBtn').on('click', function(){
                var lat = $(this).data('lat');
                var lng = $(this).data('lon');
                var jobLocation = {lat, lng}

                if (window.marker) {
                    window.marker.setMap(null);
                }
                window.marker = new google.maps.Marker({
                    position: jobLocation,
                    map: map
                });

                  var contentString = '<div id="content">'+
                              '<div id="siteNotice">'+
                              '</div>'+
                              '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
                              '<div id="bodyContent">'+
                              '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
                              'sandstone rock formation in the southern part of the '+
                              'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
                              'south west of the nearest large town, Alice Springs; 450&#160;km '+
                              '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
                              'features of the Uluru - Kata Tjuta National Park. Uluru is '+
                              'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
                              'Aboriginal people of the area. It has many springs, waterholes, '+
                              'rock caves and ancient paintings. Uluru is listed as a World '+
                              'Heritage Site.</p>'+
                              '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
                              'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
                              '(last visited June 22, 2009).</p>'+
                              '</div>'+
                              '</div>';

                  var infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 200
                  });

                  marker.addListener('click', function() {
                    console.log("This is clicked")
                    infowindow.open(map, marker);
                  });
                })
    }


    indeedApp.events = function() {

         $('form').on('submit', function(e) {
            e.preventDefault();
            $('.results').empty();
           var location = $('#location').val();
           var title = $('#title').val();
           indeedApp.location = location;
           indeedApp.title = title;
           indeedApp.getInfo(location,title);
            console.log(indeedApp.title, indeedApp.location);
        });
    }

    var map;
    function initMap() {

      var GeoLo = {lat:  indeedApp.centerLat, lng:  indeedApp.centerLon};
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: indeedApp.centerLat, lng: indeedApp.centerLon},
        zoom: 10
      });
    }

  

    // Start app
    indeedApp.init = function() {
        indeedApp.events();
        indeedApp.getGeocode();
        // initMap();
    }

    $(function() {
        indeedApp.init();
    });