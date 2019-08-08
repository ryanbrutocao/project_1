// Ryan's hiking API Code and Firebase //

//////--------------------------------------------------------///////////////////////


var firebaseConfig = {
  apiKey: "AIzaSyA3Udzejqqcsd9dKQt84RK1Fpikcinmu6s",
    authDomain: "group-project1-7e584.firebaseapp.com",
    databaseURL: "https://group-project1-7e584.firebaseio.com",
    projectId: "group-project1-7e584",
    storageBucket: "",
    messagingSenderId: "436699833671",
    appId: "1:436699833671:web:640129acb8d1dabf"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

$("#hikeSearch").on("click", function (event) {
  event.preventDefault();
// sets the variables and collects their values
var lat = 40.0274;
var latSearch = "&lat=" + lat; 
var lon = -105.2519;
var lonSearch = "&lon=" + lon;
var searchNum =  $("#resultsNum").val().trim();
var searchNumSearch = "&maxResults=" +searchNum;
var maxDistance = $("#maxHikeDistance").val().trim();;
var maxDistanceSearch = "&maxDistance=" + maxDistance;
var minDistance = $("#minHikeDistance").val().trim();;
var minDistanceSearch = "&minDistance=" + minDistance;
var minStars = $("#hikeRating").val().trim();
var minStarsSearch = "&minStars=" + minStars
 
  var queryURL = "https://www.hikingproject.com/data/get-trails?"  + latSearch + lonSearch + minDistanceSearch + searchNumSearch + maxDistanceSearch + minStarsSearch +"&key=200539534-e303f9de12af6752f80ed195ba310625"
// console.log(queryURL);
// console.log(minStarsSearch);


  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  .then(function(response) {
    // storing the data from the AJAX request in the results variable
    var results = response.trails;
    
    console.log(queryURL);
    console.log(response);
    console.log(results);

// Looping through each result item
for (var i = 0; i < results.length; i++) {

  for (j=0; j<results[i].name[j].length; j++){
  var div = $("<div>")

  trailImage = results[i].imgSmallMed
  div.append(trailImage);
console.log(trailImage);
  trailName = results[i].name;
  div.append(trailName)
console.log(trailName);
  trailSummary = results[i].summary
  div.append(trailSummary)
  console.log(trailSummary);
  trailRating = results[i].stars
  div.append(trailRating);
  console.log(trailRating);
  trailLocation = results[i].location;
  div.append(trailLocation);
  console.log();
  trailLength = results[i].length;
  div.append(trailLength);
  console.log(trailLength);
  trailAscent = results[i].ascent
  div.append(trailAscent);
  console.log(trailAscent);
  trailDescent = results[i].descent
  div.append(trailDescent);
console.log(trailDescent);
  trailHighAlt = results[i].high;
  div.append(trailHighAlt);
  console.log(trailHighAlt);
  trailLowAlt = results[i].low;
  div.append(trailLowAlt);
  console.log(trailLowAlt);
  trailLongitude = results[i].longitude;
  div.append(trailLongitude);
  console.log(trailLongitude);
  trailLatitude = results[i].latitude;
  div.append(trailLatitude);
  console.log(trailLatitude);
  trailConditionStatus = results[i].conditionStatus;
  div.append(trailConditionStatus);
  console.log(trailConditionStatus);
  trailConditionDetails = results[i].conditionDetails;
  div.append(trailConditionDetails);
  console.log(trailConditionDetails);
  trailConditionDate = results[i].conditionDate;
  div.append(trailConditionDate);
  console.log(trailConditionDate);


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
  
  database.ref().push(hikeData);
  
  // console.log(maxDistance);
  // console.log(minDistance);
  // console.log("trail rating from API: ", trailRating);
  // console.log(resultsNum);
  

  $("#trail_image").val("")
  $("#trail_Name").val("");
  $("#trail_Summary").val("");
  $("#trail_Rating").val("");
  $("#trail_Rating").val("");
  $("#trail_Length").val("");
  $("#trail_Ascent").val("");
  $("#trail_Descent").val("");
  $("#trail_High_Altitude").val("");
  $("#trail_Low_Altitude").val("");
  $("#trail_Latitude").val("");
  $("#trail_Longitude").val("");
  $("#trail_Condition_Status").val("");
  $("#trail_Condition_Status").val("");
  $("#trail_Condition_Date").val("");

  }}
  
  //referencing the database and setting the value of the snapshots to a variable
  database.ref().on("child_added", function(childSnapshot) {
 
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
  var trailLongitudeData = childSnapshot.val().trail_longitude;
  var trailLatitudeData = childSnapshot.val().trail_latitude;
  var trailConditionStatusData = childSnapshot.val().trail_condition_status;
  var trailConditionDetailsData = childSnapshot.val().trail_condition_details;
  var trailConditionDateData = childSnapshot.val().trail_condition_date;



 // adding jquery to variables for carousel card formatting
  var card = $("<div>").addClass("card");
  var bold = $("<b>")
  var linkBtn = $("<a>").addClass("btn-floating halfway-fab waves-effect waves-light red");
  var iLink = $("<i>").addClass("material-icons")
  var addPlus = $("<i>").html("add")
 
  iLink.append(addPlus)
  var cardImg = $("<div>").addClass("card-image");
  var cardContent = $("<div>").addClass("card-content");
  var carouselItem = $("<div>").addClass("carousel-item")
  var trailNameData = $("<div>").text(trailNameData);
  bold.append(trailNameData)
  var trailLocationData = $("<div>").text(trailLocationData);
  var trailImageData =  $("<img>").attr("src",trailImageData);
  
  trailImageData.addClass("card-image")
  var trailSummaryData =  $("<div>").text(trailSummaryData);
  var trailLengthData = $("<div>").append("Trail Length: ", + trailLengthData + " miles");
  var trailAscentData = $("<div>").append("Asecent: " + trailAscentData + " feet");
  var trailDescentData = $("<div>").append("Descent: " + trailDescentData + " feet");

  var trailHighAltData = $("<div>").append("Highest Altitude: ", + trailHighAltData + " feet" );
  var trailLowAltData =  $("<div>").append("Lowest Altitude: ", trailLowAltData + " feet");
  var trailLongitudeData = $("<div>").append("Longitude: ", + trailLongitudeData);
  var trailLatitudeData = $("<div>").append("Latitude: ", + trailLatitudeData);
  
  var trailConditionStatusData =  $("<div>").append("Trail Condition: ", + trailConditionStatusData);
  var trailConditionDetailsData =  $("<div>").append("Condition Details: ", + trailConditionDetailsData);
  var trailConditionDateData = $("<div>").append("Date Reported: " + trailConditionDateData);
  var trailRatingData =  $("<div>").append("Trail Rating: ", + trailRatingData);
  

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
var newHike = carouselItem.append(
  cardContent

  );
 
  //appending that variable to the HTML page
$("#carouselResults").append(newHike)  
  });
  $(document).ready(function(){
    $('.carousel').carousel();
  });
    })

  });


// End of Ryan's hiking API and Firebase Code //HighAlt


//Beginning of David's checklist javascript work

   // This is the beginning code for the checklist to function
$('ul').on('click', 'li', function() {

  $(this).toggleClass('delete');

});

// Below is the code for deleting items from the list
//the This statement with fadeout controls how quickly the item disappears from the list itself.
$('ul').on('click', 'span', function(event) {
  $(this).parent().fadeOut(300, function() {
    $(this).remove();

  });
  event.stopPropagation();

});

// Make a new checklist item
$('input[type="text"]').on('keypress', function(event) {
  //the code below states that if the enter key is depressed after user input is made, their input will be added to the list via the enter button
  if (event.which === 13) {
    var newItem = $(this).val();
    $(this).val("");
    //the code below will take the user input and add it to the existing list.
    $('ul').prepend('<li><span><i class="far fa-trash-alt" aria-hidden="true"></i></span> ' + newItem + '</li>');

  }
});