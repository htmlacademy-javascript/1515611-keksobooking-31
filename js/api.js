import { getRandomElementsFromArray } from './utils.js';

const fetchGetData = 'https://31.javascript.htmlacademy.pro/keksobooking/data';
const fetchPostData = 'https://31.javascript.htmlacademy.pro/keksobooking';

const fetchBooks = (onSuccess, onError) => {
  fetch(fetchGetData)
    .then((response) => response.json())
    .then((data) => onSuccess(getRandomElementsFromArray(data, 10)))
    .catch((err) => onError(err));
};

const sendNewBook = (data, onSuccess, onError) => {
  fetch(fetchPostData, {
    method: 'POST',
    body: data,
  })
    .then((response) => {
      if (response.status !== 200) {
        throw response.status;
      }
      onSuccess();
    })
    .catch((err) => onError(err));
};

export { fetchBooks, sendNewBook };
