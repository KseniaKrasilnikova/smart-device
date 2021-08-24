'use strict';

var accordeonButtons = document.getElementsByClassName('accordeon__btn');
for (var i = 0; i < accordeonButtons.length; i++) {
  accordeonButtons[i].addEventListener('click', function () {
    for (var j = 0; j < accordeonButtons.length; j++) {
      accordeonButtons[j].classList.remove('accordeon--active');
    }
    this.classList.toggle('accordeon--active');
  });
}
/*
var accordeonMapBtn = document.querySelector('.accordeon__btn--map');
var accordeonAddressBtn = document.querySelector('.accordeon__btn--address');
var accordeonMapContent = document.querySelector('.cite-map__content');
var accordeonAddressContent = document.querySelector('.address__content');

accordeonMapBtn.addEventListener('click', function () {
  if (accordeonMapContent.classList.contains('cite-map--closed')) {
    accordeonMapContent.classList.remove('cite-map--closed');
    accordeonMapContent.classList.add('cite-map--opened');
  } else {
    accordeonMapContent.classList.remove('cite-map--opened');
  }
});*/
