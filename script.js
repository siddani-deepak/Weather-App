const apiKey = "YOUR API KEY";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const weatherContainer = document.getElementById("weatherContainer");
const errorMessage = document.getElementById("errorMessage");
const weatherIcon = document.getElementById("weatherIcon");

async function checkWeather(city) {
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    document.getElementById("city").textContent = data.name;
    document.getElementById("temp").textContent = `${Math.round(
      data.main.temp
    )}°C`;
    document.getElementById("humidity").textContent = `${data.main.humidity}%`;
    document.getElementById("wind").textContent = `${data.wind.speed} km/h`;

    switch (data.weather[0].main) {
      case "Clouds":
        weatherIcon.src = "clouds.png";
        break;
      case "Clear":
        weatherIcon.src = "clear.png";
        break;
      case "Rain":
        weatherIcon.src = "rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "mist.png";
        break;
      default:
        weatherIcon.src = "default.png";
    }

    weatherContainer.style.display = "block";
    errorMessage.style.display = "none";
  } catch (error) {
    errorMessage.style.display = "block";
    weatherContainer.style.display = "none";
  }
}

searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    checkWeather(city);
  }
});
