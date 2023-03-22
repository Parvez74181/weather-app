let city_name_input = document.querySelector(".city-name-input");
let submit_form_btn = document.querySelector(".submit-form-btn");
let city_submit_form = document.querySelector(".city-submit-form");
let weather_container = document.querySelector(".weather-container");
let city_name_heading = weather_container.querySelector(".city-name");
let back_btn = document.querySelector(".back-btn");
let current_weather_temp = weather_container.querySelector(
  ".current-weather .temp"
);
let current_weather_wind = weather_container.querySelector(
  ".current-weather .wind"
);
let current_weather_precip = weather_container.querySelector(
  ".current-weather .precip"
);
let current_weather_pressure = weather_container.querySelector(
  ".current-weather .pressure"
);

let predicted_weather = document.querySelector(".predicted-weather");

function showWeater(city_name) {
  axios
    .get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city_name}?unitGroup=metric&key=4YVHGVRHJRE3LD7CPEB4STRA7&contentType=json`
    )
    .then(function (response) {
      // handle success
      let current = response.data.currentConditions;
      let current_temp = current.temp;
      let current_precip = current.precip;
      let current_pressure = current.pressure;
      let current_wind = current.windspeed;
      city_name_heading.innerText = city_name;
      current_weather_temp.innerHTML = `${current_temp} <sup>0</sup>C`;
      current_weather_wind.innerText = `Wind : ${current_wind}kmph`;
      current_weather_precip.innerText = `Precip : ${current_precip}mm`;
      current_weather_pressure.innerText = `Pressure : ${current_pressure}mb`;

      localStorage.setItem("city name", city_name);

      city_submit_form.classList.remove("active");
      weather_container.classList.add("active");

      let predicted_data = response.data.days;

      for (let i = 1; i < 6; i++) {
        let datetime = predicted_data[i].datetime;
        let predicted_temp = predicted_data[i].temp;
        let daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        let date = new Date(datetime);
        let day = daysInWeek[date.getDay()];
        let html = `<div class="day">
                        <span>${day}</span>
                        <span class="temp">${predicted_temp} <sup>0</sup>C</span>
                    </div>`;

        predicted_weather.innerHTML += html;
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

window.addEventListener("load", function (e) {
  let city_name = localStorage.getItem("city name");
  predicted_weather.innerHTML = "";
  if (city_name != "null") {
    showWeater(city_name);
  }
});

submit_form_btn.addEventListener("click", function (e) {
  e.preventDefault();
  let city_name = city_name_input.value;
  predicted_weather.innerHTML = "";
  showWeater(city_name);
  city_name_input.value = "";
});

back_btn.addEventListener("click", function () {
  city_submit_form.classList.add("active");
  weather_container.classList.remove("active");
});
