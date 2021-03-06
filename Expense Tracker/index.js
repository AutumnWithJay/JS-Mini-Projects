const totalValue = document.querySelector('.tracker-total__money-balance');
const incomeValue = document.querySelector('.tracker-category__income-value');
const expenseValue = document.querySelector('.tracker-category__expense-value');
const historyList = document.querySelector('.tracker-history__list');
const inputText = document.querySelector('.input-text');
const inputAmount = document.querySelector('.input-amount');
const addBtn = document.querySelector('.add-transaction');
const delBtn = document.querySelector('.del-button');

let dataList = [];

// 수입, 지출, 현재 잔액 표시
function displayAmount(income, expense, total) {
  totalValue.textContent = `₩${total > 0 ? total : -total}`;
  incomeValue.textContent = `₩${income}`;
  expenseValue.textContent = `₩${expense === 0 ? expense : expense.toString().substring(1)}`;

  total < 0 ? totalValue.classList.add('red') : totalValue.classList.add('blue');
  incomeValue.classList.add('blue');
  expenseValue.classList.add('red');
}

// Localstorage 내의 수입, 지출 총합 계산
function calculateAmount() {
  if (dataList !== null) {
    const datas = localStorage.getItem('items');
    const parsedData = JSON.parse(datas);
    let income = 0;
    let expense = 0;
    let total = 0;

    parsedData.forEach((data) => {
      if (data.money > 0) {
        income += parseInt(data.money);
      } else {
        expense += parseInt(data.money);
      }
    });

    total = income + expense;
    displayAmount(income, expense, total);
  }
}

// list에서 데이터 삭제 후 localStroage의 해당 데이터도 삭제
function removeData(e) {
  const delBtn = e.target;
  const list = delBtn.parentNode;

  historyList.removeChild(list);
  const deleteDataList = dataList.filter((data) => {
    return data.idx !== parseInt(list.idx);
  });

  dataList = deleteDataList;
  saveData();
}

// LocalStorage에서 데이터 로드
function loadData() {
  const datas = localStorage.getItem('items');

  if (datas !== null) {
    const parsedData = JSON.parse(datas);
    parsedData.forEach((data) => {
      writeOnList(data.text, data.money);
    });
  }
}

// LocalStorage에 데이터 저장
function saveData() {
  localStorage.setItem('items', JSON.stringify(dataList));
  calculateAmount();
}

// DataList에 Data 추가
function writeOnList(text, money) {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  const span = document.createElement('span');
  const idx = dataList.length + 1;
  delBtn.textContent = '❌';
  delBtn.classList.add('del-button');
  delBtn.addEventListener('click', removeData);

  if (money.substring(0, 1) === '-') {
    span.classList.add('red');
  } else {
    span.classList.add('blue');
  }

  span.innerHTML = `<strong>${text}</strong> ₩${
    money.substring(0, 1) === '-' ? money.substring(1) : money
  }`;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.idx = idx;
  historyList.appendChild(li);
  const dataObj = {
    idx,
    text,
    money,
  };
  dataList.push(dataObj);
  saveData();
}

function getDataFromInput() {
  const text = inputText.value;
  const money = inputAmount.value;
  if (text !== '' && money !== '') {
    writeOnList(text, money);
    inputText.value = '';
    inputAmount.value = '';
  } else if (text === '') {
    window.alert('내역을 입력해주세요');
  } else {
    window.alert('금액을 입력해주세요');
  }
}

// 항목 추가 이벤트
addBtn.addEventListener('click', getDataFromInput);

document.addEventListener('keypress', (e) => {
  if (e.code === 'Enter') {
    getDataFromInput();
  }
});

// 초기 실행
function init() {
  loadData();
  calculateAmount();
}

init();
