const userList = document.querySelector('.user-list');
const addUserBtn = document.querySelector('.addUser');
const removeUserBtn = document.querySelector('.removeUser');
const addHundredBtn = document.querySelector('.addHundred');
const addThousandsBtn = document.querySelector('.addThousands');
const addTenThousandsBtn = document.querySelector('.addTenThousands');
const sortUserBtn = document.querySelector('.sortUser');
const sumMoneyBtn = document.querySelector('.sumMoney');
const totalMoney = document.querySelector('.sum-money__total');

let users = [
  {
    name: 'Jason',
    money: 14020,
  },
  {
    name: 'Olson',
    money: 49237,
  },
  {
    name: 'Jake',
    money: 38470,
  },
  {
    name: 'Kasey',
    money: 93840,
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
    name: 'Socrates',
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

// UserList 화면에 출력
function LoadUserList() {
  userList.innerHTML = `<h2 class="user-list-title"><strong>Person</strong>Money</h2>`;
  users.forEach((user) => {
    const div = document.createElement('div');
    div.classList.add('user');
    div.innerHTML = `<strong>${user.name}</strong>$${user.money}`;
    userList.append(div);
  });
}

// User 객체에 기존 유저 혹은 신규 유저 정보 등록
function createUserInfo() {
  let name;
  let money;

  if (dummyData.length === 0) {
    window.alert('더이상 추가할 user가 없습니다.');
    return;
  } else {
    name = dummyData[0].name;
    if (!dummyData[0].money || dummyData[0].money === 0) {
      money = Math.floor(Math.random() * 100000);
    } else {
      money = dummyData[0].money;
    }
  }

  const newUser = {
    name,
    money,
  };
  users.push(newUser);
  dummyData.shift();
  LoadUserList();
}

// UserList에 가장 아래에 존재하는 User 삭제
function removeLastUser() {
  dummyData.push(users.pop());
  LoadUserList();
}

// User의 money가 매개변수만큼 증가
function addMoneyToUser(money) {
  users.forEach((user) => {
    user.money += money;
  });
  LoadUserList();
}

// Money 기준 내림차순 정렬
function sortUser() {
  users.sort((a, b) => b.money - a.money);
  LoadUserList();
}

// User의 전체 Money 합계
function sumUserMoney() {
  const sum = users.reduce((acc, cur) => (acc += cur.money), 0);
  totalMoney.textContent = `$${sum}`;
}

// 버튼 이벤트리스트
addUserBtn.addEventListener('click', createUserInfo);
removeUserBtn.addEventListener('click', removeLastUser);
addHundredBtn.addEventListener('click', () => addMoneyToUser(100));
addThousandsBtn.addEventListener('click', () => addMoneyToUser(1000));
addTenThousandsBtn.addEventListener('click', () => addMoneyToUser(10000));
sortUserBtn.addEventListener('click', sortUser);
sumMoneyBtn.addEventListener('click', sumUserMoney);

// 초기 실행 코드
function init() {
  LoadUserList();
}

init();
