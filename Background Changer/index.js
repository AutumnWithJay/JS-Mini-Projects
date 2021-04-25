const body = document.body,
  hexColor = document.querySelector('.hexColor'),
  clickBtn = document.querySelector('.clickBtn');

function codeGenerator() {
  const hexNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  let result = '#';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * hexNumbers.length);
    result += hexNumbers[randomIndex];
  }
  hexColor.innerHTML = '<h1>Hex Color : ' + result + '</h1>';
  body.style.backgroundColor = result;
}

clickBtn.addEventListener('click', codeGenerator);

function init() {
  hexColor.innerHTML = '<h1>Hex Color : #ffffff</h1>';
}

init();
