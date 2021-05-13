// Current Container Variable
const currentTime = document.querySelector('.current-time');
const locationName = document.querySelector('.current-location');
// Weather Variable
const weatherIcon = document.querySelector('.weather__icon');
const temperture = document.querySelector('.weather__temperture');
const weatherTitle = document.querySelector('.weather__title');
// Air Pollution Variable
const fineDustIcon = document.querySelector('.fine-dust__icon');
const fineDustTitle = document.querySelector('.fine-dust__title');
const fineDustValue = document.querySelector('.fine-dust__value');
const ultraFineDustIcon = document.querySelector('.ultra-fine-dust__icon');
const ultraFineDustTitle = document.querySelector('.ultra-fine-dust__title');
const ultraFineDustValue = document.querySelector('.ultra-fine-dust__value');
// API KEY
const API_KEY = '039716d966943254bee4c969a2930cc0';

let isAirLoading = true;
let isWeatherLoading = true;

const iconObj = {
  high: '<i class="far fa-smile"></i>',
  low: '<i class="fas fa-temperature-low"></i>',
  half: '<i class="fas fa-thermometer-half"></i>',
  great: '<i class="far fa-grin-hearts"></i>',
  soso: '<i class="far fa-grin"></i>',
  bad: '<i class="fas fa-tired"></i>',
};

const getAirpollution = (lat, lon) => {
  const URL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  fetch(URL)
    .then((res) => res.json())
    .then((res) => {
      const { pm2_5, pm10 } = res.list[0].components;

      fineDustValue.textContent = `${pm2_5}`;
      fineDustTitle.textContent = 'PM2.5';
      ultraFineDustValue.textContent = `${pm10}`;
      ultraFineDustTitle.textContent = 'PM10';
      validateIcon('pollution', pm2_5, pm10);
      isAirLoading = false;
    });
};

const getWeatherCondition = (lat, lon) => {
  const URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  fetch(URL)
    .then((res) => res.json())
    .then((res) => {
      const {
        name,
        main: { temp },
      } = res;

      locationName.textContent = `${name}`;
      temperture.textContent = `${Math.ceil(temp - 273.99)}℃`;
      weatherTitle.textContent = 'Temp';
      validateIcon('weather', Math.ceil(temp - 273.99));
      isWeatherLoading = false;
    });
};

const displayTime = () => {
  const today = new Date();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();

  currentTime.textContent = `
  ${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}
  `;
};

const validateIcon = (kind, info1, info2) => {
  const { high, low, half, great, soso, bad } = iconObj;

  if (kind === 'weather') {
    if (info1 > 26) {
      weatherIcon.innerHTML = high;
    } else if (info1 > 13) {
      weatherIcon.innerHTML = half;
    } else {
      weatherIcon.innerHTML = low;
    }
    weatherIcon.style.color = 'red';
  } else {
    if (info1 > 80) {
      fineDustIcon.innerHTML = bad;
      fineDustIcon.style.color = 'red';
    } else if (info1 > 30) {
      fineDustIcon.innerHTML = soso;
      fineDustIcon.style.color = 'green';
    } else {
      fineDustIcon.innerHTML = great;
      fineDustIcon.style.color = 'blue';
    }
    if (info2 > 35) {
      ultraFineDustIcon.innerHTML = bad;
      ultraFineDustIcon.style.color = 'red';
    } else if (info2 > 15) {
      ultraFineDustIcon.innerHTML = soso;
      ultraFineDustIcon.style.color = 'green';
    } else {
      ultraFineDustIcon.innerHTML = great;
      ultraFineDustIcon.style.color = 'blue';
    }
  }
};

const getLocation = (pos) => {
  const {
    coords: { latitude, longitude },
  } = pos;
  getAirpollution(latitude, longitude);
  getWeatherCondition(latitude, longitude);
};

const responseError = () => {
  alert('현재 위치를 가져올수 없습니다.');
};

const init = () => {
  navigator.geolocation.getCurrentPosition(getLocation, responseError);
  setInterval(() => {
    if (!isAirLoading && !isWeatherLoading) {
      displayTime();
    }
  }, 1000);
};

init();
