import { adFormInitializeValidation } from './validation';

const adForm = document.querySelector('.ad-form');
const formHeader = adForm.querySelector('.ad-form-header');
const adElements = adForm.querySelectorAll('.ad-form__element');
const adFeatures = adForm.querySelector('.features');

const filterForm = document.querySelector('.map__filters');
const mapFilters = filterForm.querySelectorAll('.map__filter');
const mapFeatures = filterForm.querySelector('.map__features');

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

//Валидация формы
const runValidator = adFormInitializeValidation(adForm);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = runValidator();
  if (!isValid) {
    //console.log('invalid');
  }
  //console.log('valid');
});

export {
  activateAdForm,
  deactivateAdForm,
  activateFilterForm,
  deactivateFilterForm,
};
