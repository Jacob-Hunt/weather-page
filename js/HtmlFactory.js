class HtmlFactory {
  constructor(json){
	this.placeName = json.name;
	this.temp = json.main.temp;
    this.units = helpers.getUnits(json.sys.country);
    this.weatherIcon = json.weather[0].icon; 
    this.weatherText = helpers.capitalize(json.weather[0].description);
	this.weatherID = json.weather[0].id;

	// Save to globals
	currentTemp = this.temp;
	currentUnits = this.units;
  }

  getTemperatureHTML(temp, units) {
    /* Returns HTML snippet for temperature reading in appropriate units */
    if (units === 'F'){
      temp = helpers.round(((temp * 9/5) + 32), 1).toString();
    } else if (units === 'C'){
      temp = helpers.round(temp, 1).toString();
    } else {
	  var errorMessage = "Error: invalid argument for 'units' variable in HtmlFactory.getTemperatureHTML()";
      console.log(errorMessage);
	  return errorMessage;
    }
    return temp + "&deg";
  }
  
  getTemperatureUnitsHTML(units){
	/* HTML snippet for displaying what units user is viewing temperature in  */
    if (units === 'F'){
      return "F | <a onclick=\"switchUnits('C')\">C</a>";
    } else if (units === 'C'){
      return "C | <a onclick=\"switchUnits('F')\">F</a>";
    }
  }

  get backgroundURL(){
    switch(this.weatherID){
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
  
  get bodyHTML(){
    return (
	    "<div id='blackscreen'></div>"
      + "<div class='container'>"
      +    "<div id='main'>"
      +      "<div class='row'>"
      +        "<div class='col-lg-3'></div>"
      +        "<div class='col-lg-6'>"
      +          "<div class='card card-inverse' align='center'>"
      +            "<div class='row'>"
	  +              "<div class='col-12'>"
      +                "<h2 id='place-name' align='center'>"
	  +                  this.placeName + " Weather"
	  +                "</h2>"
	  +              "</div>"
      +            "</div>"
      +            "<div class='row'>"
	  +              "<div class='col-sm-6'>"
	  +                "<img id='w-icon' src='" + this.weatherIcon + "' alt='Weather Image' height='200' width='200'>"
	  +              "</div>"
	  +              "<div id='vertical-col-spacer'></div>"
	  +              "<div class='col-sm-5' id='card-col-r'>"
	  +                "<h1 id='card-col-r-text'>"
	  +                  this.weatherText 
	  +                  "<br />" 
	  +                  "<span id='temp-html'>" + this.getTemperatureHTML(this.temp, this.units) + "</span>"
	  +                  "<span id='units-html'>" + this.getTemperatureUnitsHTML(this.units) + "</span>" 
	  +                "</h1>"
	  +              "</div>"
      +            "</div>"
      +          "</div>"
      +        "</div>"
      +        "<div class='col-lg-3'></div>"
      +      "</div>"
      +    "</div>"
      + "</div>"
      + "<nav id='footer' class='navbar fixed-bottom navbar-inverse bg-inverse'>"
      +   "<p>Powered by <a href='https://v4-alpha.getbootstrap.com/' target='_blank'>Bootstrap</a>, <a href='https://jquery.com/' target='_blank'>jQuery</a>, and the <a href='https://fcc-weather-api.glitch.me/' target='_blank'>freeCodeCamp Weather API</a>. | This website was designed and built by <a href='https://jacob-hunt.github.io/' target='_blank'>Jacob Hunt</a>.</p>"
      + "</nav>"
	);  
  }
}