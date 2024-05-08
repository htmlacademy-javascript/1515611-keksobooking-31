const offerTypeLocal = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const featureTypeLocal = {
  wifi: 'Wi-Fi',
  dishwasher: 'Посудомоечная машина',
  parking: 'Парковка',
  washer: 'Стиральная машина',
  elevator: 'Лифт',
  conditioner: 'Кондиционер',
};

const renderFeatures = (featuresListUl, features) => {
  features.forEach((featureType) => {
    const featureListItem = document.createElement('li');
    featureListItem.classList.add('popup-feature');
    featureListItem.classList.add(`popup-feature--${featureType}`);
    featureListItem.textContent = featureTypeLocal[featureType];
    featuresListUl.append(featureListItem);
  });
};

const renderPhoto = (photosElement, photo) => {
  photosElement.querySelector('img').src = photo;
};
const createCustomPopup = (data) => {
  const balloonTemplate = document
    .querySelector('#card')
    .content.querySelector('.popup');
  const popupElement = balloonTemplate.cloneNode(true);
  const author = data.author;
  const offer = data.offer;
  const capacityElement = popupElement.querySelector('.popup__text--capacity');
  const timeElement = popupElement.querySelector('.popup__text--time');
  const photosElement = popupElement.querySelector('.popup__photos');
  const featuresList = popupElement.querySelector('.popup__features');
  const descriptionElement = popupElement.querySelector('.popup__description');

  featuresList.innerHTML = '';
  if (offer.rooms && offer.guests) {
    capacityElement.textContent = `${offer.rooms} комнаты для ${offer.guests}`;
  } else {
    capacityElement.classList.add('visually-hidden');
  }
  if (offer.checkin && offer.checkout) {
    timeElement.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    timeElement.classList.add('visually-hidden');
  }
  if (offer.description) {
    descriptionElement.textContent = offer.description;
  } else {
    descriptionElement.classList.add('visually-hidden');
  }

  renderPhoto(photosElement, offer.photos[0]);
  renderFeatures(featuresList, offer.features);
  popupElement.querySelector('.popup__title').textContent = offer.title;
  popupElement.querySelector('.popup__text--address').textContent =
    offer.address;
  popupElement.querySelector(
    '.popup__text--price'
  ).textContent = `${offer.price}₽/ночь`;
  popupElement.querySelector('.popup__type').textContent =
    offerTypeLocal[offer.type];
  popupElement.querySelector('.popup__avatar').textContent = author.avatar;

  return popupElement;
};

export { createCustomPopup };
