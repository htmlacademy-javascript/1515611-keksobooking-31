let pristine;
const adFormInitializeValidation = (form) => {
  const adFormTitle = document.querySelector('#title');
  const adFormRoomPrice = document.querySelector('#price');
  const adFormRoomNumber = document.querySelector('#room_number');
  const adFormRoomCapacity = document.querySelector('#capacity');
  const adFormRoomType = document.querySelector('#type');
  const adFormTimeIn = document.querySelector('#timein');
  const adFormTimeOut = document.querySelector('#timeout');

  const minTitleLength = 30;
  const maxTitleLength = 100;
  const maxPrice = 100000;
  const minPriceBungalow = 0;
  const minPriceFlat = 1000;
  const minPriceHotel = 3000;
  const minPriceHouse = 5000;
  const minPricePalace = 10000;

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
    'Выберите подходящую стоимость'
  );

  pristine.addValidator(
    adFormRoomType,
    validateAdFormRoomType,
    'Значение невалидно'
  );

  const runValidator = () => pristine.validate();
  return runValidator;
};

export { adFormInitializeValidation };
