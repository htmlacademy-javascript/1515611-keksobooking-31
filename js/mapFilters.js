import { throttle } from './utils';

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelector('#housing-features');

const filterWifi = document.querySelector('#filter-wifi');
const filterDishwasher = document.querySelector('#filter-dishwasher');
const filterConditioner = document.querySelector('#filter-conditioner');
const filterWasher = document.querySelector('#filter-washer');
const filterParking = document.querySelector('#filter-parking');
const filterElevator = document.querySelector('#filter-elevator');

const prepareFilterBookings = (allBookings, renderBookings) => {
  const filterBookings = () => {
    let filteredBookings = allBookings
      .filter((book) =>
        housingType.value !== 'any'
          ? book.offer.type === housingType.value
          : true
      )
      .filter((book) => {
        switch (housingPrice.value) {
          case 'low':
            return book.offer.price < 10000;
          case 'middle':
            return book.offer.price >= 10000 && book.offer.price <= 50000;
          case 'high':
            return book.offer.price > 50000;
          default:
            return true;
        }
      })
      .filter((book) => {
        return housingRooms.value !== 'any'
          ? String(book.offer.rooms) === housingRooms.value
          : true;
      })
      .filter((book) =>
        housingGuests.value !== 'any'
          ? String(book.offer.guests) === housingGuests.value
          : true
      );

    if (
      filterWifi.checked ||
      filterWasher.checked ||
      filterConditioner.checked ||
      filterParking.checked ||
      filterDishwasher.checked ||
      filterElevator.checked
    ) {
      console.log(filteredBookings);
      filteredBookings = filteredBookings
        .filter((book) =>
          filterWifi.checked && book.offer.features
            ? book.offer.features.includes('wifi')
            : true
        )
        .filter((book) =>
          filterWasher.checked && book.offer.features
            ? book.offer.features.includes('washer')
            : true
        )
        .filter((book) =>
          filterConditioner.checked && book.offer.features
            ? book.offer.features.includes('conditioner')
            : true
        )
        .filter((book) =>
          filterParking.checked && book.offer.features
            ? book.offer.features.includes('parking')
            : true
        )
        .filter((book) =>
          filterDishwasher.checked && book.offer.features
            ? book.offer.features.includes('dishwasher')
            : true
        )
        .filter((book) =>
          filterElevator.checked && book.offer.features
            ? book.offer.features.includes('elevator')
            : true
        );
    }

    renderBookings(filteredBookings);
  };

  const throttleFilters = throttle(filterBookings, 500);

  housingType.addEventListener('change', () => {
    throttleFilters();
  });
  housingPrice.addEventListener('change', () => {
    throttleFilters();
  });
  housingRooms.addEventListener('change', () => {
    throttleFilters();
  });
  housingGuests.addEventListener('change', () => {
    throttleFilters();
  });
  housingFeatures.addEventListener('change', () => {
    throttleFilters();
  });
};

export { prepareFilterBookings };
