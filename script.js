let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const labsList = document.getElementById('lapsList');

document.getElementById('startBtn').addEventListener('click', start);
document.getElementById('pauseBtn').addEventListener('click', pause);
document.getElementById('resetBtn').addEventListener('click', reset);
document.getElementById('lapBtn').addEventListener('click', recordLap);

function updateTime() {
  const currentTime = Date.now() - startTime + elapsedTime;
  const date = new Date(currentTime);

  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');

  display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function start() {
  if (!isRunning) {
    startTime = Date.now();
    timerInterval = setInterval(updateTime, 10);
    isRunning = true;
  }
}

function pause() {
  if (isRunning) {
    elapsedTime += Date.now() - startTime;
    clearInterval(timerInterval);
    isRunning = false;
  }
}

function reset() {
  clearInterval(timerInterval);
  display.textContent = '00:00:00.00';
  elapsedTime = 0;
  isRunning = false;
  labsList.innerHTML = '';
}

function recordLap() {
  if (isRunning) {
    const li = document.createElement('li');
    li.textContent = display.textContent;
    labsList.appendChild(li);
  }
}
