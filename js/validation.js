import {
  minTitleLength,
  maxTitleLength,
  maxPrice,
  minPriceBungalow,
  minPriceFlat,
  minPriceHotel,
  minPriceHouse,
  minPricePalace,
} from './constants';

let pristine;
const adFormInitializeValidation = (form) => {
  const adFormTitle = form.querySelector('#title');
  const adFormRoomPrice = form.querySelector('#price');
  const adFormRoomNumber = form.querySelector('#room_number');
  const adFormRoomCapacity = form.querySelector('#capacity');
  const adFormRoomType = form.querySelector('#type');
  const adFormTimeIn = form.querySelector('#timein');
  const adFormTimeOut = form.querySelector('#timeout');

  pristine = new Pristine(form, {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    errorTextParent: 'ad-form__element',
  });

  adFormTimeIn.addEventListener('change', (evt) => {
    adFormTimeOut.value = evt.target.value;
  });

  adFormTimeOut.addEventListener('change', (evt) => {
    adFormTimeIn.value = evt.target.value;
  });

  const validateAdFormTitle = (value) =>
    value.length >= minTitleLength && value.length <= maxTitleLength;

  const validateAdFormPrice = (value) => +value <= maxPrice;

  const validateAdFormRoomNumber = (value) => {
    switch (value) {
      case '1':
        return adFormRoomCapacity.value === '1';
      case '2':
        return (
          adFormRoomCapacity.value === '1' || adFormRoomCapacity.value === '2'
        );
      case '3':
        return (
          adFormRoomCapacity.value === '1' ||
          adFormRoomCapacity.value === '2' ||
          adFormRoomCapacity.value === '3'
        );
      case '100':
        return adFormRoomCapacity.value === '0';
      default:
        return false;
    }
  };

  adFormRoomNumber.addEventListener('change', (evt) => {
    switch (evt.target.value) {
      case '1':
        adFormRoomCapacity.value = '1';
        break;
      case '2':
        if (
          adFormRoomCapacity.value !== '1' &&
          adFormRoomCapacity.value !== '2'
        ) {
          adFormRoomCapacity.value = '1';
        }
        break;
      case '3':
        if (
          adFormRoomCapacity.value !== '1' &&
          adFormRoomCapacity.value !== '2' &&
          adFormRoomCapacity.value !== '3'
        ) {
          adFormRoomCapacity.value = '1';
        }
        break;
      case '100':
        if (adFormRoomCapacity.value !== '0') {
          adFormRoomCapacity.value = '0';
        }
    }
  });

  const validateAdFormRoomType = (value) => {
    switch (value) {
      case 'bungalow':
        return adFormRoomPrice.value >= minPriceBungalow;
      case 'flat':
        return adFormRoomPrice.value >= minPriceFlat;
      case 'hotel':
        return adFormRoomPrice.value >= minPriceHotel;
      case 'house':
        return adFormRoomPrice.value >= minPriceHouse;
      case 'palace':
        return adFormRoomPrice.value >= minPricePalace;
      default:
        return false;
    }
  };

  pristine.addValidator(
    adFormTitle,
    validateAdFormTitle,
    'Введите от 30 до 100 символов'
  );

  pristine.addValidator(
    adFormRoomPrice,
    validateAdFormPrice,
    'Максимальная цена - 100000'
  );

  pristine.addValidator(
    adFormRoomNumber,
    validateAdFormRoomNumber,
    'Выберите подходящее количество человек'
  );

  pristine.addValidator(
    adFormRoomType,
    validateAdFormRoomType,
    'Введите подходящую стоимость'
  );

  adFormRoomPrice.addEventListener('change', () => {
    if (pristine) {
      pristine.validate();
    }
  });

  adFormRoomNumber.addEventListener('change', () => {
    if (pristine) {
      pristine.validate();
    }
  });

  adFormRoomCapacity.addEventListener('change', () => {
    if (pristine) {
      pristine.validate();
    }
  });

  const runValidator = () => pristine.validate();
  return { runValidator };
};

export { adFormInitializeValidation };
