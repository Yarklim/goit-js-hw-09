// ===== Elements link and styles =========

const bodyEl = document.querySelector('body');

const startBtn = document.querySelector('[data-start]');
startBtn.style.padding = '10px 20px';

const stopBtn = document.querySelector('[data-stop]');
stopBtn.disabled = true;
stopBtn.style.padding = '10px 20px';

startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopBtn);

// ========== Get random colors ===========

let intervalID = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function updateBgColor(color) {
  bodyEl.style.backgroundColor = color;
}

// ======== Change color and attribute disabled =======

function onStartBtn() {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  updateBgColor(getRandomHexColor());
  intervalID = setInterval(() => updateBgColor(getRandomHexColor()), 1000);
}

function onStopBtn() {
  startBtn.disabled = false;
  stopBtn.disabled = true;

  clearInterval(intervalID);
}
