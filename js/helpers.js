var helpers = {

  getUnits: function(countryID){
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
  },
  
  capitalize: function(string){
    /* Capitalize the first char of a string */
    if (typeof(string) !== "string" || string.length < 1) {
      return undefined;
    } else {
      return string[0].toUpperCase() + string.slice(1);
    }
  },
  
  round: function(value, decimals){
    /* Round to x decimal places, algorithm from
    http://www.jacklmoore.com/notes/rounding-in-javascript/ */

    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  },
  
}