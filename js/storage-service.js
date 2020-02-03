'use strict';

function saveToLocalStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
}
function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}