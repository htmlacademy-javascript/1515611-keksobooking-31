import { generateData } from './utils.js';
import { renderCards } from './ads.js';
import { activateAdForm, deactivateAdForm, activateFilterForm, deactivateFilterForm } from './form.js';
const data = generateData();
renderCards(data);
deactivateAdForm();
deactivateFilterForm()
