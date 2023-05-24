// async function fetching the api data
const weatherData = async (city) => {
  try {
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const key = "409c11962860ac3578da076bd21f81e1";
    const mainUrl = `${url}?q=${city},uk&APPID=${key}`;
    const response = await fetch(mainUrl);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("not able to fetch the data");
  }
};

// HTML elements
const weatherInfo = document.getElementById("weatherInfo");
const weatherTypeInfo = document.getElementById("weatherTypeInfo");
const weatherTypeImage = document.getElementById("weatherTypeImage");
const temp = document.getElementById("temp");
const minTemp = document.getElementById("minTemp");
const maxTemp = document.getElementById("maxTemp");
const cityName = document.getElementById("cityName");
const weatherTempInfo = document.querySelector(".weatherTempInfo");
const infoError = document.getElementById("infoError");

// calling the async function for working on the data took from the API
const getWeatherData = () => {
  const city = document.getElementById("inputCity").value;

  weatherData(city)
    .then((data) => {
      const weatherType = data.weather[0].main;
      const weatherTemp = (data.main.temp - 273.15).toFixed(2);
      const weatherMinTemp = (data.main.temp_min - 273.15).toFixed(2);
      const weatherMaxTemp = (data.main.temp_max - 273.15).toFixed(2);
      infoError.style.display = "none";
      weatherTempInfo.style.display = "block";
      weatherInfo.style.display = "block";

      cityName.innerText = city;
      weatherTypeInfo.innerText = weatherType;
      temp.innerText = weatherTemp;
      minTemp.innerText = weatherMinTemp;
      maxTemp.innerText = weatherMaxTemp;
      weatherTypeImage.innerHTML = `<img src="../image/${weatherType}.png" height=100 weight=100/>`;
    })
    .catch((error) => {
      weatherInfo.style.display = "none";
      infoError.style.display = "inline-block";
      infoError.innerHTML = `<u><h3>Please input the city name as instructed below</h3></u><ul><li>Enter valid city name</li><li>If it not works enter the city's name, comma, 2-letter country code (ISO3166)</li><li>The order is important - the first is city name then comma then country. Example - London, GB or New York, US.</li></ul>`;
    });
};
