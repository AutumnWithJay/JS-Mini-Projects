const previous = document.querySelector('.prev_page');
const next = document.querySelector('.next_page');
const btn = document.querySelectorAll('button');
const image = document.querySelector('img');

let num = 1;
const images = [
  './images/1.jpg',
  './images/2.webp',
  './images/3.jpeg',
  './images/4.jpg',
  './images/5.jpg',
];

previous.addEventListener('click', function () {
  if (num > 1 && num < 6) {
    num -= 1;
  } else if (num == 1) {
    num = 5;
  }
  image.src = images[num - 1];
});

next.addEventListener('click', function () {
  if (num > 0 && num < 5) {
    num += 1;
  } else if (num == 5) {
    num = 1;
  }
  image.src = images[num - 1];
});

for (let i = 0; i < 5; i++) {
  btn[i].addEventListener('click', function (e) {
    let value = e.target.value;
    image.src = images[value];
  });
}

function init() {
  image.src = images[0];
}

init();
