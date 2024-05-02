import { generateData } from './utils.js';
import { renderCard } from './ads.js';
// import {
//   activateAdForm,
//   deactivateAdForm,
//   activateFilterForm,
//   deactivateFilterForm,
// } from './form.js';
const data = generateData();
renderCard(data[0]);
// deactivateAdForm();
// deactivateFilterForm()
