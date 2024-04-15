let city = "Vancouver";
let latitude = 49.2827291;
let longitude = -123.1207375;

function init() {
    getLocation();
    const favCitiesSelect = document.getElementById("fav-cities");
    favCitiesSelect.addEventListener("change", favSelectChange);
    const inputCity = document.getElementById("input-city");
    const autocomplete = new google.maps.places.Autocomplete(inputCity, {
        types: ["(cities)"],
    });
    autocomplete.addListener("place_changed", async function () {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            console.log("Place not found:", place.name);
            return;
        }
        city = place.name;
        latitude = place.geometry.location.lat();
        longitude = place.geometry.location.lng();
        try {
            await updateWeather();
            checkFavorite();
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    });
}

async function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
    }
    try {
        await updateWeather();
        checkFavorite();
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function setPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
}

const setCurrentWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=0bb7eecf7fcd6b18b5aafe5fa0281d24`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        fetchPhotoByCity(data.name);
        document.getElementById("city-name").textContent = data.name;
        document.getElementById("main-temp").textContent =
            Math.round(data.main.temp) + "°C";

        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
        document.getElementById("current-weather-icon").src = iconUrl;

        document.getElementById("main-weather").textContent =
            data.weather[0].main;
        document.getElementById("max-temp").textContent =
            "Max " + Math.round(data.main.temp_max) + "°C";
        document.getElementById("min-temp").textContent =
            "Min " + Math.round(data.main.temp_min) + "°C";
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};

function fiveDayForecast() {
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=ee91f48f66a841405d687e689915dd56&units=metric`;
    let requestOptions = {
        method: "GET",
        redirect: "follow",
    };
    fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            const dailyForecasts = data.list.filter(
                (item, index) => index % 8 === 0
            );
            const dailyForecastContainer =
                document.getElementById("daily-forecast");

            dailyForecastContainer.innerHTML = "";
            dailyForecasts.forEach((forecast) => {
                const date = new Date(forecast.dt * 1000);
                const day = date.toLocaleDateString("en-US", {
                    weekday: "short",
                });
                const minTemp = Math.round(forecast.main.temp_min);
                const maxTemp = Math.round(forecast.main.temp_max);
                const weatherIcon = forecast.weather[0].icon;
                const weatherDescription = forecast.weather[0].description;
                const card = document.createElement("div");
                card.classList.add("forecast-card");
                card.innerHTML = ` 
            <h3>${day}</h3>
            <img src=" https://openweathermap.org/img/wn/${weatherIcon}.png "alt="Weather Icon" class="weather-icon">
            <p> ${weatherDescription}</p>
            <p>Min: ${minTemp}°C </p>
            <p>Max: ${maxTemp}°C </p> `;
                card.addEventListener("click", () => {
                    threeHoursForecast(date);
                });
                document.getElementById("daily-forecast").appendChild(card);
            });
        });
}

