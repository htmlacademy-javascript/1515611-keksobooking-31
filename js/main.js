import { generateData } from "./utils.js";
import { renderCards } from "./ads.js";
import { formInactive } from "./form.js";
const data = generateData();
renderCards(data);

formInactive();
