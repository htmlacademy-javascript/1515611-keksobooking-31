import { TITLE, TYPE, DESCRIPTION, FEATURES, PHOTOS } from "./constants.js";

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === "Escape";

//Генерация массива из 10 объектов
let data = [];
const getRandomPhotos = () => {
  const randomPhotos = [];
  for (let i = 0; i < getRandomInteger(1, PHOTOS.length); i++) {
    randomPhotos.push(PHOTOS[i]);
  }
  return randomPhotos;
};

const getRandomFeatures = () => {
  const randomFeatures = [];
  for (let i = 0; i < getRandomInteger(1, FEATURES.length); i++) {
    randomFeatures.push(FEATURES[i]);
  }
  return randomFeatures;
};

const getAvatarNumber = () => {
  let num = getRandomInteger(0, 10);
  if (num < 10) {
    num = "0" + num;
    return num;
  }
};
const renderData = function () {
  for (let i = 0; i < 10; i++) {
    const lat = getRandomInteger(35.65, 35.7);
    const lng = getRandomInteger(139.7, 139.8);
    let objStructure = {
      author: {
        avatar: `img/avatars/user${getAvatarNumber()}.png`,
      },
      offer: {
        title: getRandomArrayElement(TITLE),
        address: `${lat},${lng}`,
        price: getRandomInteger(1, 10000000),
        type: getRandomArrayElement(TYPE),
        rooms: getRandomInteger(1, 10),
        quests: getRandomInteger(1, 5),
        checkin: getRandomArrayElement("12:00", "13:00", "14:00"),
        checkout: getRandomArrayElement("12:00", "13:00", "14:00"),
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
  console.log(data);
};

export { getRandomInteger, getRandomArrayElement, isEscapeKey, renderData };
