'use strict';

var gTrans = {
    title: {
        en: 'Welcome to my bookshop',
        he: 'ברוכים הבאים לחנות הספרים שלי'
    },
    bookId: {
        en: 'Id',
        he: 'מס\''
    },
    bookName: {
        en: 'Title',
        he: 'שם הספר'
    },
    bookPrice: {
        en: 'Price',
        he: 'מחיר'
    },
    bookActions: {
        en: 'Actions',
        he: 'פעולות'
    },
    btnRead: {
        en: 'Read',
        he: 'קרא'
    },
    btnUpdate: {
        en: 'Update',
        he: 'עדכן'
    },
    btnDelete: {
        en: 'Delete',
        he: 'הסר'
    },
    btnAdd: {
        en: 'Add Book',
        he: 'הוסף ספר'
    },
    bookTitlePlaceholder: {
        en: 'Title',
        he: 'שם הספר'
    },
    bookPricePlaceholder: {
        en: 'Price',
        he: 'מחיר'
    },
    bookImgPlaceholder: {
        en: 'Image Url',
        he: 'קישור לתמונה'
    },
    btnPlus: {
        en: 'Add a new book',
        he: 'הוסף ספר'
    },
    btnPrev: {
        en: 'Prev Page',
        he: 'לדף הקודם'
    },
    btnNext: {
        en: 'Next Page',
        he: 'לדף הבא'
    }
};
var gCurrLang = 'en';



function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    els.forEach(el => {
        var txt = getTrans(el.dataset.trans);

        if (el.placeholder) el.placeholder = txt;
        else if (el.title) el.title = txt;
        else el.innerText = txt;
    })
}
function getTrans(transKey) {
    var langMap = gTrans[transKey];

    if (!langMap) return 'UNKNOWN';
    var txt = langMap[gCurrLang];

    if (!txt) txt = langMap['en'];
    return txt;
}
function setLang(lang) {
    gCurrLang = lang;
}
function getCurrLang() {
    return gCurrLang;
}