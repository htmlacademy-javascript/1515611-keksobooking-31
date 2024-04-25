const form = document.querySelector(".ad-form");
const formHeader = document.querySelector(".ad-form-header");
const adName = document.querySelectorAll(".ad-form__element");
const filterForm = document.querySelector(".map__filters");
const mapFilters = document.querySelectorAll(".map__filters");
const mapFeatures = document.querySelector(".map__features");

const formInactive = () => {
  form.classList.add("add-form--disabled");
  formHeader.classList.add("disabled");
  adName.classList.add("disabled");
  filterForm.classList.add("add-form--disabled");
  mapFilters.classList.add("disabled");
  mapFeatures.classList.add(".disabled");
};

export { formInactive };
