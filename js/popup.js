import { isEscapeKey } from './utils.js';

const successPopupTemplate = document
  .querySelector('#success')
  .content.querySelector('.success');

const showSuccessPopup = () => {
  const successPopupElement = successPopupTemplate.cloneNode(true);
  const closePopup = (evt) => {
    if (isEscapeKey(evt)) {
      successPopupElement.remove();
      document.removeEventListener('keydown', closePopup);
    }
  };
  document.addEventListener('keydown', closePopup);
  document.body.append(successPopupElement);
};

const errorPopupTemplate = document
  .querySelector('#error')
  .content.querySelector('.error');

const showErrorPopup = () => {
  const errorPopupElement = errorPopupTemplate.cloneNode(true);
  const closePopupEsc = (evt) => {
    if (isEscapeKey(evt)) {
      errorPopupElement.remove();
      document.removeEventListener('keydown', closePopupEsc);
    }
  };
  const closeButtonClick = () => {
    errorPopupElement.remove();
    document.removeEventListener('click', closeButtonClick);
  };

  errorPopupElement
    .querySelector('.error__button')
    .addEventListener('click', closeButtonClick);
  document.addEventListener('keydown', closePopupEsc);

  document.body.append(errorPopupElement);
};

export { showSuccessPopup, showErrorPopup };
