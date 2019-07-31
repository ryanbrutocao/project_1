// Ryan's hiking API Code and Firebase //

//////--------------------------------------------------------///////////////////////


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

$("#hikeSearch").on("click", function (event) {
  event.preventDefault();
////-------------------------------
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
  var p = $("<p>")
  div.append(p)
  

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
  $("#trailRatingResult").append(div)

////-------------------------------
  //grabs user input
  // var maxDistance = $("#maxHikeDistance").val().trim();
  // var minDistance = $("#minHikeDistance").val().trim();
  // var hikeRating = $("#hikeRating").val().trim();
  // console.log("hike rating input: ", hikeRating);
  // var resultsNum = $("#resultsNum").val().trim();
  
  // creates local 'temporary' object for holding hike data
  
  var hikeData = {
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
  
  alert("successfully added to database")
  
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
  
  
  database.ref().on("child_added", function(childSnapshot) {
 
    //store database results into variables
  // var maxDistData = childSnapshot.val().maxDistance;
  // var minDistData = childSnapshot.val().minDistance;
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

  
  var newRow = $("<tr>").append(
    $("<td>").text(trailNameData),
    $("<td>").text(trailSummaryData),
    $("<td>").text(trailLocationData),
    $("<td>").text(trailRatingData),
    $("<td>").text(trailLengthData),
    $("<td>").text(trailAscentData),
    $("<td>").text(trailDescentData),
    $("<td>").text(trailHighAltData),
    $("<td>").text(trailLowAltData),
    $("<td>").text(trailLongitudeData),
    $("<td>").text(trailLatitudeData),
    $("<td>").text(trailConditionStatusData),
    $("<td>").text(trailConditionDetailsData),
    $("<td>").text(trailConditionDateData),
  );
  newRow.append("<br>")
  // Append the new row to the table
  $("#hiking-table > tbody").append(newRow);
  
  });
      
    })

  });


// End of Ryan's hiking API and Firebase Code //