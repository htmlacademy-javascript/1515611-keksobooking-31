import { adFormInitializeValidation } from './validation';
import {
  minPriceBungalow,
  minPriceFlat,
  minPriceHotel,
  minPriceHouse,
  minPricePalace,
} from './constants';
import { showSuccessPopup, showErrorPopup } from './popup.js';
import { sendNewBook } from './api.js';

const adForm = document.querySelector('.ad-form');
const formHeader = adForm.querySelector('.ad-form-header');
const adElements = adForm.querySelectorAll('.ad-form__element');
const adFeatures = adForm.querySelector('.features');
const resetButton = document.querySelector('.ad-form__reset');

const filterForm = document.querySelector('.map__filters');
const mapFilters = filterForm.querySelectorAll('.map__filter');
const mapFeatures = filterForm.querySelector('.map__features');

const adFormRoomType = adForm.querySelector('#type');
const adFormRoomPrice = adForm.querySelector('#price');

const sliderElement = adForm.querySelector('.ad-form__slider');

adFormRoomPrice.placeholder = minPriceFlat;

adFormRoomType.addEventListener('change', (evt) => {
  switch (evt.target.value) {
    case 'bungalow':
      adFormRoomPrice.placeholder = minPriceBungalow;
      break;
    case 'flat':
      adFormRoomPrice.placeholder = minPriceFlat;
      break;
    case 'hotel':
      adFormRoomPrice.placeholder = minPriceHotel;
      break;
    case 'house':
      adFormRoomPrice.placeholder = minPriceHouse;
      break;
    case 'palace':
      adFormRoomPrice.placeholder = minPricePalace;
      break;
  }
});

const deactivateAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  formHeader.setAttribute('disabled', '');
  adElements.forEach((elem) => {
    elem.setAttribute('disabled', '');
  });
  adFeatures.setAttribute('disabled', '');
};

const activateAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  formHeader.removeAttribute('disabled');
  adElements.forEach((elem) => {
    elem.removeAttribute('disabled');
  });
};

const deactivateFilterForm = () => {
  filterForm.classList.add('filter-form--disabled');
  mapFilters.forEach((elem) => {
    elem.setAttribute('disabled', '');
  });
  mapFeatures.setAttribute('disabled', '');
};

const activateFilterForm = () => {
  filterForm.classList.remove('filter-form--disabled');
  mapFilters.forEach((elem) => {
    elem.removeAttribute('disabled');
  });
  mapFeatures.removeAttribute('disabled');
};

let validator;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('slide', () => {
  adFormRoomPrice.value = sliderElement.noUiSlider.get();
  if (validator) {
    validator.runValidator();
  }
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!validator) {
    validator = adFormInitializeValidation(adForm);
  }

  const isValid = validator.runValidator();
  if (isValid) {
    const formData = new FormData(adForm);
    sendNewBook(
      formData,
      () => {
        showSuccessPopup();
      },
      (error) => {
        showErrorPopup();
      }
    );
  }
});

resetButton.addEventListener('click', () => {
  sliderElement.noUiSlider.set(0);
});

export {
  activateAdForm,
  deactivateAdForm,
  activateFilterForm,
  deactivateFilterForm,
};
