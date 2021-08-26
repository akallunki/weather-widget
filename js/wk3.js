function search(city) {
  let apiKey = "01ee656db728e671d53e4bbc2ed1c53d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherandCity);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function showWeatherandCity(response) {
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  celsiusTemp = response.data.main.temp;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  let apiKey = "01ee656db728e671d53e4bbc2ed1c53d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-7 forecast text">
      <div class="weekday">
          ${formatDay(forecastDay.dt)}
          </div>
          <div class="forecast-temp">
          <span class="max">
          ${Math.round(
            forecastDay.temp.max
          )}°</span> | <span class="min">${Math.round(
          forecastDay.temp.min
        )}° </span>
        </div>
        </div>
        <div class="col-5 forecast">
          <img src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt="${
          forecastDay.weather[0].description
        }" class="forecast-icon">
        </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  let apiKey = "01ee656db728e671d53e4bbc2ed1c53d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherandCity);
  axios.get(apiUrl).then(showCurrentLocation);
}

function showCurrentLocation(location) {
  document.querySelector(".change-city").innerHTML = `${location.data.name}`;
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayBlueTheme() {
  let widgetElement = document.querySelector("#widget");
  widgetElement.classList.remove(
    "default-theme",
    "magic-theme",
    "rainbow-theme",
    "dark-theme"
  );
  widgetElement.classList.add("blue-theme");
}

function displayMagicTheme() {
  let widgetElement = document.querySelector("#widget");
  widgetElement.classList.remove(
    "default-theme",
    "blue-theme",
    "rainbow-theme",
    "dark-theme"
  );
  widgetElement.classList.add("magic-theme");
}

function displayRainbowTheme() {
  let widgetElement = document.querySelector("#widget");
  widgetElement.classList.remove(
    "default-theme",
    "blue-theme",
    "magic-theme",
    "dark-theme"
  );
  widgetElement.classList.add("rainbow-theme");
}

let blueThemeButton = document.querySelector("#blue-theme");
blueThemeButton.addEventListener("click", displayBlueTheme);

let rainbowThemeButton = document.querySelector("#rainbow-theme");
rainbowThemeButton.addEventListener("click", displayRainbowTheme);

let magicThemeButton = document.querySelector("#magic-theme");
magicThemeButton.addEventListener("click", displayMagicTheme);

let searchCityForm = document.querySelector(".search");
searchCityForm.addEventListener("submit", handleSubmit);

let currentCityButton = document.querySelector(".current-location-button");
currentCityButton.addEventListener("click", currentLocation);

search("Haifa");
displayForecast();
