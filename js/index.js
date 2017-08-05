/* * * * * GLOBALS * * * * */

var currentUnits = "";
var currentTemp = 0;

/* * * * * DICTIONARIES * * * * */

var backgrounds = {
  init: function(){
    this.root = "images/backgrounds/";
    this.ash = this.root + "ash.jpg";
    this.calm = this.root + "calm.jpg";
    this.clear = this.root + "clear.jpg";
    this.clouds = this.root + "clouds.jpg";
    this.cold = this.root + "cold.jpg";
    this.drizzle = this.root + "drizzle.jpg";
    this.fewClouds = this.root + "few-clouds.jpg";
    this.fog = this.root + "fog.jpg";
    this.hot = this.root + "hot.jpg";
    this.hurricane = this.root + "hurricane.jpg";
    this.overcast = this.root + "overcast.jpg";
    this.rain = this.root + "rain.jpg";
    this.sand = this.root + "sand.jpg";
    this.sleet = this.root + "sleet.jpg";
    this.snow = this.root + "snow.jpg";
    this.thunderstorm = this.root + "thunderstorm.jpg";
    this.tornado = this.root + "dark-storm.jpg";
    this.wind = this.root + "wind.jpg";
	return this;
  }
}.init();


/* * * * * FUNCTIONS * * * * */

