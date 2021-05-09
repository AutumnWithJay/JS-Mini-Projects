const locationName = document.querySelector('.location');
const weather = document.querySelector('.weather');
const pollution = document.querySelector('.pollution');

const API_KEY = '039716d966943254bee4c969a2930cc0';

const getAirpollution = (lat, lon) => {
  const URL = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&lang=kr&appid=${API_KEY}`;
  fetch(URL)
    .then((res) => res.json())
    .then((res) => {
      const { pm2_5, pm10 } = res.list[0].components;
    });
};

const getWeatherCondition = (lat, lon) => {
  const URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${API_KEY}`;
  fetch(URL)
    .then((res) => res.json())
    .then((res) => {
      const {
        main: { temp, feels_like, humidity },
        wind: { speed },
        weather: { description },
      } = res;
    });
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
};

init();
