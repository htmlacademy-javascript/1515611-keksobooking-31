const mapBlock = document.querySelector('#map-canvas');
const adTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');

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

const renderCard = (data) => {
  const cardsListFragment = document.createDocumentFragment();

  const { author, offer } = data;

  const cardElement = adTemplate.cloneNode(true);
  const capacityElement = cardElement.querySelector('.popup__text--capacity');
  if (offer.rooms && offer.guests) {
    capacityElement.textContent = `${offer.rooms} комнаты для ${offer.guests}`;
  } else {
    capacityElement.classList.add('visually-hidden');
  }

  const timeElement = cardElement.querySelector('.popup__text--time');
  if (offer.checkin && offer.checkout) {
    timeElement.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    timeElement.classList.add('visually-hidden');
  }

  const descriptionElement = cardElement.querySelector('.popup__description');
  if (offer.description) {
    descriptionElement.textContent = offer.description;
  } else {
    descriptionElement.classList.add('visually-hidden');
  }

  const photosElement = cardElement.querySelector('.popup__photos');
  renderPhoto(photosElement, offer.photos[0]);

  const featuresList = cardElement.querySelector('.popup__features');
  featuresList.innerHTML = '';

  renderFeatures(featuresList, offer.features);
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent =
    offer.address;
  cardElement.querySelector(
    '.popup__text--price'
  ).textContent = `${offer.price}₽/ночь`;
  cardElement.querySelector('.popup__type').textContent =
    offerTypeLocal[offer.type];

  cardElement.querySelector('.popup__avatar').textContent = author.avatar;

  cardsListFragment.appendChild(cardElement);

  mapBlock.appendChild(cardsListFragment);
};

export { renderCard };
