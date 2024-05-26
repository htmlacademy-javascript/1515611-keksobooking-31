const minTitleLength = 30;
const maxTitleLength = 100;
const maxPrice = 100000;
const minPriceBungalow = 0;
const minPriceFlat = 1000;
const minPriceHotel = 3000;
const minPriceHouse = 5000;
const minPricePalace = 10000;
const pricePerNight = 100000;

const TITLE = [
  'Замечательная квартира в центре Токио',
  'Если важен покой и уют',
  'Местечко в центре',
  'Дом с террасой и балконом',
  'Апартаменты в пяти минутах от центра',
  'Токио как на ладони',
  'Живописный вид и чистый воздух',
  'Виды на гору Фудзи',
  'Просторные апартаменты для семьи',
  'Капсульный хостел для студентов',
];

const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const FEATURES = [
  'map',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION = [
  'Жилье,которое запомнится надолго',
  'В апартаментах есть всё необходимое для беззаботного отдыха',
  'Вам обязательно захочется сюда вернуться',
  'Жилье для тех, кто хочет увидеть Японию изнутри',
  'Одно из самых популярных мест согласно отзывам Кекстабукеров',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

export {
  TITLE,
  TYPE,
  FEATURES,
  DESCRIPTION,
  PHOTOS,
  minTitleLength,
  maxTitleLength,
  maxPrice,
  minPriceBungalow,
  minPriceFlat,
  minPriceHotel,
  minPriceHouse,
  minPricePalace,
  pricePerNight,
};
