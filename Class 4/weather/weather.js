const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const button = document.getElementById('fetch-weather');
const forecastDiv = document.getElementById('forecast');
const errorDiv = document.getElementById('error');

button.addEventListener('click', () => {
    fetchWeather();
});

async function fetchWeather() {
    errorDiv.textContent = ''; // Clear previous error messages
    forecastDiv.innerHTML = 'Loading...'; // Show loading message

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&cnt=3&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        errorDiv.textContent = error.message; // Display error message
        forecastDiv.innerHTML = ''; // Clear loading message
    }
}

function displayForecast(data) {
    forecastDiv.innerHTML = ''; // Clear previous forecasts
    data.list.forEach((item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        const temp = item.main.temp;
        const weather = item.weather[0].description;

        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.innerHTML = `<strong>${date}</strong>: ${temp}°C, ${weather}`;
        forecastDiv.appendChild(forecastItem);
    });
}
