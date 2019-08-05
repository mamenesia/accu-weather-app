const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
  //  destructuring properties
  const {
    cityData,
    weather
  } = data;

  // update details template
  details.innerHTML = `
        <h5 class="my-3">${cityData.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
          <span>${weather.Temperature.Metric.Value}</span>
          <span>&deg;C</span>
        </div>
  `;

  // update day/night img & icon weather
  let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
  time.setAttribute('src', timeSrc);

  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);


  // remove the d-none class if present
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
}

const updateCity = async (city) => {
  const cityData = await getCity(city);
  const weather = await getWeather(cityData.Key);

  return {
    cityData,
    weather
  }
}

cityForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get city value 
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update the ui with the new city data
  updateCity(city)
    .then(data => {
      updateUI(data);
    })
    .catch(err => console.log(err));
})