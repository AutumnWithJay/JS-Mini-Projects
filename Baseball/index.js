const form = document.querySelector('form');
const input = document.querySelector('.selectNum');
const numbers = document.querySelector('.numList');
const result = document.querySelector('.result');
const remainCount = document.querySelector('.remainCount');
let count = 1;
let strike = 0;
let ball = 0;
let inputArr = [];
let randomArr = [];

function handleSubmit(e) {
  e.preventDefault();

  const randomNum = parseInt(100 + Math.random() * 899).toString();
  const inputNum = input.value;

  if (count === 10) {
    window.alert('Game Over');
  }

  if (inputNum.length !== 3) {
    window.alert('3자리를 입력해주세요');
  } else {
    inputArr.push(inputNum.split(''));
    randomArr.push(randomNum.split(''));
    compareNum();
  }
  input.value = '';
}

function compareNum() {
  for (let i = 0; i < 3; i++) {
    if (inputArr[count - 1][i] === randomArr[count - 1][i]) {
      strike += 1;
    } else {
      for (let j = 0; j < 3; j++) {
        if (inputArr[count - 1][i] === randomArr[count - 1][j]) {
          ball += 1;
        }
      }
    }
  }

  if (strike === 3) {
    window.alert('You Win!');
  }

  const inputNum = inputArr[count - 1].join('');
  const randomNum = randomArr[count - 1].join('');
  numbers.innerHTML = 'Your Number:' + inputNum + ' Baseball number:' + randomNum;
  result.innerHTML = 'Strike: ' + strike + ' Ball: ' + ball;
  remainCount.innerHTML = 'Remain Count: ' + (10 - count);

  count += 1;
  strike = 0;
  ball = 0;
}

form.addEventListener('submit', handleSubmit);
