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

jsOn();
setupAccordeon();
