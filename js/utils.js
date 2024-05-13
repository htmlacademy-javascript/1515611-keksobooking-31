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
const generateData = function () {
  const TokyoLatMin = 35.454216;
  const TokyoLatMax = 35.914216;

  const TokyoLngMin = 139.333615;
  const TokyoLngMax = 139.853615;

  const data = [];
  for (let i = minNumber; i < maxNumber; i++) {
    const lat = Math.random() * (TokyoLatMax - TokyoLatMin) + TokyoLatMin;
    const lng = Math.random() * (TokyoLngMax - TokyoLngMin) + TokyoLngMin;
    const objStructure = {
      author: {
        avatar: `img/avatars/user${getAvatarNumber()}.png`,
      },
      offer: {
        title: getRandomArrayElement(TITLE),
        address: `${lat.toFixed(5)},${lng.toFixed(5)}`,
        price: getRandomInteger(1, 10000),
        type: getRandomArrayElement(TYPE),
        rooms: getRandomInteger(minNumber, maxNumber),
        guests: getRandomInteger(1, 5),
        checkin: getRandomArrayElement(['12:00', '13:00', '14:00']),
        checkout: getRandomArrayElement(['12:00', '13:00', '14:00']),
        features: getRandomFeatures(),
        description: getRandomArrayElement(DESCRIPTION),
        photos: getRandomPhotos(),
      },
      location: {
        lat,
        lng,
      },
    };
    data.push(objStructure);
  }
  return data;
};

export { getRandomInteger, getRandomArrayElement, isEscapeKey, generateData };
