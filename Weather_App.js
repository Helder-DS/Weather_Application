
// API key for accessing the OpenWeatherMap API
const apiKey = '40d4277e29ac4e7f9cc6236dce0eaf2f';
// Base URL for the OpenWeatherMap API
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const location_input = document.getElementById('location_box');
const search_btn = document.getElementById('search_button');
const temperature_element = document.getElementById('p_temperature'); 
const location_element = document.getElementById('p_location');
const extra_info_element = document.getElementById('p_extra_info');
const country_element = document.getElementById('p_country');
const humidity_element = document.getElementById('p_humidity'); 
const wind_element = document.getElementById('p_wind'); 
const precipitation_element = document.getElementById('p_precipitation'); 
const day_element = document.getElementById('p_day'); 
const time_element = document.getElementById('p_time'); 

const lonDiv = document.getElementById('lon');
const newDiv = document.getElementById('new');
const belDiv = document.getElementById('bel');
const parDiv = document.getElementById('par');
const madDiv = document.getElementById('mad');
const barDiv = document.getElementById('bar');

search_btn.addEventListener('click', () => {
    const location = location_input.value; 
    if (location) {
        fetchWeather(location);
    }
});

lonDiv.addEventListener('click', () => {
    fetchWeather('London');
});

newDiv.addEventListener('click', () => {
    fetchWeather('New york');
});

belDiv.addEventListener('click', () => {
    fetchWeather('Belfast');
});

parDiv.addEventListener('click', () => {
    fetchWeather('Paris');
});

madDiv.addEventListener('click', () => {
    fetchWeather('Madrid');
});

barDiv.addEventListener('click', () => {
    fetchWeather('Barcelona');
});

// Fetch the weather data from the OpenWeatherMap API
function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            location_element.textContent = data.name; 
            temperature_element.textContent = `${Math.round(data.main.temp)}°C`; 
            extra_info_element.textContent = data.weather[0].description; 
            country_element.textContent = getCountryName(data.sys.country);
            humidity_element.textContent = `Humidity: ${data.main.humidity}%`;
            wind_element.textContent = `Wind: ${Math.round(data.wind.speed)} m/s`;
            const precipitation = data.weather[0].rain ? data.weather[0].rain['1h'] : 0; 
            precipitation_element.textContent = `Precipitation: ${precipitation} mm`;
            const main_weather_element = document.getElementById('p_main_weather');
            const weather_icon_element = document.getElementById('weather_icon');

         
            const timestamp = data.dt * 1000; 
            const date = new Date(timestamp);
            const formattedDate = date.toLocaleDateString(); 
            const formattedTime = date.toLocaleTimeString(); 

            time_element.textContent = `${formattedTime}`;
            day_element.textContent = `${formattedDate}`;
            main_weather_element.textContent = data.weather[0].main;
            const iconCode = data.weather[0].icon;
            weather_icon_element.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`; 

        })

        
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });



// Function to map a given country code to the full country name
function getCountryName(countryCode) {
    const countryMap = {
        'US': 'United States',
        'GB': 'United Kingdom',
        'IE': 'Ireland',
        'FR': 'France',
        'DE': 'Germany',
        'IT': 'Italy',
        'ES': 'Spain',
        'AU': 'Australia',
        'JP': 'Japan',
        'CN': 'China',
        'RU': 'Russia',
        'BR': 'Brazil',
        'CA': 'Canada',
        'MX': 'Mexico',
        'IN': 'India',
        'ZA': 'South Africa',
        
    };

    
    return countryMap[countryCode] || 'Unknown Country'; // Default to 'Unknown Country' if code not found 
        }



}
