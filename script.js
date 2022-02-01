// Current date
const dateNumber = document.getElementsByClassName("date-number")[0];
const dateDay = document.getElementsByClassName("date-day")[0];
const dateMonthYear = document.getElementsByClassName("date-month-year")[0];

const date = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

dateNumber.innerHTML = date.getDate();
dateDay.innerHTML = days[date.getDay()];

dateMonthYear.innerHTML = `${months[date.getMonth()]} ${date.getFullYear()}`;

// City list dropdown
const cities = document.getElementsByClassName("cities")[0];
const cityList = document.getElementsByClassName("city-list")[0];
const icon1 = document.getElementById("icon1");
cities.addEventListener("click", () => {
    if(cityList.style.display === "block") {
        cityList.style.display = "none";
    } else {
        cityList.style.display = "block";
    }
});

// Number of days dropdown
const daysDiv = document.getElementsByClassName("days")[0];
const daysList = document.getElementsByClassName("days-list")[0];
daysDiv.addEventListener("click", () => {
    if(daysList.style.display === "block") {
        daysList.style.display = "none";
        
    } else {
        daysList.style.display = "block";
    }
});

// Populate visiting places using api
const cardsSection = document.getElementsByClassName("cards")[0];
fetch("https://raw.githubusercontent.com/Dipen-Dedania/static-data/main/make-your-trip-package.json")
    .then(reponse => reponse.json())
    .then(data =>  {
        data.forEach(element => {
            const cardTemplate = `<div class="card">
            <div class="card-header">
              <div>
                <div class="bold-text large-font" title="${element.cityName}">${element.cityName}</div>
                <div>${element.tourDate}</div>
                <div class="light-text small-font">${element.category}</div>
              </div>
              <div><i class="${element.isBookmark === true ? "fas fa-bookmark" : "far fa-bookmark"}"></i></div>
            </div>
    
            <div class="card-temp">
              <div>Average Temperature</div>
              <hr class="small-border" />
              <div class="bold-text large-font">
                +${element.temp}<sup>o</sup>C <i class="fas fa-sun"></i>
              </div>
            </div>
    
            <div class="card-image" style="background-image:url(${element.cityImg});"></div>
    
            <div class="card-footer">
              <div>
                <div class="light-text">Total Price:</div>
                <div class="bold-text large-font">${element.price}</div>
              </div>
              <div>
                <a href="#">Explore</a>
              </div>
            </div>
          </div>`;

          cardsSection.innerHTML += cardTemplate;
        });
    });


// Populate cities using the api
fetch("https://raw.githubusercontent.com/Dipen-Dedania/static-data/main/india-popular-city.json")
    .then(response => response.json())
    .then(data => {
        data.city.forEach(element => {
            const cityTemplate = `<div onclick="updateCity(this)">${element.name}</div>`;
            cityList.innerHTML += cityTemplate;
        });
    });

// Fetch weather details
async function updateCity(e) {
    document.getElementById("currentCity").innerText = e.innerText;
    if(e.innerText !== "All places") {
        const cityData = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.innerText}.json?access_token=pk.eyJ1Ijoic2h1YmhhbWhpcmFuaTQ1IiwiYSI6ImNreTN3OHBiaTA2OXoyd3E5YjJ2b2xicWkifQ.hQfD_1Mmlpta37azNXVyvQ`).then(response => response.json());
        const longitude = cityData.features[0].center[0];
        const latitude = cityData.features[0].center[1];

        const cityWeatherData = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&units=metric&appid=d57f8c3baf6bb12c1c6f23e9e1315929`).then(response => response.json());
        const temperature = cityWeatherData.current.temp;
        if(temperature < 10) {
            document.getElementById("temp").innerHTML = `<i class="wi wi-cloudy-windy"></i>${temperature}<sup>o</sup> C`;
        } else if(temperature > 10 && temperature < 20) {
            document.getElementById("temp").innerHTML = `<i class="wi wi-cloudy"></i>${temperature}<sup>o</sup> C`;
        } else if(temperature > 20 & temperature < 25) {
            document.getElementById("temp").innerHTML = `<i class="wi wi-day-cloudy-gusts"></i>${temperature}<sup>o</sup> C`;
        } else {
            document.getElementById("temp").innerHTML = `<i class="wi wi-day-sunny"></i>${temperature}<sup>o</sup> C`;
        }
        document.getElementById("currentCityTemp").innerText = e.innerText;
    }
}

// Update days in select days header
function updateDays(e) {
    document.getElementById("currentDays").innerText = e.innerText;
}

