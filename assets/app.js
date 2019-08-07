// Ryan's hiking API Code and Firebase //

//////--------------------------------------------------------///////////////////////
// grabbing address info from user input//
var streetNum = $("#streetNum").val();
// console.log(streetNum);
var city = $("#city").val().trim();
var state = $("#state").val().trim();
var zipCode = $("#zip").val().trim();
var address = streetNum + " " + city + " " + state + " " + zipCode;

// sending info to Firebase // 

var firebaseConfig = {
  apiKey: "AIzaSyB9Wl757G8LcFITZ_o8XCty7R_qe1-RHbM",
  authDomain: "hiking-project-1.firebaseapp.com",
  databaseURL: "https://hiking-project-1.firebaseio.com",
  projectId: "hiking-project-1",
  storageBucket: "",
  messagingSenderId: "271758048795",
  appId: "1:271758048795:web:c4c529634163567b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

///////////////////////////////////////////////////////////////////////
// when the user clicks 'search for hikes' their address is grabbed with jquery and will be sent to firebase and 
// then a map api grabs value from firebase and runs ajax call which logs our address geo coordinates and sends them to firebase
// then we do the hiking API call with all values grabbed from Firebase
// all hiking data is populated onto cards that show in a carousel to the user
///////////////////////////////////////////////////////////////////////
$("#hikeSearch").on("click", function (event) {
  event.preventDefault();
  //////// logging address to Firebase below - on the 'find a hike' click.

  streetNum = $("#streetNum").val();
  city = $("#city").val().trim();
  state = $("#state").val().trim();
  zipCode = $("#zip").val().trim();
  address = streetNum + " " + city + " " + state + " " + zipCode;


  var addressData = {
    Street_Num: streetNum,
    City: city,
    State: state,
    Zip_Code: zipCode,
    Address: address,

  }
  database.ref("user_address").update(addressData);

  //---------------------------------------------//

  database.ref("user_address").on("value", function (childSnapshot) {
    ///////  This is calling the API and sending an address to get back Lat/Lon results ///////////
    var mapURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiYnJ1dG9jYW8iLCJhIjoiY2p5dnE2c2RhMHI0czNqbXJtMHN1YTQ3eiJ9.COtpwPhOluVHKVN1oZdSwg"
    var mapresults = ""
    $.ajax({
      url: mapURL,
      method: "GET"
    })
      .then(function (response) {
        mapResults;
        // storing the data from the AJAX request in the results variable
        var mapResults = response.features
        console.log(mapResults);
        var addressLongitude = mapResults[0].center[0];
        var addressLatitude = mapResults[0].center[1];
        console.log("Address Input Longitude: ", addressLongitude);
        console.log("Address Input Latitude: ", addressLatitude);

        var addressGeo = {
          addressLatitude: addressLatitude,
          addressLongitude: addressLongitude
        }
        //sending the latitude and longitude to Firebase
        database.ref("user_address").update(addressGeo);

      })

    database.ref("user_address").on("value", function (childSnapshot) {
      // setting variables from Firebase values that we can use for our hiking API call      
      firebaseAddressLatitude = childSnapshot.val().addressLatitude;
      firebaseAddressLongitude = childSnapshot.val().addressLongitude;
      console.log(firebaseAddressLatitude);
      console.log(firebaseAddressLongitude);

      // sets the variables and collects their values
      var lat = firebaseAddressLatitude;
      console.log(lat);
      var latSearch = "&lat=" + lat;
      var lon = firebaseAddressLongitude;
      console.log(lon);
      var lonSearch = "&lon=" + lon;
      var searchNum = $("#resultsNum").val().trim();
      var searchNumSearch = "&maxResults=" + searchNum;
      var maxDistance = $("#maxHikeDistance").val().trim();;
      var maxDistanceSearch = "&maxDistance=" + maxDistance;
      var minDistance = $("#minHikeDistance").val().trim();;
      var minDistanceSearch = "&minDistance=" + minDistance;
      var minStars = $("#hikeRating").val().trim();
      var minStarsSearch = "&minStars=" + minStars

      var queryURL = "https://www.hikingproject.com/data/get-trails?" + latSearch + lonSearch + minDistanceSearch + searchNumSearch + maxDistanceSearch + minStarsSearch + "&key=200539534-e303f9de12af6752f80ed195ba310625"
      // console.log(queryURL);
      // console.log(minStarsSearch);


      // Perfoming an AJAX GET request to our queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function (response) {
          // storing the data from the AJAX request in the results variable
          var results = response.trails;

          // console.log(queryURL);
          // console.log(response);
          // console.log(results);

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            for (j = 0; j < results[i].name[j].length; j++) {
              var div = $("<div>")

              trailImage = results[i].imgSmallMed
              div.append(trailImage);
              // console.log(trailImage);
              trailName = results[i].name;
              div.append(trailName)
              // console.log(trailName);
              trailSummary = results[i].summary
              div.append(trailSummary)
              // console.log(trailSummary);
              trailRating = results[i].stars
              div.append(trailRating);
              // console.log(trailRating);
              trailLocation = results[i].location;
              div.append(trailLocation);
              // console.log();
              trailLength = results[i].length;
              div.append(trailLength);
              // console.log(trailLength);
              trailAscent = results[i].ascent
              div.append(trailAscent);
              // console.log(trailAscent);
              trailDescent = results[i].descent
              div.append(trailDescent);
              // console.log(trailDescent);
              trailHighAlt = results[i].high;
              div.append(trailHighAlt);
              // console.log(trailHighAlt);
              trailLowAlt = results[i].low;
              div.append(trailLowAlt);
              // console.log(trailLowAlt);
              trailLongitude = results[i].longitude;
              div.append(trailLongitude);
              // console.log("trail Longitude ln 164: ",trailLongitude);
              trailLatitude = results[i].latitude;
              div.append(trailLatitude);
              // console.log("trail latitude ln 167: ", trailLatitude);
              trailConditionStatus = results[i].conditionStatus;
              div.append(trailConditionStatus);
              // console.log(trailConditionStatus);
              trailConditionDetails = results[i].conditionDetails;
              div.append(trailConditionDetails);
              // console.log(trailConditionDetails);
              trailConditionDate = results[i].conditionDate;
              div.append(trailConditionDate);
              // console.log(trailConditionDate);

              // creates local 'temporary' object for holding hike data

              var hikeData = {
                trail_image: trailImage,
                trail_name: trailName,
                trail_summary: trailSummary,
                trail_location: trailLocation,
                trail_rating: trailRating,
                trail_length: trailLength,
                trail_ascent: trailAscent,
                trail_descent: trailDescent,
                trail_high_alt: trailHighAlt,
                trail_low_alt: trailLowAlt,
                trail_longitude: trailLongitude,
                trail_latitude: trailLatitude,
                trail_condition_status: trailConditionStatus,
                trail_condition_details: trailConditionDetails,
                trail_condition_date: trailConditionDate

              };

              //uploads data to firebase database

              database.ref("trail_info").push(hikeData);

              // console.log(maxDistance);
              // console.log(minDistance);
              // console.log("trail rating from API: ", trailRating);
              // console.log(resultsNum);

              /////// Not sure I need this anymore...////////////////
              // $("#trail_image").val("")
              // $("#trail_Name").val("");
              // $("#trail_Summary").val("");
              // $("#trail_Rating").val("");
              // $("#trail_Rating").val("");
              // $("#trail_Length").val("");
              // $("#trail_Ascent").val("");
              // $("#trail_Descent").val("");
              // $("#trail_High_Altitude").val("");
              // $("#trail_Low_Altitude").val("");
              // $("#trail_Latitude").val("");
              // $("#trail_Longitude").val("");
              // $("#trail_Condition_Status").val("");
              // $("#trail_Condition_Status").val("");
              // $("#trail_Condition_Date").val("");
              /////// Not sure I need this anymore...////////////////


            }
          }

          //referencing the database and setting the value of the snapshots to a variable
          database.ref("trail_info").on("child_added", function (childSnapshot) {

            var trailImageData = childSnapshot.val().trail_image;
            var trailNameData = childSnapshot.val().trail_name;
            var trailSummaryData = childSnapshot.val().trail_summary;
            var trailLocationData = childSnapshot.val().trail_location;
            var trailRatingData = childSnapshot.val().trail_rating;
            var trailLengthData = childSnapshot.val().trail_length;
            var trailAscentData = childSnapshot.val().trail_ascent;
            var trailDescentData = childSnapshot.val().trail_descent;
            var trailHighAltData = childSnapshot.val().trail_high_alt;
            var trailLowAltData = childSnapshot.val().trail_low_alt;
            var trailLongitude = childSnapshot.val().trail_longitude;
            var trailLatitude = childSnapshot.val().trail_latitude;
            var trailConditionStatusData = childSnapshot.val().trail_condition_status;
            var trailConditionDetailsData = childSnapshot.val().trail_condition_details;
            var trailConditionDateData = childSnapshot.val().trail_condition_date;

            // adding jquery to variables for carousel card formatting
            var card = $("<div>").addClass("card hoverable");
            var bold = $("<b>")
            var linkBtn = $("<a>").addClass("btn-floating halfway-fab waves-effect waves-light red");
            var iLink = $("<i>").addClass("material-icons")
            var addPlus = $("<i id='theRedBtn'>").html("add")
            addPlus.attr("data-long", trailLongitude)
            addPlus.attr("data-lat", trailLatitude)
            iLink.append(addPlus)
            var cardImg = $("<div>").addClass("card-image");
            var cardContent = $("<div>").addClass("card-content");
            var carouselItem = $("<div>").addClass("carousel-item")
            var trailNameData = $("<div>").text(trailNameData);
            bold.append(trailNameData)
            var trailLocationData = $("<div>").text(trailLocationData);
            var trailImageData = $("<img>").attr("src", trailImageData);
            trailImageData.addClass("card-image")
            var trailSummaryData = $("<div>").text(trailSummaryData);
            var trailLengthData = $("<div>").append("Trail Length: ", + trailLengthData + " miles");
            var trailAscentData = $("<div>").append("Asecent: " + trailAscentData + " feet");
            var trailDescentData = $("<div>").append("Descent: " + trailDescentData + " feet");
            var trailHighAltData = $("<div>").append("Highest Altitude: ", + trailHighAltData + " feet");
            var trailLowAltData = $("<div>").append("Lowest Altitude: ", trailLowAltData + " feet");
            var trailLongitudeData = $("<div id='trailLongData'>").append("Longitude: ", + trailLongitude);
            trailLongitudeData.addClass("longitude")
            trailLongitudeData.attr("data-val", trailLongitude)

            var trailLatitudeData = $("<div id='trailLatData'>").append("Latitude: ", + trailLatitude);
            trailLatitudeData.addClass("latitude")
            trailLatitudeData.attr("data-val", trailLatitude)

            var trailConditionStatusData = $("<div>").append("Trail Condition: ", + trailConditionStatusData);
            var trailConditionDetailsData = $("<div>").append("Condition Details: ", + trailConditionDetailsData);
            var trailConditionDateData = $("<div>").append("Date Reported: " + trailConditionDateData);
            var trailRatingData = $("<div>").append("Trail Rating: ", + trailRatingData);

            //appending info to the card
            carouselItem.append(card)
            cardContent.append(card)
            trailNameData.addClass("card-title");
            card.append(trailNameData);
            card.append(trailLocationData)
            card.append(cardImg)
            cardImg.append(linkBtn)
            cardImg.append(trailImageData)
            linkBtn.append(iLink)
            card.append(trailSummaryData);
            card.append(trailLengthData)
            card.append(trailAscentData)
            card.append(trailDescentData);
            card.append(trailHighAltData)
            card.append(trailLowAltData)
            card.append(trailLongitudeData);
            card.append(trailLatitudeData)
            card.append(trailConditionStatusData)
            card.append(trailConditionDetailsData);
            card.append(trailConditionDateData)
            card.append(trailRatingData)

            //setting all card content to a single variable
            var newHike = carouselItem.append(cardContent);

            //appending that variable to the HTML page
            $("#carouselResults").append(newHike)
          });
          $(document).ready(function () {
            $('.carousel').carousel();
          });
        })
    })
  });
}) // this closing bracket is from the 'find a hike' function... may need to go at bottom again, but for now it works here...

