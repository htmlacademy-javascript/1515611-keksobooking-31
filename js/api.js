const fetchGetData = 'https://31.javascript.htmlacademy.pro/keksobooking/data';
const fetchPostData = 'https://31.javascript.htmlacademy.pro/keksobooking5';

const fetchBooks = (onSuccess, onError) => {
  fetch(fetchGetData)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
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
