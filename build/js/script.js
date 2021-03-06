'use strict';

var setupAccordeon = function () {
  var accordeonButtons = document.getElementsByClassName('accordeon__btn');
  Array.prototype.slice.call(accordeonButtons).forEach(function (button) {
    button.addEventListener('click', function () {
      var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
      if (width > 767) {
        return;
      }

      for (var j = 0; j < accordeonButtons.length; j++) {
        if (accordeonButtons[j] !== button) {
          accordeonButtons[j].classList.remove('accordeon--active');
        }
      }
      button.classList.toggle('accordeon--active');
    });
  });
};

var jsOn = function () {
  var elements = document.querySelectorAll('.no-js');
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('no-js');
  }
};

var setupForm = function () {
  var formPhone = document.getElementById('phone');
  var popupFormPhone = document.getElementById('popup-phone');
  var formName = document.getElementById('name');
  var popupFormName = document.getElementById('popup-name');
  var phoneError = document.getElementById('phone-error');
  var popupFormPhoneError = document.getElementById('popup-phone-error');
  var nameError = document.getElementById('name-error');
  var popupNameError = document.getElementById('popup-name-error');
  var personalData = document.getElementById('personal-data-check');
  var popupPersonalData = document.getElementById('call-check');
  var formSubmitBtn = document.getElementById('form-submit');
  var popupFormSubmitBtn = document.getElementById('call-submit');
  var popupFormInputs = document.querySelectorAll('.call__form label input');
  var popupFormErrors = document.querySelectorAll('.call__form .form__comment');

  var validateName = function (inputElement, errorElement) {
    var nameIsValid = /^[a-zA-ZЁёа-яА-Я ]{2,30}$/.test(inputElement.value);
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

  var isPopupFormValid = function () {
    return validateName(popupFormName, popupNameError)
      & validatePhone(popupFormPhone, popupFormPhoneError)
      & validatePersonalData(popupPersonalData);
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
    if (!isFormValid()) {
      event.preventDefault();
    }
  });

  popupFormSubmitBtn.addEventListener('click', function (event) {
    if (!isPopupFormValid()) {
      event.preventDefault();
    } else {
      saveCallFormData();
    }
  });

  var keyCode;

  var Mask = function (event) {
    if (event.keyCode === true) {
      keyCode = event.keyCode;
    }
    var pos = this.selectionStart;
    if (pos < 3) {
      event.preventDefault();
    }
    var matrix = '+7 (___) ___ ____';
    var i = 0;
    var def = matrix.replace(/\D/g, '');
    var val = this.value.replace(/\D/g, '');
    var newValue = matrix.replace(/[_\d]/g, function (a) {
      return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
    });
    i = newValue.indexOf('_');
    if (i !== -1) {
      if (i < 5) {
        i = 3;
      }
      newValue = newValue.slice(0, i);
    }
    var reg = matrix.substr(0, this.value.length).replace(/_+/g, function (a) {
      return '\\d{1,' + a.length + '}';
    }).replace(/[+()]/g, '\\$&');
    reg = new RegExp('^' + reg + '$');
    if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
      this.value = newValue;
    }
    if (event.type === 'blur' && this.value.length < 5) {
      this.value = '';
    }
  };

  formPhone.addEventListener('input', Mask, false);
  formPhone.addEventListener('focus', Mask, false);
  formPhone.addEventListener('blur', Mask, false);
  formPhone.addEventListener('keydown', Mask, false);
  popupFormPhone.addEventListener('input', Mask, false);
  popupFormPhone.addEventListener('focus', Mask, false);
  popupFormPhone.addEventListener('blur', Mask, false);
  popupFormPhone.addEventListener('keydown', Mask, false);
};

var popupCall = document.querySelector('.call');
var overlayCall = document.querySelector('.overlay-call');
var popupOutside = document.querySelector('.popup-outside');
var popupCloseBtn = popupCall.querySelector('.call__button button');
var popupOpenBtn = document.querySelector('.open-popup-btn');

var openPopupCall = function (evt) {
  evt.preventDefault();
  popupCall.classList.add('popup__show');
  overlayCall.classList.add('popup-overlay--show');
  document.getElementById('popup-name').focus();
  document.getElementsByTagName('body')[0].style.overflow = 'hidden';
};

var closePopupCall = function (evt) {
  if (evt.button === 0 || evt.key === 'Escape') {
    popupCall.classList.remove('popup__show');
    overlayCall.classList.remove('popup-overlay--show');
    document.getElementsByTagName('body')[0].style.overflow = '';
  }
};

document.addEventListener('keydown', closePopupCall, true);
popupOutside.addEventListener('mousedown', closePopupCall, true);
popupCloseBtn.addEventListener('mousedown', closePopupCall, true);
popupOpenBtn.addEventListener('mousedown', openPopupCall, true);

var callForm = popupCall.querySelector('.call__form');
var saveCallFormData = function () {
  localStorage.setItem('popup-name', document.getElementById('popup-name').value);
  localStorage.setItem('popup-phone', document.getElementById('popup-phone').value);
  localStorage.setItem('call-question', document.getElementById('call-question').value);
};

callForm.addEventListener('submit', saveCallFormData, true);

jsOn();
setupAccordeon();
setupForm();
