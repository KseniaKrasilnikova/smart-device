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


// mask for phone input in form

var setupForm = function () {
  window.addEventListener('DOMContentLoaded', function () {
    var input = document.getElementById('phone');
    var keyCode;

    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = input.selectionStart;
      if (pos < 3) {
        event.preventDefault();
      }
      var matrix = '+7 (___) ___ ____';
      var i = 0;
      var def = matrix.replace(/\D/g, '');
      var val = input.value.replace(/\D/g, '');
      var newValue = matrix.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });
      i = newValue.indexOf('_');
      if (i !== -1) {
        i < 5 && (i = 3);
        newValue = newValue.slice(0, i);
      }
      var reg = matrix.substr(0, input.value.length).replace(/_+/g, function (a) {
        return '\\d{1,' + a.length + '}';
      }).replace(/[+()]/g, '\\$&');
      reg = new RegExp('^' + reg + '$');
      if (!reg.test(input.value) || input.value.length < 5 || keyCode > 47 && keyCode < 58) {
        input.value = newValue;
      }
      if (event.type === 'blur' && input.value.length < 5) {
        input.value = '';
      }
    }

    input.addEventListener('input', mask, false);
    input.addEventListener('focus', mask, false);
    input.addEventListener('blur', mask, false);
    input.addEventListener('keydown', mask, false);

  });
};

jsOn();
setupAccordeon();
setupForm();
