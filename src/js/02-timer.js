// імпортуємо наші бібліотеки

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// Рефимо наші перемінні для пошуку

const refs = {
    dateTimeInput: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]'),
    dataDays: document.querySelector('span[data-days]'),
    dataHours :document.querySelector('span[data-hours]'),
    dataMinutes: document.querySelector('span[data-minutes]'),
    dataSeconds: document.querySelector('span[data-seconds]'),
}


const CURRENT_DATE = Date.now();
let SELECTED_DATE = new Date();
let deltaTime;
let timerId = null;


refs.btnStart.disabled = true;
refs.btnStop.disabled = true;
// Опшн з ТЗ
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // Пишемо умову з ТЗ про актуальну дату та аларм
    if (selectedDates[0] < CURRENT_DATE) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.btnStart.disabled = false;
      SELECTED_DATE = selectedDates[0];
    }
  },
};

// Запускаємо флетпикр
flatpickr(refs.dateTimeInput, options);

// Додаємо нуль, у випадку якщо показник меньший за 10, аби був формат хх:хх:хх
function pad(value) {
    return String(value).padStart(2, '0');
  }

// Вішаємо слухача на батон
refs.btnStart.addEventListener('click', onStartTimer);

// Запускаємо наш таймер
function onStartTimer() {
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;
    refs.dateTimeInput.disabled = true;
    getTime();
  }

// Пишемо нашу функцію  
function getTime() {
  timerId = setInterval(() => {
    deltaTime = SELECTED_DATE - Date.now();
    const setDate = convertMs(deltaTime);
    if (deltaTime <= 0) {
      clearInterval(timerId);
    } else {
      viewTime(setDate);
    }
  }, 1000);
};

refs.btnStop.addEventListener('click', () => {
    clearInterval(timerId);
    refs.btnStart.disabled = false;
    refs.dateTimeInput.disabled = false;
    refs.btnStop.disabled = true;
  });



// Копі пастимо:
function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = pad(Math.floor((ms % day) / hour));
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
    return { days, hours, minutes, seconds };
  }
  


  function viewTime(setDate) {
    refs.dataDays.textContent = setDate.days;
    refs.dataHours.textContent = setDate.hours;
    refs.dataMinutes.textContent = setDate.minutes;
    refs.dataSeconds.textContent = setDate.seconds;
  }