const apiKey = "3d2cfb68be76e4164eb25df618cbf065";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

document.addEventListener("DOMContentLoaded", () => {
    gsap.to(".container", { opacity: 1, y: 0, duration: 1, ease: "power2.out" });
});

async function checkWeather(city) {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/cloudy.jpeg";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.jpeg";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.jpeg";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.jpeg";
        }

        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";

        gsap.fromTo(".weather", { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" });
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
