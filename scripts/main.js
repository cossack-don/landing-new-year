'use strict';

const timeLeft = document.querySelector('.time-left'),
      days = document.querySelector('.days'),
      hours = document.querySelector('.hours'),
      minutes = document.querySelector('.minutes'),
      seconds = document.querySelector('.seconds'),
      burgerMenu = document.querySelector('.burger-menu'),
      closebtn = document.querySelector('.close-btn'),
      popup = document.querySelector('.popup'),
      callbackForm = document.querySelector('.callback'),
      callbackSubmitBtn = document.querySelector('.callback-submit'),
      successMessage = document.querySelector('.success'),
      errorMessage = document.querySelector('.error'),
      fillingMessage = document.querySelector('.filling'),
      ajaxLoaderSpan = document.querySelector('.ajax-loader span'),
      firstSection = document.querySelector('.first'),
      arrowUp = document.querySelector('.arrow-up'),
      timeWordEnding = {
        seconds: [' секунда', ' секунды', ' секунд'],
        minutes: [' минута', ' минуты', ' минут'],
        hours: [' час', ' часа', ' часов'],
        days: [' день', ' дня', ' дней']
      };

// Добалвение нулей к значению времени 
function addZero(value) {
  if (value < 10) {
    return `0${value}`
  } else {
      return value;
  }
}
// Склонение слов для времени
function getWordEnding(timeSelector, value) {
  const timeSelectorName = timeSelector.getAttribute('name');

  if ((value >= 2 && value <= 4) ||
      (value >= 22 && value <= 24) ||
      (value >= 32 && value <= 34) ||
      (value >= 42 && value <= 44) ||
      (value >= 52 && value <= 54) ||
      (value >= 62 && value <= 64) ||
      (value >= 72 && value <= 74)) {
    timeSelector.textContent = addZero(value) + timeWordEnding[timeSelectorName][1];
  } else if (value == 0 ||
             (value >= 5 && value <= 20) ||
             (value >= 25 && value <= 30) ||
             (value >= 35 && value <= 40) ||
             (value >= 45 && value <= 50) ||
             (value >= 55 && value <= 59) ||
             (value >= 65 && value <= 69) ||
             (value >= 75 && value <= 79)) {
    timeSelector.textContent = addZero(value) + timeWordEnding[timeSelectorName][2];
  } else {
    timeSelector.textContent = addZero(value) + timeWordEnding[timeSelectorName][0];
  }
}
// Подсчет оставшегося времени
function getTimeRemaining() {
  let today = Date.now();
  let timeTillNY = new Date(2021, 0, 0);
  let timeDifference = timeTillNY - today;

  let secondsLeft = Math.floor((timeDifference / 1000) % 60),
      minutesLeft = Math.floor((timeDifference / 1000 / 60) % 60),
      hoursLeft = Math.floor((timeDifference / 1000 / 60 / 60) % 24),
      daysLeft = Math.floor(timeDifference / 1000 / 60 / 60 / 24);

  return {timeDifference, daysLeft, hoursLeft, minutesLeft, secondsLeft};
}
// Обновление таймера
function updateClock() {
  let timer = getTimeRemaining();

  getWordEnding(seconds, timer.secondsLeft);
  getWordEnding(minutes, timer.minutesLeft);
  getWordEnding(hours, timer.hoursLeft);
  getWordEnding(days, timer.daysLeft);
}
let updClk = setInterval(updateClock, 1000);

// Открытие/закрытие меню
function toggleMenu() {
  burgerMenu.addEventListener('click', function() {
    popup.classList.add('is-open');
  })
  popup.addEventListener('click', function(event) {
    if (event.target.closest('.close-btn') || event.target.closest('li'))
      popup.classList.remove('is-open');
  })
}

// Функция поднятия наверх страницы
function showArrowUpBtn() {
  let sectionHeight = firstSection.offsetHeight,
      heightToTop = window.pageYOffset;

  if (heightToTop > sectionHeight) {
    arrowUp.style.display = 'block';
  } else {
    arrowUp.style.display = 'none';
  }
}

function scrollToTop() {
  window.scrollTo(0, 0);
}

// Отправка данных с формы
async function formSend(event) {
  event.preventDefault();

  let formData = new FormData(callbackForm);

  ajaxLoaderSpan.style.display = 'inline-block';

  let response = await fetch('./sendmail.php', {
    method: 'POST',
    body: formData
  });

  if (response.ok) {
    let result = await response.json();
    callbackForm.reset();
    callbackSubmitBtn.setAttribute('disabled', 'disabled');
    ajaxLoaderSpan.style.display = 'none';
    successMessage.style.display = 'block';
  } else {
      callbackSubmitBtn.setAttribute('disabled', 'disabled');
      ajaxLoaderSpan.style.display = 'none';
      successMessage.style.display = 'block';
  }

  callbackSubmitBtn.removeAttribute('disabled');
  setTimeout(function() {
    successMessage.style.display = 'none';
  }, 4000);
}

callbackForm.addEventListener('submit', formSend);
window.addEventListener('scroll', showArrowUpBtn);
arrowUp.addEventListener('click', scrollToTop);

updateClock();
toggleMenu();
var mySwiper = new Swiper('.swiper-container', {
  loop: true,
  autoplay: true,
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    // when window width is >= 650px
    650: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    // when window width is >= 1024px
    1024: {
      slidesPerView: 3,
      spaceBetween: 20
    }
  }
})