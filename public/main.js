'use strict';

// const SERVER_URL = 'https://heroku-redis-tutorial.herokuapp.com/';

const setButton = document.getElementById('set');
const getButton = document.getElementById('get');
const setField = document.getElementById('setField');
const getField = document.getElementById('getField');
const setValue = document.getElementById('setValue');

function sendSet(key, value, callback) {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 400) {
      if (typeof callback === 'function') callback(xhr.responseText);
    }
  };

  xhr.open('GET', `/set?q=${key}&${value}`);
  xhr.send();
}

function sendGet(key, callback) {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 400) {
      if (typeof callback === 'function') callback(xhr.responseText);
    }
  };

  xhr.open('GET', `/get?q=${key}`);
  xhr.send();
}

setButton.addEventListener('click', () => {
  sendSet(setField.value, setValue.value, (value) => {
    document.getElementById('result').innerHTML = value;
  });
});
getButton.addEventListener('click', () => {
  sendGet(getField.value, (value) => {
    document.getElementById('result').innerHTML = value;
  });
});
