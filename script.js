const apiKey = ${API_KEY};
const getWeatherButton = document.getElementById('getWeather');
const cityInput = document.getElementById('cityInput');
const weatherData = document.getElementById('weatherData');
const mapContainer = document.getElementById('map');

getWeatherButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchWeatherData(city);
    } else {
        alert('Please enter a city name.');
    }
});

async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
        const data = await response.json();

        if (data.error) {
            weatherData.innerHTML = '<p>🌧️ City not found</p>'; // Added emoji for error
            return;
        }

        displayWeather(data);
        showMap(data.location.lat, data.location.lon);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    weatherData.innerHTML = `
        <h2>${data.location.name}, ${data.location.country} 🌍</h2> <!-- Added emoji -->
        <p>Temperature: ${data.current.temp_c} °C 🌡️</p> <!-- Added emoji -->
        <p>Condition: ${data.current.condition.text} ☁️</p> <!-- Added emoji -->
        <p>Wind Speed: ${data.current.wind_kph} kph 💨</p> <!-- Added emoji -->
        <p>Humidity: ${data.current.humidity} % 💧</p> <!-- Added emoji -->
    `;
}

let map; // Global variable to hold the map instance

function showMap(lat, lon) {
    const mapContainer = document.getElementById('map');

    // Check if the map is already initialized
    if (map) {
        // If the map is already initialized, just set its view to the new location
        map.setView([lat, lon], 13);
    } else {
        // Initialize the map
        map = L.map(mapContainer).setView([lat, lon], 13); // Set initial view to the coordinates

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);
    }
}
