import { generateData } from './utils.js';
import { createCustomPopup } from './ads.js';
const adFormAddress = document.querySelector('#address');
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 10;

const iconConfig = {
  url: './img/pin.svg',
  width: 40,
  height: 40,
  anchorX: 26,
  anchorY: 52,
};

const mainIconConfig = {
  url: './img/main-pin.svg',
  width: 52,
  height: 52,
  anchorX: 26,
  anchorY: 52,
};
const TokyoCenter = {
  lat: 35.684216,
  lng: 139.753615,
};

const startCoordinate = {
  lat: 35.684216,
  lng: 139.753615,
};

const resetButton = document.querySelector('.ad-form__reset');

function loadMap(mapLoaded) {
  const map = L.map('map-canvas')
    .on('load', () => {
      mapLoaded();
    })
    .setView(TokyoCenter, ZOOM);

  L.tileLayer(TILE_LAYER, {
    attribution: COPYRIGHT,
  }).addTo(map);

  const pinIcon = L.icon({
    iconUrl: iconConfig.url,
    iconSize: [iconConfig.width, iconConfig.height],
    iconAnchor: [iconConfig.anchorX, iconConfig.anchorY],
  });

  const mainPinIcon = L.icon({
    iconUrl: mainIconConfig.url,
    iconSize: [mainIconConfig.width, mainIconConfig.height],
    iconAnchor: [mainIconConfig.anchorX, mainIconConfig.anchorY],
  });

  generateData().forEach((data) => {
    const pinMarker = L.marker(
      {
        lat: data.location.lat,
        lng: data.location.lng,
      },
      {
        draggable: true,
        icon: pinIcon,
      }
    );

    pinMarker.on('moveend', (evt) => {
      console.log(evt.target.getLatLng());
    });

    const popupElement = createCustomPopup(data);
    pinMarker.addTo(map).bindPopup(popupElement);
  });

  const mainPinMarker = L.marker(
    {
      lat: 35.684216,
      lng: 139.753615,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    }
  );

  mainPinMarker.on('moveend', (evt) => {
    adFormAddress.value = evt.target.getLatLng();
  });

  mainPinMarker.addTo(map);

  resetButton.addEventListener('click', () => {
    pinMarker.setLatLng(startCoordinate);
    map.setView(startCoordinate, ZOOM);
  });
}

export { loadMap };
