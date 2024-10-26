document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("fetchWeatherButton").addEventListener("click", function() {

        
        const apiKey = "API_KEY"; 
        const apiURL = `https://api.openweathermap.org/data/3.0/onecall?lat=51.5074&lon=-0.1278&exclude=minutely,hourly,current&appid=${apiKey}&units=metric`;

        fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            // Get the forecast for tomorrow (index 1 in daily array is tomorrow)
            const tomorrowForecast = data.daily[1]; 
            const temperature = tomorrowForecast.temp.day; 
            const description = tomorrowForecast.weather[0].description; 
            const humidity = tomorrowForecast.humidity;
            const windSpeed = tomorrowForecast.wind_speed;

            // Display the weather details
            document.getElementById("weatherDetails").style.display = "block";
            document.getElementById("temperature").innerText = `Temperature: ${temperature}°C`;
            document.getElementById("condition").innerText = `Condition: ${description}`;
            document.getElementById("humidity").innerText = `Humidity: ${humidity}%`;
            document.getElementById("windSpeed").innerText = `Wind Speed: ${windSpeed} m/s`;
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            document.getElementById("weatherDetails").innerHTML = "<p>Failed to fetch weather data. Please try again later.</p>";
        });
    });
});





