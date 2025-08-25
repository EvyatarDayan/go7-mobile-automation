const fs = require('fs');
const fetch = require('node-fetch');

async function saveWeatherData() {
    try {
        // API endpoint and API key
        const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
        const apiKey = '42ac2f0e80638c3c5c5231678d2b5768';
        const city = 'berlin';

        // Construct the full URL with the API key and city
        const url = `${apiUrl}?q=${city}&appid=${apiKey}`;

        // Fetch the weather data
        const response = await fetch(url);
        const data = await response.json();

        // Save the response text to a file
        fs.writeFileSync('weather_data.json', JSON.stringify(data, null, 2));

        console.log('Weather data saved to weather_data.json');
    } catch (error) {
        console.error('Error fetching or saving weather data:', error);
    }
}

// saveWeatherData();