// End of Ryan's hiking API and Firebase Code //

// ryans_maps start

$(document).ready(function () {

  $(document).on('click', '#theRedBtn', function (event) { //#theRedBtn   // #testBtn
    event.preventDefault();
    // alert("working!")
    var btnLat = $(this).attr("data-lat");
    // console.log("Btn Latitude: ", btnLat);
    var btnLong = $(this).attr("data-long");
    // console.log("Btn Longitude: ", btnLong);
    var clicked = {
      buttonLat: btnLat,
      buttonLon: btnLong
    }
    database.ref("clicked").update(clicked);
    // console.log("firebase address latitude: ", firebaseAddressLatitude);
    // console.log("firebase address longitude: ", firebaseAddressLongitude);
    // console.log("btn latitude: ", btnLat);
    // console.log("btn longitude: ", btnLong);
    var mapCoordsURL = "https://api.mapbox.com/directions/v5/mapbox/driving/" + firebaseAddressLongitude + "%2C" + firebaseAddressLatitude + "%3B" + btnLong + "%2C" + btnLat + ".json?access_token=pk.eyJ1IjoiYnJ1dG9jYW8iLCJhIjoiY2p5dnE2c2RhMHI0czNqbXJtMHN1YTQ3eiJ9.COtpwPhOluVHKVN1oZdSwg&steps=true&geometries=geojson"
    // console.log(mapCoordsURL);

    $.ajax({
      url: mapCoordsURL,
      method: "GET"
    })
      .then(function (response) {
        var routeData = response.routes;
        //  console.log(response);
        console.log(response.routes);
        for (let i = 0; i < routeData.length; i++) {
          console.log(routeData[i].geometry);
          console.log(routeData[i].geometry.coordinates);
          console.log(routeData[i].geometry.coordinates[i]);
          geoCoordinates = routeData[i].geometry.coordinates
          console.log("geoCoordinates from for loop: ", geoCoordinates);

          for (let j = 0; j < geoCoordinates.length; j++) {
            // console.log(geoCoordinates[j]);
            // call the api and get a result
            // get the coordinates from that result
            // push those coordinates as an array to a variable
            // map directions load function between here///

            // setting variables from Firebase values that we can use for our hiking API call      
            database.ref("user_address").on("value", function (childSnapshot) {
              firebaseAddressLatitude = childSnapshot.val().addressLatitude;
              firebaseAddressLongitude = childSnapshot.val().addressLongitude;
              // console.log(firebaseAddressLatitude);
              // console.log(firebaseAddressLongitude);
              mapboxgl.accessToken = 'pk.eyJ1IjoiYnJ1dG9jYW8iLCJhIjoiY2p5dnE2c2RhMHI0czNqbXJtMHN1YTQ3eiJ9.COtpwPhOluVHKVN1oZdSwg';
              // loading the map with coordinates of user address
              var map = new mapboxgl.Map({
                container: 'map', // HTML container id
                style: 'mapbox://styles/mapbox/streets-v11', // style URL
                center: [firebaseAddressLongitude, firebaseAddressLatitude], // starting position as [lng, lat] from globals up
                zoom: 13
              });
              // loading a marker pin on the user address coordinates
              var marker = new mapboxgl.Marker()
                .setLngLat([firebaseAddressLongitude, firebaseAddressLatitude])
                .addTo(map);

              map.on('load', function () {

                map.addLayer({
                  "id": "route",
                  "type": "line",
                  "source": {
                    "type": "geojson",
                    "data": {
                      "type": "Feature",
                      "properties": {},
                      "geometry": {
                        "type": "LineString",
                        "coordinates": geoCoordinates

                      }
                    }
                  },
                  "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                  },
                  "paint": {
                    "line-color": "red",
                    "line-width": 4
                  }

                });
              });
            })
          }
        }
      })
  })
})
// Ryan's maps finished.... loads the map with pins and a route
// completely clear and working above here...
// document.ready( database.ref().remove())    /////  use this to clear all data from server on reload


