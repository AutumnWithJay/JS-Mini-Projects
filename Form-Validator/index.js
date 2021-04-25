const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#confirm_password');
const submitBtn = document.querySelector('.submit');

const alertUsername = document.querySelector('.alert_username');
const alertEmail = document.querySelector('.alert_email');
const alertPassword = document.querySelector('.alert_password');
const confirmPassword = document.querySelector('.alert_password2');

const checkUsername = () => {
  if (!username.value && username.value.length <= 2) {
    alertUsername.textContent = 'Username must be at least 3 characters';
    username.style.border = '1px solid red';
  } else {
    alertUsername.textContent = '';
    username.style.border = '2px solid green';
  }
};

const checkEmail = () => {
  if (!email.value || !email.value.includes('@')) {
    alertEmail.textContent = 'Email is not valid';
    email.style.border = '1px solid red';
  } else if (email.value.includes('@')) {
    alertEmail.textContent = '';
    email.style.border = '2px solid green';
  }
};

const checkPassword = () => {
  console.log(password.length);
  if (!password.value || password.value.length <= 5) {
    alertPassword.textContent = 'Password must be at least 6 characters';
    password.style.border = '1px solid red';
  } else {
    alertPassword.textContent = '';
    password.style.border = '2px solid green';
  }
};

const checkPassword2 = () => {
  if (!password2.value) {
    confirmPassword.textContent = 'Enter same password';
    password2.style.border = '1px solid red';
  } else if (password2.value !== password.value) {
    confirmPassword.textContent = 'Password not matched';
    password2.style.border = '1px solid red';
  } else if (password2.value === password.value) {
    confirmPassword.textContent = '';
    password2.style.border = '2px solid green';
  }
};

submitBtn.addEventListener('click', () => {
  checkUsername();
  checkEmail();
  checkPassword();
  checkPassword2();
});

const checkEverything = () => {
  checkUsername();
  checkEmail();
  checkPassword();
  checkPassword2();
};

const init = () => {
  checkEverything();
};

init();
