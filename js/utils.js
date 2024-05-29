import { TITLE, TYPE, DESCRIPTION, FEATURES, PHOTOS } from './constants.js';
const minNumber = 1;
const maxNumber = 10;
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const getRandomPhotos = () => {
  const randomPhotos = [];
  for (let i = 0; i < getRandomInteger(1, 2); i++) {
    randomPhotos.push(getRandomArrayElement(PHOTOS));
  }
  return randomPhotos;
};

const getRandomFeatures = () => {
  const randomFeatures = [];
  for (let i = 1; i < getRandomInteger(1, FEATURES.length); i++) {
    randomFeatures.push(FEATURES[i]);
  }
  return randomFeatures;
};

const getAvatarNumber = () => {
  let num = getRandomInteger(minNumber, maxNumber);
  num = String(num).padStart(2, '0');
  return num;
};

function getRandomElementsFromArray(arr, count) {
  const resultArray = [];
  while (resultArray.length < count) {
    resultArray.push(getRandomArrayElement(arr));
  }
  return resultArray;
}

function throttle(func, ms) {
  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {
    if (isThrottled) {
      // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments); // (1)

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

export {
  getRandomInteger,
  getRandomArrayElement,
  isEscapeKey,
  getRandomElementsFromArray,
  throttle,
};
