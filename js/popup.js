import { isEscapeKey } from './utils.js';

const successPopupTemplate = document
  .querySelector('#success')
  .content.querySelector('.success');

const showSuccessPopup = () => {
  const successPopupElement = successPopupTemplate.cloneNode(true);
  const closePopupEsc = (evt) => {
    if (isEscapeKey(evt)) {
      successPopupElement.remove();
      document.removeEventListener('keydown', closePopupEsc);
    }
  };
  const closePopupClick = () => {
    successPopupElement.remove();
    document.removeEventListener('keydown', closePopupEsc);
  };
  document.addEventListener('keydown', closePopupEsc);
  document.addEventListener('click', closePopupClick);
  document.body.append(successPopupElement);
  successPopupElement.addEventListener('click', closePopupClick);
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
  const closePopupClick = () => {
    errorPopupElement.remove();
    document.removeEventListener('keydown', closePopupEsc);
  };

  errorPopupElement
    .querySelector('.error__button')
    .addEventListener('click', closePopupClick);
  document.addEventListener('click', closePopupClick);
  document.addEventListener('keydown', closePopupEsc);
  document.body.append(errorPopupElement);
  successPopupElement.addEventListener('click', closePopupClick);
};

export { showSuccessPopup, showErrorPopup };
