import { generateData } from './utils.js';
import {
  activateAdForm,
  deactivateAdForm,
  activateFilterForm,
  deactivateFilterForm,
} from './form.js';
import { loadMap } from './map.js';

const data = generateData();

deactivateAdForm();
deactivateFilterForm();

loadMap(() => {
  activateAdForm();
  activateFilterForm();
});
