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
import { closeMapPopup, resetMainMarker } from './map.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
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
const avatarBlockUploadInput = document.querySelector('#avatar');
const avatarBlock = document.querySelector('.ad-form-header__preview img');
const avatarBlockContainer = document.querySelector('.ad-form-header__preview');
const apartBlockUpload = document.querySelector('.ad-form__upload');
const apartBlock = document.querySelector('.ad-form__photo');

const adFormTimeIn = document.querySelector('#timein');
const adFormTimeOut = document.querySelector('#timeout');

adFormTimeIn.addEventListener('change', (evt) => {
  adFormTimeOut.value = evt.target.value;
});

adFormTimeOut.addEventListener('change', (evt) => {
  adFormTimeIn.value = evt.target.value;
});

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
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});

sliderElement.noUiSlider.on('slide', () => {
  adFormRoomPrice.value = sliderElement.noUiSlider.get();
  if (validator) {
    validator.runValidator();
  }
});

adFormRoomPrice.addEventListener('change', (evt) => {
  sliderElement.noUiSlider.set(evt.target.value || 0);
  if (validator) {
    validator.runValidator();
  }
});

const resetImgPreviews = () => {
  avatarBlockContainer.style.removeProperty('padding');
  avatarBlock.width = 40;
  avatarBlock.height = 44;
};

const formReset = () => {
  apartBlock.innerHTML = '';
  avatarBlock.src = 'img/muffin-grey.svg';
  adForm.reset();
  sliderElement.noUiSlider.set(0);
  closeMapPopup();
  resetMainMarker();
  resetImgPreviews();
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!validator) {
    validator = adFormInitializeValidation(adForm);
  }

  const isValid = validator.runValidator();
  if (isValid) {
    const formData = new FormData(adForm);
    closeMapPopup();
    sendNewBook(
      formData,
      () => {
        formReset();
        showSuccessPopup();
      },
      (error) => {
        showErrorPopup();
      }
    );
  }
});

resetButton.addEventListener('click', () => {
  formReset();
});

const renderAvatarImage = (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    avatarBlock.width = 70;
    avatarBlock.height = 70;
    avatarBlock.style.padding = 0;
    avatarBlockContainer.style.padding = 0;
    avatarBlock.src = URL.createObjectURL(file);
  }
};
avatarBlockUploadInput.addEventListener('change', renderAvatarImage);

const renderApartImage = (evt) => {
  apartBlock.innerHTML = '';
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const img = document.createElement('img');
    img.width = 70;
    img.height = 70;
    img.src = URL.createObjectURL(file);
    apartBlock.appendChild(img);
  }
};
apartBlockUpload.addEventListener('change', renderApartImage);

adForm.addEventListener('reset', () => {
  adFormRoomPrice.placeholder = minPriceFlat;
});

export {
  activateAdForm,
  deactivateAdForm,
  activateFilterForm,
  deactivateFilterForm,
};
