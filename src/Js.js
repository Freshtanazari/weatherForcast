const apikey = "fboa45182d680fb13e9a481dbtf60b57";
const Weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


function searchAPI(city) { 
  let currentURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}`;
  axios.get(currentURL).then(updateWeather).catch(handleError);

  let forecastURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}`;
  axios.get(forecastURL).then(updateForecast).catch(handleError);
}

function handleError(error){
  console.error("Weather API: ", error);
  alert("City not found or network issue. Please Try Again")
}

function updateDate(datetime) {
  let day = datetime.getDay();
  let hour = datetime.getHours();
  let minutes = datetime.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }

  day = Weekdays[day];
  return `${day} ${hour}:${minutes}`;
}

function updateWeather(response) {

  console.log(response.data);

  let weatherCondition = document.querySelector("#weatherCondition");
  weatherCondition.innerHTML = response.data.condition.description;

  let currTemp = document.querySelector("#currTemp");
  currTemp.innerHTML = Math.floor(response.data.temperature.current);

  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;

  let feelLike = document.querySelector("#feelLike");
  feelLike.innerHTML = Math.round(response.data.temperature.feels_like);

  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.wind.speed} km/h`;

  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = response.data.temperature.pressure;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;

  let currentDateTime = new Date(response.data.time * 1000);
  let currDate = document.querySelector("#currDate");
  currDate.innerHTML = updateDate(currentDateTime);

  let todayIcon = document.querySelector("#todayIcon");
  todayIcon.src = `${response.data.condition.icon_url}`;
}

function searchCity(event) {
  event.preventDefault();
  const searchInput = document.querySelector("#searchInput");
  searchAPI(searchInput.value);
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", searchCity);

function updateForecast(response) {
  let forecastdays = "";

  response.data.daily.forEach(function (day) {
    forecastdays =
      forecastdays +
      `
        <div class="forcastday">
            <p>${Weekdays[new Date(day.time * 1000).getDay()]}</p>
            <p><img width="30px" height="30px" src=${
              day.condition.icon_url
            }> </p> 
            <p>${Math.round(day.temperature.day)}&deg;C</p>
        </div>`;
  });

  let forecast = document.querySelector("#sevenDayWrapper");
  forecast.innerHTML = forecastdays;
}

searchAPI("Paris");
