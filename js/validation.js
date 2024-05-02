let pristine;
const adFormInitializeValidation = (form) => {
  const adFormTitle = document.querySelector('#title');
  const adFormRoomPrice = document.querySelector('#price');
  const adFormRoomNumber = document.querySelector('#room_number');
  const adFormRoomCapacity = document.querySelector('#capacity');
  const adFormRoomType = document.querySelector('#type');
  const adFormCheckIn = document.querySelector('#timein');
  const adFormCheckOut = document.querySelector('#timeout');

  pristine = new Pristine(form, {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    errorTextParent: 'ad-form__element',
  });

  const validateAdFormTitle = (value) =>
    value.length >= 30 && value.length <= 100;

  const validateAdFormPrice = (value) => +value <= 100000;

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

  const validateAdFormRoomType = (value) => {
    switch (value) {
      case 'bungalow':
        return adFormRoomPrice.value >= 0;
      case 'flat':
        return adFormRoomPrice.value >= 1000;
      case 'hotel':
        return adFormRoomPrice.value >= 3000;
      case 'house':
        return adFormRoomPrice.value >= 5000;
      case 'palace':
        return adFormRoomPrice.value >= 10000;
      default:
        return false;
    }
  };

  const validateCheckInOut = (value) => {
    switch (value) {
      case '12:00':
        return adFormCheckOut.value === '12:00';
      case '13:00':
        return adFormCheckOut.value === '13:00';
      case '14:00':
        return adFormCheckOut.value === '14:00';
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

  pristine.addValidator(adFormRoomType, validateAdFormRoomType, '');
  pristine.addValidator(
    adFormCheckIn,
    validateCheckInOut,
    'Время заезда и выезда не совпадают'
  );

  const runValidator = () => pristine.validate();
  return runValidator;
};

export { adFormInitializeValidation };
