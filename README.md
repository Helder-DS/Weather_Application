## Highlighted Features

### JavaScript Functions

1. **fetchWeather(location)**:
   - This function retrieves weather data from the OpenWeather API based on the given location.
   - It constructs the API URL using the specified location and API key, then fetches the data.
   - On a successful response, it updates the relevant HTML elements with the weather information, including temperature, humidity, wind speed, and more.
   - If the fetch fails, it logs an error message to the console.

   ```javascript
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
   }
