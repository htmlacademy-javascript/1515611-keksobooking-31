const fetchBooks = (onSuccess, onError) => {
  fetch('https://31.javascript.htmlacademy.pro/keksobooking/data', {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch((err) => onError(err));
};

export { fetchBooks };
