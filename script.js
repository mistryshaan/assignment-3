const dateNumber = document.getElementsByClassName("date-number")[0];
const dateDay = document.getElementsByClassName("date-day")[0];
const dateMonthYear = document.getElementsByClassName("date-month-year")[0];

const date = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

dateNumber.innerHTML = date.getDate();
dateDay.innerHTML = days[date.getDay()];

dateMonthYear.innerHTML = `${months[date.getMonth()]} ${date.getFullYear()}`;

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

const daysDiv = document.getElementsByClassName("days")[0];
const daysList = document.getElementsByClassName("days-list")[0];
daysDiv.addEventListener("click", () => {
    if(daysList.style.display === "block") {
        daysList.style.display = "none";
        
    } else {
        daysList.style.display = "block";
    }
});

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
                <div class="light-text">Total Price</div>
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


fetch("https://raw.githubusercontent.com/Dipen-Dedania/static-data/main/india-popular-city.json")
    .then(response => response.json())
    .then(data => {
        data.city.forEach(element => {
            const cityTemplate = `<div onclick="updateCity(this)">${element.name}</div>`;
            cityList.innerHTML += cityTemplate;
        });
    });

function updateCity(e) {
    document.getElementById("currentCity").innerText = e.innerText;
    if(e.innerText !== "All places") {
        document.getElementById("currentCityTemp").innerText = e.innerText;
    }
}

function updateDays(e) {
    document.getElementById("currentDays").innerText = e.innerText;
}

// fetch("https://www.metaweather.com/api/location/search/?query=ahmedabad", {credentials: "include"})
// .then(response => response.json())
// .then(data => console.log(data));