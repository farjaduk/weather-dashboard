var inputValueEl = document.querySelector("#textInput");
var cityNameEl = document.querySelector("#city-location");
var cityTempEl = document.querySelector("#city-temp");
var cityWindEl = document.querySelector("#city-wind");
var cityHumidityEl = document.querySelector("#city-humidity");
var cityUvEl = document.querySelector("#city-uv");
var buttonEl = document.querySelector("#search-btn");
var historyEl = document.querySelector("#search-bar");
var history = [];

//button to gather weather info of searched city
buttonEl.addEventListener("click", function(){
    var cityLocation = inputValueEl.value.trim();
    console.log("city name: " + cityLocation);
    if (cityLocation) {
        getWeatherData(cityLocation);
        displayHistory(cityLocation);
    } else {
        alert("please enter a city!");
    }

});