function displayPage(){
  /* Show the local weather */

  // If geolocation not available
  if (!(navigator.geolocation)) {
    $("body").html(bodyHTML);
    $("#main-wrapper").html("<h3 class='vertical-center-text' align='center'>"
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
    .done(function(json){ displayWeather(json); })
    .fail(function(){ noWeatherError(); });
  }
  
  function noWeatherError(){
    /* Failure callback for $.getJSON() */
    $("body").html(bodyHTML);
    $("#main").html("<h3 class='vertical-center-text' align='center'>"
                          + "<i class='fa fa-window-close fa-5x' "
                          + "aria-hidden='true'></i><br />"
                          + "Could not retrieve weather.</h3>");
  }
  
  function displayWeather(json){
    /* Success callback for $.getJSON() */
    var units = getUnits(json.sys.country);
    var divs = new Object();
    divs.weatherIcon = json.weather[0].icon;
    divs.weatherText = capitalize(json.weather[0].description);
    divs.temperatureReading = getTemperatureHTML(json.main.temp, units);
    divs.temperatureUnitsHTML = getTemperatureUnitsHTML(units);
    divs.backgroundURL = getBackgroundURL(json.weather[0].id);
	divs.placeName = json.name;
	
	// Save to globals
	currentTemp = json.main.temp;
	currentUnits = units;
	
    fadePageIn(divs);
  }
  
  function fadePageIn(divs){
    $("body").html("<div id='blackscreen'></div>"
                 + "<div class='container'>"
                 +    "<div id='main'>"
                 +      "<div class='row'>"
                 +        "<div class='col-lg-3'></div>"
                 +        "<div class='col-lg-6'>"
                 +          "<div class='card card-inverse' align='center'>"
                 +            "<div class='row'>"
				 +              "<div class='col-12'>"
				 +                "<h2 id='place-name' align='center'>"
				 +                  divs.placeName + " Weather"
				 +                "</h2>"
				 +              "</div>"
                 +            "</div>"
                 +            "<div class='row'>"
				 +              "<div class='col-sm-6'>"
				 +                "<img id='w-icon' src='" + divs.weatherIcon + "' alt='Weather Image' height='200' width='200'>"
				 +              "</div>"
				 +              "<div id='vertical-col-spacer'></div>"
				 +              "<div class='col-sm-5' id='card-col-r'>"
				 +                "<h1 id='card-col-r-text'>"
				 +                  divs.weatherText 
				 +                  "<br />" 
				 +                  "<span id='temp-html'>" + divs.temperatureReading + "</span>"
				 +                  "<span id='units-html'>" + divs.temperatureUnitsHTML + "</span>" 
				 +                "</h1>"
				 +              "</div>"
                 +            "</div>"
                 +          "</div>"
                 +        "</div>"
                 +        "<div class='col-lg-3'></div>"
                 +      "</div>"
                 +    "</div>"
                 + "</div>");
	var bgImage = new Image();
	bgImage.onload = function(){
	  $("body").css("background-image", "url('" + divs.backgroundURL + "')");
      $("#main").fadeIn(5000);
      $("#blackscreen").fadeOut(10000);
	}
	bgImage.src = divs.backgroundURL;
  }
}


function switchUnits(units){
	/* onClick script for switching between C and F on page */
    if (units === 'F' || units === 'C'){
		var tempHTML = getTemperatureHTML(currentTemp, units);
		var unitsHTML = getTemperatureUnitsHTML(units);
		$("#temp-html").html(tempHTML);
		$("#units-html").html(unitsHTML);
    } else {
		console.log("Invalid argument for setUnits() in index.js")
		return null;
	}
}


function getTemperatureHTML(temp, units){
  /* Returns HTML div for temperature reading in appropriate units */
  var temp;
  if (units === 'F'){
    temp = round(((temp * 9/5) + 32), 1).toString();
  } else if (units === 'C'){
    temp = round(temp, 1).toString();
  } else {
    temp = null;
  }
  return temp + "&deg";
}

function getTemperatureUnitsHTML(units){
  if (units === 'F'){
    return "F | <a href='#' onclick=\"switchUnits('C')\">C</a>";
  } else if (units === 'C'){
    return "C | <a href='#' onclick=\"switchUnits('F')\">F</a>";
  }
}

function getBodyHTML(divs){
  return "<div id='main-wrapper' class='container'>"
       +   "<div class='row'>"
       +     "<h2 id='location'></h2>"
       +   "</div>"
       +   "<div class='row'>"
       +     "<div id='left-col' class='col-sm-6'>"
       +       "<div id='weather-icon'>"
       +         divs.weatherIcon
       +       "</div>"
       +     "</div>"
       +     "<div id='right-col' class='col-sm-6'>"
       +       "<div class='row' id='weather-text'>"
       +         divs.weatherText
       +       "</div>"
       +       "<div id='temperature-row' class='row'>"
       +         "<div class='col-6' id='temperature-reading'>"
       +           divs.temperatureReading
       +         "</div>"
       +         "<div id='temperature-fc-switch' class='col-6'>"
       +           divs.temperatureUnitsHTML
       +         "</div>"
       +       "</div>"
       +     "</div>"
       +   "</div>"
       + "</div>";
}


function getBackgroundURL(weatherID){
  switch(weatherID){
      case 200:
      case 201:
      case 202:
      case 210:
      case 211:
      case 212:
      case 221:
      case 230:
      case 231:
      case 232:
      case 960:
      case 961:
        return backgrounds.thunderstorm;

      case 300:
      case 301:
      case 302:
      case 310:
      case 311:
      case 312:
      case 313:
      case 314:
      case 321:
        return backgrounds.drizzle;

      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
      case 520:
      case 521:
      case 522:
      case 531:
        return backgrounds.rain;

      case 511:
      case 611:
      case 612:
      case 615:
      case 616:
      case 620:
      case 621:
      case 622:
      case 906:
        return backgrounds.sleet;

      case 600:
      case 601:
      case 602:
        return backgrounds.snow;

      case 701:
      case 711:
      case 721:
      case 741:
        return backgrounds.fog;

      case 731:
      case 751:
      case 761:
        return backgrounds.sand;

      case 762:
        return backgrounds.ash;

      case 771:
      case 901:
      case 902:
      case 957:
      case 958:
      case 959:
      case 962:
        return backgrounds.hurricane;

      case 781:
      case 900:
        return backgrounds.tornado;

      case 800:
        return backgrounds.clear;

      case 801:
        return backgrounds.fewClouds;

      case 802:
      case 803:
        return backgrounds.clouds;

      case 804:
        return backgrounds.overcast;

      case 903:
        return backgrounds.cold;

      case 904:
        return backgrounds.hot;

      case 905:
      case 952:
      case 953:
      case 954:
      case 955:
      case 956:
        return backgrounds.wind;

      case 951:
        return backgrounds.calm;

      default:
        return backgrounds.clouds;
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

/* * * * * BEGIN EXECUTION * * * * */

$(document).ready(function() {
  displayPage();
});