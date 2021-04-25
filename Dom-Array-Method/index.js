const addUserBtn = document.querySelector('#add-user');
const doubleMoneyBtn = document.querySelector('#double-money');
const MillionaireBtn = document.querySelector('#show-millionaire');
const richestBtn = document.querySelector('#sort-richest');
const calcWealthBtn = document.querySelector('#calc-wealth');

const userListBoard = document.querySelector('.content-list');

let userList = [];

const displayUser = () => {
  userListBoard.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  userList.forEach((user) => {
    const div = document.createElement('div');
    div.classList.add('person');
    div.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.money)}`;
    userListBoard.append(div);
  });
};

const addData = (user) => {
  if (userList.length < 15) {
    userList.push(user);
  }
  displayUser();
};

const getUser = async () => {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1500000),
  };

  addData(newUser);
};

const doubleMoney = () => {
  userList.forEach((user) => {
    return (user.money = user.money * 2);
  });
  displayUser();
};

const filterMillionaire = () => {
  userList = userList.filter((user) => {
    return user.money > 1000000;
  });
  displayUser();
};

const sortByRichest = () => {
  userList.sort((a, b) => b.money - a.money);
  displayUser();
};

const calcWealth = () => {
  const wealth = userList.reduce((acc, cur) => (acc += cur.money), 0);
  const div = document.createElement('div');
  div.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
  userListBoard.append(div);
};

const formatMoney = (number) => {
  return number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

addUserBtn.addEventListener('click', getUser);
doubleMoneyBtn.addEventListener('click', doubleMoney);
MillionaireBtn.addEventListener('click', filterMillionaire);
richestBtn.addEventListener('click', sortByRichest);
calcWealthBtn.addEventListener('click', calcWealth);

getUser();
