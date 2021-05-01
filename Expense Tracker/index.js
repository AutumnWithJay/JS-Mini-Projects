const remainMoney = document.querySelector('.tracker-total__money-title');
const income = document.querySelector('.tracker-category__income-value');
const expense = document.querySelector('.tracker-category__expense-value');
const historyList = document.querySelector('.tracker-history__list');
const inputText = document.querySelector('.input-text');
const inputAmount = document.querySelector('.input-amount');
const addBtn = document.querySelector('.add-transaction');
const delBtn = document.querySelector('.del-button');

let dataList = [];

// DataList에 Data 추가
function writeOnList(text, money) {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  const span = document.createElement('span');
  const idx = dataList.length + 1;
  delBtn.innerText = '❌';
  delBtn.classList.add('del-button');
  delBtn.addEventListener('click', (e) => removeData(e));
  span.innerText = `${text}, ${money}`;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = idx;
  historyList.appendChild(li);
  const dataObj = {
    idx,
    text,
    money,
  };
  dataList.push(dataObj);
}

// 항목 추가 버튼 이벤트
addBtn.addEventListener('click', () => {
  const text = inputText.value;
  const money = Number(inputAmount.value);
  writeOnList(text, money);
  inputText.value = '';
  inputAmount.value = '';
});
