'use strict';

// accordeon in footer
var setupAccordeon = function () {
  var accordeonButtons = document.getElementsByClassName('accordeon__btn');
  for (var i = 0; i < accordeonButtons.length; i++) {
    accordeonButtons[i].addEventListener('click', function () {

      for (var j = 0; j < accordeonButtons.length; j++) {
        if (accordeonButtons[j] !== this) {
          accordeonButtons[j].classList.remove('accordeon--active');
        }
      }
      this.classList.toggle('accordeon--active');
    });
  }
};

// no-JS in accordion
var jsOn = function () {
  var elements = document.querySelectorAll('.no-js');
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('no-js');
  }
};


var setupForm = function () {

  // validation of feedback form
  var formPhone = document.getElementById('phone');
  var formName = document.getElementById('name');
  var phoneError = document.getElementById('phone-error');
  var nameError = document.getElementById('name-error');
  var personalData = document.getElementById('check');
  var formSubmitBtn = document.getElementById('form-submit');
  var formInputs = document.querySelectorAll('.input');
  var formErrors = document.querySelectorAll('.form__comment');

  var validateName = function (inputElement, errorElement) {
    var nameIsValid = /^[a-zA-Z ]{2,30}$/.test(inputElement.value);
    if (nameIsValid) {
      inputElement.classList.remove('form__input--invalid');
      inputElement.blur();
      errorElement.classList.add('visually-hidden');
    } else {
      inputElement.classList.remove('form__input--invalid');
      inputElement.blur();
      errorElement.classList.remove('visually-hidden');
    }
    return nameIsValid;
  };

  var validatePhone = function (inputElement, errorElement) {
    var phoneNmbIsValid = /^(\+7)?[\s\-]?\(?[\s\-]?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/.test(inputElement.value);
    if (phoneNmbIsValid) {
      inputElement.classList.remove('form__input--invalid');
      inputElement.blur();
      errorElement.classList.add('visually-hidden');
    } else {
      inputElement.classList.add('form__input--invalid');
      inputElement.blur();
      errorElement.classList.remove('visually-hidden');
    }
    return phoneNmbIsValid;
  };

  var validatePersonalData = function (inputElement) {
    var personalDataIsValid = inputElement.checked;
    if (personalDataIsValid) {
      inputElement.classList.remove('form__input--invalid');
      inputElement.blur();
    } else {
      inputElement.classList.add('form__input--invalid');
      inputElement.blur();
    }
    return personalDataIsValid;
  };

  var isFormValid = function () {
    return validateName(formName, nameError)
      & validatePhone(formPhone, phoneError)
      & validatePersonalData(personalData);
  };

  var resetForm = function (inputElements, errorElements) {
    for (var i = 0; i < inputElements.length; i++) {
      inputElements[i].value = null;
      inputElements[i].classList.remove('form__input--invalid');
    }
    for (i = 0; i < errorElements.length; i++) {
      errorElements[i].classList.add('visually-hidden');
    }
  };

  formSubmitBtn.addEventListener('click', function (event) {
    if (isFormValid()) {
      resetForm(formInputs, formErrors);
    } else {
      event.preventDefault();
    }
  });

  // mask for phone input in form
  window.addEventListener('DOMContentLoaded', function () {
    var keyCode;

    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = formPhone.selectionStart;
      if (pos < 3) {
        event.preventDefault();
      }
      var matrix = '+7 (___) ___ ____';
      var i = 0;
      var def = matrix.replace(/\D/g, '');
      var val = formPhone.value.replace(/\D/g, '');
      var newValue = matrix.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });
      i = newValue.indexOf('_');
      if (i !== -1) {
        i < 5 && (i = 3);
        newValue = newValue.slice(0, i);
      }
      var reg = matrix.substr(0, formPhone.value.length).replace(/_+/g, function (a) {
        return '\\d{1,' + a.length + '}';
      }).replace(/[+()]/g, '\\$&');
      reg = new RegExp('^' + reg + '$');
      if (!reg.test(formPhone.value) || formPhone.value.length < 5 || keyCode > 47 && keyCode < 58) {
        formPhone.value = newValue;
      }
      if (event.type === 'blur' && formPhone.value.length < 5) {
        formPhone.value = '';
      }
    }

    formPhone.addEventListener('input', mask, false);
    formPhone.addEventListener('focus', mask, false);
    formPhone.addEventListener('blur', mask, false);
    formPhone.addEventListener('keydown', mask, false);
  });
};

jsOn();
setupAccordeon();
setupForm();
