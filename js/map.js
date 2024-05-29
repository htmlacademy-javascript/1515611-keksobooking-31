import { createCustomPopup } from './ads.js';
import { prepareFilterBookings } from './mapFilters.js';

const adFormAddress = document.querySelector('#address');
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 12;

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

let map;
let markers = [];
const renderBookings = (bookings) => {
  markers.forEach((marker) => {
    marker.remove();
  });
  markers = [];

  bookings.forEach((data) => {
    const pinIcon = L.icon({
      iconUrl: iconConfig.url,
      iconSize: [iconConfig.width, iconConfig.height],
      iconAnchor: [iconConfig.anchorX, iconConfig.anchorY],
    });

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

    markers.push(pinMarker);
  });
};

let mainPinMarker;
const loadMap = (allBookings, mapLoaded) => {
  map = L.map('map-canvas')
    .on('load', () => {
      mapLoaded();
    })
    .setView(TokyoCenter, ZOOM);

  L.tileLayer(TILE_LAYER, {
    attribution: COPYRIGHT,
  }).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: mainIconConfig.url,
    iconSize: [mainIconConfig.width, mainIconConfig.height],
    iconAnchor: [mainIconConfig.anchorX, mainIconConfig.anchorY],
  });

  mainPinMarker = L.marker(
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
    const coords = evt.target.getLatLng();
    adFormAddress.value = `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`;
  });

  mainPinMarker.addTo(map);

  renderBookings(allBookings);
  prepareFilterBookings(allBookings, renderBookings);
};

function closeMapPopup() {
  if (map) {
    map.closePopup();
  }
}

const resetMainMarker = () => {
  mainPinMarker.setLatLng(TokyoCenter);
};

export { loadMap, closeMapPopup, resetMainMarker };
