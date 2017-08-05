/* * * * * GLOBAL PROTOTYPES * * * * */

var currentUnits = "";
var currentTemp = 0;
var htmlFactory = {};


/* * * * * FUNCTIONS * * * * */

function main(){
  /* Show the local weather */

  // If geolocation not available
  if (!(navigator.geolocation)) {
    $("body").html("<h3 class='vertical-center-text' align='center'>"
                 + "Your browser does not support geolocation.</h3>");
  } else {
    // If geolocation is available, get weather
    navigator.geolocation.getCurrentPosition(getWeather);
  }
  
  function getWeather(position){
    /* Callback function for getCurrentPosition(),
    gets weather from API */

    var apiURL = "https://fcc-weather-api.glitch.me/api/current?lat="
               + position.coords.latitude
               + "&lon="
               + position.coords.longitude;
    $.getJSON(apiURL)
    .done(function(json){
	  // display page if JSON call successful
	  htmlFactory = new HtmlFactory(json);
      fadePageIn(htmlFactory);
	})
    .fail(function(){
	  noWeatherError();
	});
  }
  
  function fadePageIn(htmlFactory){
	/* Use fade effect to display page */
	var bgImage = new Image();
	bgImage.onload = function(){
      $("body").html(htmlFactory.bodyHTML);
	  $("body").css("background-image", "url('" + bgImage.src + "')");
      $("#main").fadeIn(5000);
      $("#blackscreen").fadeOut(10000);
	}
	bgImage.src = htmlFactory.backgroundURL;
  }
  
  function noWeatherError(){
    /* Failure callback for $.getJSON() */
    $("body").html("<h3 class='vertical-center-text' align='center'>"
                          + "<i class='fa fa-window-close fa-5x' "
                          + "aria-hidden='true'></i><br />"
                          + "Could not retrieve weather.</h3>");
  }
}


function switchUnits(units){
	/* onClick script for switching between C and F on page */
    if (units === 'F' || units === 'C'){
		var tempHTML = htmlFactory.getTemperatureHTML(currentTemp, units);
		var unitsHTML = htmlFactory.getTemperatureUnitsHTML(units);
		$("#temp-html").html(tempHTML);
		$("#units-html").html(unitsHTML);
    } else {
		console.log("Invalid argument for setUnits() in index.js")
		return null;
	}
}


function getUnits(countryID){
  /* Determine weather to use Celsius or Fahrenheit */
  switch(countryID){
    case "AS":
    case "BS":
    case "BZ":
    case "GU":
    case "FM":
    case "KY":
    case "MH":
    case "MP":
    case "PR":
    case "PW":
    case "UM":
    case "US":
    case "VI":
      return 'F';

    default:
      return 'C';
  }
}


function capitalize(string) {
    /* Capitalize the first char of a string */
    if (typeof(string) !== "string" || string.length < 1) {
      return undefined;
    } else {
      return string[0].toUpperCase() + string.slice(1);
    }
}


function round(value, decimals) {
  /* Round to x decimal places,
  from http://www.jacklmoore.com/notes/rounding-in-javascript/ */
  
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}


/* * * * * BEGIN EXECUTION ON DOC READY * * * * */

$(document).ready(function() {
  main();
});