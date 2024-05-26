import { fetchBooks } from './api.js';
import {
  activateAdForm,
  deactivateAdForm,
  activateFilterForm,
  deactivateFilterForm,
} from './form.js';
import { loadMap } from './map.js';

deactivateAdForm();
deactivateFilterForm();

fetchBooks(
  (data) => {
    loadMap(data, () => {
      activateAdForm();
      activateFilterForm();
    });
  },
  (err) => {
    console.error(err);
  }
);
