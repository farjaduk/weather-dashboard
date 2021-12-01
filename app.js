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


//when button is clicked, run API fetch to gather data passing through the city from the event listener
var getWeatherData = function(city){
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' +inputValueEl.value.trim()+ '&units=metric&appid=ad9c3547a99abdff7cc27c4cfd8394ae';
    
    //fetch request
    fetch(apiUrl).then(function(response){
        //if the response is good, parse it to JSON, and send the data through to 2 separate functions. 1 for main card, the other for the 5 day forecast
        if(response.ok) {
            response.json().then(function(data){
                //variables for future display
                var currLocation = data['name'];
                var currTemp = data['main']['temp'];
                var currWind = data['wind']['speed'];
                var currHum = data['main']['humidity'];
                var currIcon = data['weather'][0]['icon'];
                var uvLat = data['coord']['lat'];
                var uvLon = data['coord']['lon'];
                var currUv = data['main']['uvi'];
                console.log(currLocation, currTemp, currWind, currHum, uvLat, uvLon, currIcon);
                displayMainStats(currLocation,currTemp,currWind,currHum,uvLat,uvLon, currIcon);
            
            })
        } else {
            alert("city not found!");
        }
    });
}
