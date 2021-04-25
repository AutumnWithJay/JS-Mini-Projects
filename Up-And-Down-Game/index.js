const message = document.querySelector('.game-progress__number');
const result = document.querySelector('.game-progress__result');
const micIcon = document.querySelector('.fas');

const randomNum = generateRandomNum();

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();
recognition.start();

function voiceCapture(e) {
  const word = e.results[0][0].transcript;
  writeWord(word);
  checkNumber(word);
}

function writeWord(word) {
  message.innerHTML = `<div>${word}</div>`;
}

function checkNumber(word) {
  const num = +word;

  if (Number.isNaN(num)) {
    result.innerHTML = `<div>${word}는/은 숫자가 아닙니다</div>`;
    return;
  }

  if (num > 100 || num < 1) {
    result.innerHTML = `<div>숫자는 1과 100 사이여야 합니다.</div>`;
    return;
  }

  if (num === randomNum) {
    result.innerHTML = `<div>정답입니다.!</div>`;
  } else if (num > randomNum) {
    result.innerHTML = `<div>Down!</div>`;
  } else {
    result.innerHTML = `<div>Up!</div>`;
  }
}

function generateRandomNum() {
  return Math.floor(Math.random() * 100) + 1;
}

recognition.addEventListener('result', voiceCapture);
recognition.addEventListener('end', () => recognition.start());
