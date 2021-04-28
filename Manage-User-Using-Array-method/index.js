const userList = document.querySelector('.user-list');

let users = [
  {
    name: 'Jason',
  },
  {
    name: 'Olson',
  },
  {
    name: 'Jake',
  },
  {
    name: 'Kasey',
  },
];

const dummyData = [
  {
    name: 'Liam',
  },
  {
    name: 'Emma',
  },
  {
    name: 'Ava',
  },
  {
    name: 'Sophia',
  },
  {
    name: 'Liam',
  },
  {
    name: 'Charlotte',
  },
  {
    name: 'Amelia',
  },
  {
    name: 'Harper',
  },
  {
    name: 'Lucas',
  },
  {
    name: 'Benjamin',
  },
  {
    name: 'Mason',
  },
  {
    name: 'Ethan',
  },
];

function LoadUserList() {
  users.forEach((user) => {
    const div = document.createElement('div');
    div.classList.add('user');
    div.innerHTML = `${user.name} $${user.money}`;
    userList.append(div);
  });
}

function init() {
  LoadUserList();
}

init();