/////////////////Ryan's Checklist/////////////////
$("#addItem").on("click", function (event) {
  event.preventDefault();
  newItem = $("#newItem").val()


  fbItem = {
    item: newItem
  }

  database.ref("To_Bring").push(fbItem);
  $("#newItem").val("")
  var tRow = $("<tr>")
  var tdDiv = $("<div>")
  var tdata = $("<td type='button'>Xbtn</td>")
  var tdItem = $("<td> this </td>")
  tdItem.prepend(tdItem)
  // var fbItem = 

  tRow.append(tdata)
  $("#itemsHere").append(tRow)
})


database.ref("To_Bring").on("value", function (childSnapshot) {
  // item = childSnapshot.val().newItem
  // console.log(item)
})


///////////////////End Ryan's Checklist////////////////////////







////////////weather API Call///////////////////////
database.ref("clicked").on("value", function (childSnapshot) {
  // setting variables from Firebase values that we can use for our hiking API call      
  FBClickedLat = childSnapshot.val().buttonLat;
  FBClickedLon = childSnapshot.val().buttonLon;
  console.log(FBClickedLat);
  console.log(FBClickedLon);
  fiveDayWeatherURL = "http://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?lat=" + FBClickedLat + "&lon=" + FBClickedLon + "&units=imperial&appid=22de8c06ddcfd46922704ca4f14e92fa"
  // key2: 96dc28953b5af5a1f44cbdd79a3e995d
  // openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=b6907d289e10d714a6e88b30761fae22
  console.log(fiveDayWeatherURL);
  $.ajax({
    url: fiveDayWeatherURL,
    method: "GET",
    dataType: 'json'
  })
    .then(function (response) {
      var div = $("<div>")

      var config = [
        {
          time: "06:00:00",
          value: "6:00am"
        },
        {
          time: "09:00:00",
          value: "9:00am"
        },
        {
          time: "12:00:00",
          value: "12:00pm"
        },
        {
          time: "15:00:00",
          value: "3:00pm"
        },
        {
          time: "18:00:00",
          value: "6:00pm"
        },]

      var counter = 5;
      var rowCount = 0;
      var dayVal = 0
      row = $("<div class='row'>")
      // div = $("<div>")
      for (var i = 0; i < response.list.length; i++) {
        var dt_txt = response.list[i].dt_txt;
        // console.log(dt_txt);
        var time = dt_txt.split(" ");
        // console.log(time);

        for (var j = 0; j < config.length; j++) {
          if (config[j].time === time[1]) {
            // console.log(config[j]);
            // console.log(counter);
            // console.log(response.list[i].main.temp)
            var daytime = dayVal+[j]; 
            console.log("day time",daytime);
            var temp = response.list[i].main.temp;
            var cloud = response.list[i].clouds.all;
            var wind = response.list[i].wind.speed;
            var tempDiv = $('<span>').text("Temperature: " + temp + " F");
            tempDiv.attr("data-time", daytime)
            var cloudDiv = $("<div>").text("Cloud cover: " + cloud + "%" );
            cloudDiv.attr("data-time", daytime)
            var windDiv = $("<div>").text("Wind Speed: " + wind)
            windDiv.attr("data-time", daytime)

            counter--;
            row.append(tempDiv)
            row.append(cloudDiv)
            row.append(windDiv)

            // div.addClass(row)
            // div.append(temp)
            
            if (counter === 0) {
              row.addClass('day' + rowCount);
              rowCount++;
              $(".weather-container").append(row)
              row = $("<div class='row'>");
              counter = 5;
            }
          }
        }
      }

      var weatherInfo = response;
      console.log(weatherInfo);
      var weatherCity = weatherInfo.city.name;
      div.append(weatherCity);
      console.log(weatherInfo.city.name);
      var weatherTimeZone = weatherInfo.city.timezone
      div.append(weatherTimeZone);
      console.log(weatherInfo.city.timezone);
      // console.log(hrNum);
      for (let i = 0; i < weatherInfo.list.length; i++) {
        for (let h = 0; h < weatherInfo.list.length; h++) {
          // console.log(weatherInfo.list[i]); //gives a ton of objects/arrays
          // var weatherTemp = weatherInfo.list[i].main.temp;
          // div.append("This Temperature: " + weatherTemp);
          // $(".bottom").append(div)

          var weatherDescription = weatherInfo.list[i].weather[0].description;  // no clue why this stops the loop from
          div.append(weatherDescription);
          // console.log("weather description: ", weatherInfo.list[i].weather[0].description);
          var unixDT = weatherInfo.list[i].dt;
          div.append(unixDT);
          // console.log("unix dt: ", weatherInfo.list[i].dt) 
          var cloudCover = weatherInfo.list[i].clouds.all;
          div.append(cloudCover);
          // console.log("cloud cover %: ", weatherInfo.list[i].clouds.all) 
          var windSpeed = weatherInfo.list[i].wind.speed;
          div.append(windSpeed);
          // console.log("wind speed: ", weatherInfo.list[i].wind.speed)
          var windDeg = weatherInfo.list[i].wind.deg;
          div.append(windDeg)
          // console.log("wind deg: ", weatherInfo.list[i].wind.deg)
          var dateTimeText = weatherInfo.list[i].dt_txt;
          div.append(dateTimeText)
          // console.log("date time text: ", weatherInfo.list[i].dt_txt );
        }

        var tempforecast = {
          weather_city: weatherCity,
          weather_timezone: weatherTimeZone,
          weather_description: weatherDescription,
          UnixDT: unixDT,
          cloudCover: cloudCover,
          wind_speed: windSpeed,
          wind_deg: windDeg,
          date_time_text: dateTimeText
        }

        database.ref("forecast").push(tempforecast)
      }
    })

  database.ref("forecast").on("child_added", function (childSnapshot) {

    var citydata = childSnapshot.val().weather_city;
    var timezone = childSnapshot.val().weather_timezone
    var weatherdesc = childSnapshot.val().weather_description;
    // console.log(weatherdesc);
    var unixTime = childSnapshot.val().UnixDT;
    var cloudcover = childSnapshot.val().cloudCover;
    var windspeed = childSnapshot.val().wind_speed;
    var winddegree = childSnapshot.val().wind_deg;
    var datetimetext = childSnapshot.val().date_time_text;

    // num=0
    // var day1=[10,11,12,13,14]

    // var day0=[2,3,4,5,6];
    // var div = $("<div>")
    // var br = $("<br>")
    // for(let j=0; j<day0.length; j++){
    //   // var num0 = day0[2]
    //   console.log(day0[j]);
    //   // console.log("temperature: ", weatherInfo.list[num0].main.temp)
    //   // $("#day06AMtemp").text("Temperature: " + weatherInfo.list[2].main.tem
    //   temp0 =  weatherInfo.list[j].main.temp
    //   div.append("temp0:",temp0)
    // } 

    // var tempCard = $("<div>").addClass("day"+num)
    // var tempday0 = $("<div>").append("temp: ", temp0)
    // tempCard.append(tempday0)
    // // description0 =  weatherInfo.list[num0].weather[0].description
    //   // div.append(br)
    //   // div.append("Temperature: " + temp0 )
    //   // div.append("Weather Description: " +  description0 )
    //   $(".day0").append(div)

  })
})


// curent time is( list:dt) minus (city: -timezone)
///////////////////////////////////////////
