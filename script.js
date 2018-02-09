$(document).ready(function() {

    function round(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }

    var lat;
    var lon;
    var weatherLink;
    var locationLink;
    var temp;
    var units;
    var sky;
    var description;
    var location;

    

    function getCoords() {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            weatherLink = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon;
            locationLink = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&key=AIzaSyAW1Vl4zqI3v60vWnyhHJgPf225yXYdkN4";
            getWeather();
        });
    }

    function getWeather() {
        $.getJSON(weatherLink, function(json) {
            $("#location").html("");
            temp = json.main.temp;
            units = "C";
            console.log("1"+units);
            sky = json.weather[0].main;
            description = json.weather[0].description;
            getLocation();
            changeHTML();
        });
    }

    function getLocation() {
        $.getJSON(locationLink, function(json) {
            location = json.results[0].address_components[2].long_name;
            $("#location").html('<p class="appear">' + location + '</p>');
        });
    }

    function toFahrenheit(units) {
        if (units === "C") {
            temp = temp*(9/5)+32;
            units = "F";
            $("#temp").html(round(temp, 1));
            $("#toggle").html("&degF");
            console.log("2"+units);
        } else {
            temp = (temp-32)*5/9;
            units = "C";
            $("#temp").html(round(temp, 1));
            $("#toggle").html("&degC");
            console.log("3"+units);
        }
    }

    function changeHTML() {
        $("#temp").html('<p class="appear">' + round(temp, 1) + '</p>');
        $("#degrees").html('<button id="toggle" class="btn appear">&degC</button>');
        $("#description").html('<p class="appear">' + description + '</p>');
        if (sky === "Clear") {
            $("#icon").html('<div class="icon sunny appear"><div class="sun"><div class="rays"></div></div></div>');
            $("#content").css("background","#87CEFA");
        } else if (sky === "Rain") {
            $("#icon").html('<div class="icon rainy appear"><div class="cloud"></div><div class="rain"></div></div>');
            $("#content").css("background","gray");
        } else if (sky === "Snow") {
            $("#icon").html('<div class="icon flurries appear"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div></div>');
            $("#content").css("background","gray");
        } else if (sky === "Thunderstorm") {
            $("#icon").html('<div class="icon thunder-storm appear"><div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div></div>');
            $("#content").css("background","gray");
        } else {
            $("#icon").html('<div class="icon cloudy appear"><div class="cloud"></div><div class="cloud"></div></div>');
            $("#content").css("background","gray");
        } 
            
        $("#toggle").on("click", function() {
            if (units === "C") {
                temp = temp*(9/5)+32;
                units = "F";
                $("#temp").html(round(temp, 1));
                $("#toggle").html("&degF");
                console.log("2"+units);
            } else {
                temp = (temp-32)*5/9;
                units = "C";
                $("#temp").html(round(temp, 1));
                $("#toggle").html("&degC");
                console.log("3"+units);
            }
        });
    }

    getCoords();

});