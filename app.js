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

var displayMainStats = function(name,temp,wind,humidity,uvLat,uvLon,icon){
    var uviUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ uvLat + '&lon='+ uvLon + '&units=metric&dt=1586468027&appid=ad9c3547a99abdff7cc27c4cfd8394ae';
    fetch(uviUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                var currUvi = data.current.uvi;
                
                //uv index color indicator
                if(currUvi >= 7){
                    cityUvEl.classList = "badge bg-danger";
                    cityUvEl.textContent = currUvi;
                }

                else if(currUvi < 7 && currUvi > 2) {
                    cityUvEl.classList = "badge bg-warning";
                    cityUvEl.textContent = currUvi;

                } 
                else {
                    cityUvEl.classList = "badge bg-success";
                    cityUvEl.textContent = currUvi;
                } 

                displayFutureForecast(data);
                
            })
        }
    })
    console.log(icon);
    cityNameEl.textContent = name + " (" + moment().format("MM/DD/YYYY") + ")";
    cityTempEl.textContent = temp + " °C "
    cityWindEl.textContent = wind + " Km/h";
    cityHumidityEl.textContent = humidity + " %";
    inputValueEl.value = "";
    var displayIconEl = document.createElement("img")
    displayIconEl.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    cityNameEl.appendChild(displayIconEl);

}

//5 day forecast
var displayFutureForecast = function(data) {
    
    var currDayInfo = data.daily;
    //each day loop
    for (var i = 0; i < 5; i++ ) {
        var icon = currDayInfo[i].weather[0].icon;
        var temp = currDayInfo[i].temp.day;
        var wind = currDayInfo[i].wind_speed;
        var humidity = currDayInfo[i].humidity;
        var iconDisplay = document.querySelector("#day-" + [i]);
        iconDisplay.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        var tempDisplay = document.querySelector("#t-" + [i]);
        tempDisplay.textContent = temp + " °C";
        var windDisplay = document.querySelector("#w-" + [i]);
        windDisplay.textContent = wind + " Km/H";
        var HumDisplay = document.querySelector("#h-" + [i]);
        HumDisplay.textContent = humidity;

    }

}

//history
var displayHistory = function(lastSearched){
    var btn = document.createElement("button");
    btn.classList = "btn btn-dark mt-2 w-100 bg-gradient rounded-pill";
    btn.textContent = lastSearched;
    historyEl.appendChild(btn);
    
    btn.addEventListener("click", function(){
        getWeatherData(lastSearched);
    })

}