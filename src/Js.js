
function searchAPI(city){
    let apikey = "fboa45182d680fb13e9a481dbtf60b57";
    let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}`;
    axios.get(url).then(updateWeather);
}

function updateWeather(response){
    console.log(response.data);
    
    let currTemp = document.querySelector("#currTemp");
    currTemp.innerHTML = Math.floor(response.data.temperature.current);

    let city = document.querySelector("#city");
    city.innerHTML = response.data.city;
}

function searchCity(event){
    event.preventDefault();
    searchAPI(searchInput.value)
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", searchCity);

searchAPI("Paris");