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
      // if JSON call successful, use JSON to make an HTML factory
      htmlFactory = new HtmlFactory(json);
      // display page
      fadePageIn(htmlFactory);
    })
    .fail(function(){
      noWeatherError();
    });
  }
  
  function fadePageIn(htmlFactory){
    /* Use fade effect to display page */
    
    // pre-load background image
    var bgImage = new Image();
    bgImage.onload = function(){
      $("body").css("background-image", "url('" + bgImage.src + "')");
      $("body").css("background-size", "cover");
      $("body").html(htmlFactory.bodyHTML);
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
        console.log("Invalid argument for setUnits() in index.js");
        return undefined;
    }
}


/* * * * * BEGIN EXECUTION ON DOC READY * * * * */

$(document).ready(function() {
  main();
});