function checkPasswordsMatch() {
  const password = document.querySelector('#password');
  const confirmPassword = document.querySelector('#confPassword');
  return password.value === confirmPassword.value;
}

function showError(input) {
  let isValid = false;
  const errorElement = input.parentElement.nextElementSibling;
  if (input.validity.valueMissing) {
    errorElement.textContent = 'You need to enter a value';
  } else if (input.validity.typeMismatch) {
    errorElement.textContent = `Entered value needs to be ${input.type}`;
  } else if (input.validity.tooShort) {
    errorElement.textContent = `Value should be at least ${input.minLength} characters; you entered ${input.value.length}.`;
  } else if (input.id === 'confPassword' && !checkPasswordsMatch()) {
    errorElement.textContent = 'Passwords must match';
  } else if (input.id === 'password' && input.validity.patternMismatch) {
    errorElement.textContent = '*Password must contain: at least 6 characters, at least 1 uppercase character, at least 1 lowercase character, at least 1 number';
  } else if (input.validity.patternMismatch) {
    errorElement.textContent = `Entered value needs to be ${input.type}`;
  } else {
    isValid = true;
  }
  errorElement.style.maxHeight = isValid ? '0px' : '200px';
}

function addEventListenerToInput(input) {
  input.addEventListener('input', function setupInput() {
    const errorElement = this.parentElement.nextElementSibling;
    if (this.validity.valid && checkPasswordsMatch()) {
      errorElement.textContent = '';
      return true;
    }
    showError(input);
    return false;
  });
}

function doWithInput(form, func) {
  let isDone = true;
  const inputs = form.querySelectorAll('input');
  const nodes = [...inputs];
  nodes.forEach((input) => {
    const result = func(input);
    isDone = result && isDone;
  });
  return isDone;
}

const form = document.querySelector('form');
form.addEventListener('submit', function checkForm(event) {
  if (!doWithInput(this, showError)) event.preventDefault();
});
doWithInput(form, addEventListenerToInput);
// dispatch event for confirm password on password change
document.querySelector('#password').addEventListener('input', () => {
  const confirmPassword = document.querySelector('#confPassword');
  showError(confirmPassword);
});
