document.addEventListener('DOMContentLoaded', function () {
  const checkWeatherButton = document.getElementById('checkWeather');
  checkWeatherButton.addEventListener('click', getWeather);
});

function getWeather() {
  const cityInput = document.getElementById('cityInput');
  const cityName = cityInput.value.trim();

  if (cityName === "") {
      alert("Please enter a city name.");
      return;
  }

  const apiKey = "71dde681e090d4c7b8546ab91f810f59"; 
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              const response = JSON.parse(xhr.responseText);
              const table = document.getElementById('weatherTable');
              const temperature = Math.round(response.main.temp - 273.15);
              const description = response.weather[0].description;

              // Buat tabel HTML
              const html = `
                  <tr>
                      <th>City</th>
                      <th>Temperature (°C)</th>
                      <th>Description</th>
                  </tr>
                  <tr>
                      <td>${cityName}</td>
                      <td>${temperature}</td>
                      <td>${description}</td>
                  </tr>
              `;

              table.innerHTML = html;
          } else {
              console.error(`Failed to get weather data for ${cityName}. Status: ${xhr.status}`);
              alert(`Failed to get weather data for ${cityName}. Please check the city name.`);
          }
      }
  };

  xhr.onerror = function () {
      console.error("Connection error.");
      alert("Connection error. Please try again later.");
  };

  xhr.open("GET", apiUrl, true);
  xhr.send();
}
