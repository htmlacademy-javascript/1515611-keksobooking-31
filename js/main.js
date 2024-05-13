import { generateData } from './utils.js';
import {
  activateAdForm,
  deactivateAdForm,
  activateFilterForm,
  deactivateFilterForm,
} from './form.js';
import { loadMap } from './map.js';
import { fetchBooks } from './api';

const data = generateData();

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
