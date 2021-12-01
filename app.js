var button = document.querySelector('.button')
var inputValue = document.querySelector('.inputValue')
var name = document.querySelector('.name')
var desc = document.querySelector('.desc')
var temp = document.querySelector('.temp')

button.addEventListener('click', function(){
    fetch('https://api.openweathermap.org./data/2.5/weather?q= '+inputValue.value+ '&appid=ad9c3547a99abdff7cc27c4cfd8394ae')
    .then(response => response.json())
    .then(data => console.log(data))

    .catch(err => alert("Wrong city name!"))
})