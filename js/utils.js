'use strict';

function generatePass(passLength) {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var pass = '';

    for (let i = 0; i < passLength; i++) {
        pass += characters.charAt(Math.round(Math.random() * characters.length));
    }
    return pass;
}

function _dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
function formatCurrency(num, lang) {
    var format = (lang === 'en') ? 'en-US' : 'he-IL';
    var currency = (lang === 'en') ? 'USD' : 'ILS';
    num = (lang === 'en') ? num : num * 3.5;
    
   
    return new Intl.NumberFormat(format,{ style: 'currency', currency: currency }).format(num);
}