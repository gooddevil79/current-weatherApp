'use strict';
// DOM selection
const form = document.querySelector('.form');
const input = document.querySelector('.form__input-name');
const btn = document.querySelector('.form__btn');
const weatherCardContainer = document.querySelector('.weather');
// ///////////////////////////////////////////
let closeBtn; // will update in eatch request for data

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const cityName = input.value;
  if (!cityName) {
    form.classList.add('animate__headShake');
    setTimeout(() => {
      form.classList.remove('animate__headShake');
    }, 400);
    return;
  }
  // console.log(cityName);
  // clearing
  input.blur();
  input.value = '';
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=0f0a61cbd0fc4dbda32202540220906&q=${cityName}&aqi=no`
  )
    .then(respone => {
      console.log(respone);
      if (!respone.ok) throw new Error(`No matching location found`);

      return respone.json();
    })
    .then(data => {
      console.log(data);
      const html = `
      <div class="weather__card  hidden">
      <button class="weather__card__close-btn">
<lord-icon
    src="https://cdn.lordicon.com/vfzqittk.json"
    trigger="morph"
    colors="primary:373b44"
    style="width:25px;height:25px">
</lord-icon>
          </button>
      <div class="weather__card__details">
        <h2 class="weather__card__details__city-name">${data.location.name}, ${data.location.country}</h2>
          <p class="weather__card__details__temp">${data.current.temp_c} °C</p>
        </div>
       <div class="weather__card__sky-status">
        <p class="weather__card__sky-status__text">${data.current.condition.text}</p>
        <img class="weather__card__sky-status__img" src="${data.current.condition.icon}" alt="sun" />
       </div>
      </div>`;
      form.classList.remove('alert');
      weatherCardContainer.insertAdjacentHTML('beforeend', html);
      console.log(`${data.current.condition.text} C`);
    })
    .catch(err => {
      form.classList.add('alert');
      form.classList.add('animate__headShake');
      setTimeout(() => {
        form.classList.remove('animate__headShake');
      }, 400);
      return;
    })
    .finally(() => {
      closeBtn = document.querySelectorAll('.weather__card__close-btn');
      weatherCardContainer.lastChild.classList.remove('hidden');
      closeBtn.forEach(btn => {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          this.closest('.weather__card').remove();
        });
      });
    });
});