async function threeHoursForecast(date) {
    let currentDate;
    if (date === undefined) {
        currentDate = new Date();
        currentDate.setHours(currentDate.getHours() - 7);
    } else {
        currentDate = new Date(date);
        currentDate.setHours(currentDate.getHours() - 7);
    }
    document.getElementById("display-day").textContent =
        formatDate(currentDate);

    let dateToBeReceived = currentDate.toISOString().split("T")[0];

    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=4360f4d8c1574b9e0875a29806fbca4b&units=metric`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const apiData = await response.json();
            const allDaysInfo = apiData.list;
            allDaysInfo.forEach((item) => {
                item.dt_txt = moment(item.dt_txt)
                    .subtract(7, "hours")
                    .format("YYYY-MM-DD HH:mm:ss");
            });

            let allTemps = [];

            let container = document.getElementById("hour-range");
            container.innerHTML = "";

            allDaysInfo.forEach((everyObject) => {
                if (dateToBeReceived === everyObject.dt_txt.split(" ")[0]) {
                    allTemps.push(everyObject);
                }
            });
            for (let i = 0; i < allTemps.length; i++) {
                const card = document.createElement("div");
                card.className = "weather-card";

                const hoursTag = document.createElement("p");
                hoursTag.textContent = allTemps[i].dt_txt
                    .split(" ")[1]
                    .slice(0, -3);

                const imageTag = document.createElement("img");
                imageTag.src = `https://openweathermap.org/img/wn/${allTemps[i].weather[0].icon}@2x.png`;

                const mainWeather = document.createElement("p");
                mainWeather.textContent = allTemps[i].weather[0].main;

                const temperatureTag = document.createElement("p");
                temperatureTag.textContent =
                    Math.round(allTemps[i].main.temp) + "°C";
                card.appendChild(hoursTag);
                card.appendChild(imageTag);
                card.appendChild(mainWeather);
                card.appendChild(temperatureTag);

                container.appendChild(card);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

function formatDate(dateString) {
    let date = new Date(dateString);
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    let monthName = months[date.getMonth()];
    let day = date.getDate();

    let newString = monthName + ", " + day;

    return newString;
}

function fetchFavoriteCities() {
    const favCitiesSelect = document.getElementById("fav-cities");
    const cities = JSON.parse(localStorage.getItem("cities")) || [];

    // Limpa o select para evitar duplicatas
    favCitiesSelect.innerHTML = "";

    // Adiciona a opção padrão
    let defaultOption = document.createElement("option");
    defaultOption.value = ""; // O valor vazio pode ser útil se você quiser validar a seleção posteriormente
    defaultOption.textContent = "Favorite Cities"; // Texto que será exibido como placeholder
    favCitiesSelect.appendChild(defaultOption);

    // Adiciona as cidades favoritas como opções
    cities.forEach((city) => {
        let option = document.createElement("option");
        option.value = city.name;
        option.textContent = city.name;
        favCitiesSelect.appendChild(option);
    });
}

function checkFavorite(change) {
    const cityName = document.getElementById("city-name").textContent;
    const cities = JSON.parse(localStorage.getItem("cities")) || [];
    let index = cities.findIndex((city) => city.name === cityName);
    if (change) {
        if (index !== -1) {
            cities.splice(index, 1);
            document.getElementById("weather-image").src =
                "assets/empty_star.svg";
        } else {
            cities.push({
                name: cityName,
                latitude: latitude,
                longitude: longitude,
            });
            document.getElementById("weather-image").src = "assets/star.svg";
        }

        localStorage.setItem("cities", JSON.stringify(cities));
    } else {
        if (index === -1) {
            document.getElementById("weather-image").src =
                "assets/empty_star.svg";
        } else {
            document.getElementById("weather-image").src = "assets/star.svg";
        }
    }
    fetchFavoriteCities();
}

const favSelectChange = async () => {
    const selectedCityName = document.getElementById("fav-cities").value;
    const cities = JSON.parse(localStorage.getItem("cities")) || [];
    const selectedCity = cities.find((city) => city.name === selectedCityName);

    if (selectedCity) {
        latitude = selectedCity.latitude;
        longitude = selectedCity.longitude;
        await updateWeather();
        checkFavorite();
    }
};

async function fetchPhotoByCity(cityName) {
    console.log(cityName);
    const apiKey = "VEiYsyT3etXubqbCllwU6xoX7s9JE3gwA1vpiGpVOXW7Q7R622ezGsfS";
    const url = `https://api.pexels.com/v1/search?query=${cityName}`;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: apiKey,
            },
        });

        if (!response.ok) {
            throw new Error("Photo fetch failed");
        }

        const data = await response.json();
        if (data.photos.length > 0) {
            const index = Math.floor(Math.random() * data.photos.length);
            const url = data.photos[index].src.original;
            const weatherContainer = document.querySelector("#img-background");
            weatherContainer.style.backgroundImage = `url(${url})`;
            weatherContainer.style.backgroundSize = "cover";
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching photo:", error);
        return null;
    }
}

const updateWeather = async () => {
    await setCurrentWeather();
    await fiveDayForecast();
    await threeHoursForecast();
};

window.addEventListener("load", init);
