
function searchAPI(city){
    let apikey = "fboa45182d680fb13e9a481dbtf60b57";
    let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}`;
    console.log(url);
    axios.get(url).then(updateWeather);
}
function updateDate(datetime){
    let day = datetime.getDay();
    let hour = datetime.getHours();
    let minutes = datetime.getMinutes();

    if (minutes < 10 ){
        minutes = `0${minutes}`;
    }

    Weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Satruday"]
    day = Weekdays[day];
   return `${day} ${hour}:${minutes}`;

}

function updateWeather(response){
    console.log(response.data);
    
    let weatherCondition = document.querySelector("#weatherCondition");
    weatherCondition.innerHTML = response.data.condition.description;

    let currTemp = document.querySelector("#currTemp");
    currTemp.innerHTML = Math.floor(response.data.temperature.current);

    let city = document.querySelector("#city");
    city.innerHTML = response.data.city;

    let feelLike = document.querySelector("#feelLike");
    feelLike.innerHTML = response.data.temperature.feels_like;

    let wind = document.querySelector("#wind");
    wind.innerHTML = `${response.data.wind.speed} km/h`;

    let pressure = document.querySelector("#pressure");
    pressure.innerHTML = response.data.temperature.pressure;

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${response.data.temperature.humidity}%`;

    currentDateTime = new Date(response.data.time * 1000);
    let currDate = document.querySelector("#currDate");
    currDate.innerHTML = updateDate(currentDateTime);
    
    let todayIcon = document.querySelector("#todayIcon");
    todayIcon.src = `${response.data.condition.icon_url}`;
}

function searchCity(event){
    event.preventDefault();
    searchAPI(searchInput.value)
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", searchCity);

searchAPI("Paris");