import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Object of Elements
const refs = {
  inputDate: document.querySelector('datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

let timerId = null;

// Convert data time
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Add zero
function addZero(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    refs.startBtn.disabled = false;

    const showTimer = () => {
      const nowTime = new Date();
      localStorage.setItem('selectedData', selectedDates[0]);
      const selectData = new Date(localStorage.getItem('selectedData'));

      if (!selectData) return;

      const difference = selectData - nowTime;
      const { days, hours, minutes, seconds } = convertMs(difference);
      refs.daysEl.textContent = addZero(days);
      refs.hoursEl.textContent = addZero(hours);
      refs.minutesEl.textContent = addZero(minutes);
      refs.secondsEl.textContent = addZero(seconds);

      if (
        refs.daysEl.textContent === '00' &&
        refs.hoursEl.textContent === '00' &&
        refs.minutesEl.textContent === '00' &&
        refs.secondsEl.textContent === '00'
      ) {
        clearInterval(timerId);
      }
    };

    const onClick = () => {
      if (timerId) {
        clearInterval(timerId);
      }
      showTimer();
      timerId = setInterval(showTimer, 1000);
    };

    refs.startBtn.addEventListener('click', onClick);
  },
};

flatpickr('#datetime-picker', { ...options });
