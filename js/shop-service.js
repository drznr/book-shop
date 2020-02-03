'use strict';

const KEY = 'books';
var gBooks = _createBooks();
var gOnEdit = false;
var gCurrBook = null;



function sortBooks(sortBy) {
    switch (sortBy) {
        case 'Title':
            gBooks.sort(_dynamicSort('name'));
            break;
        case 'Price':
            gBooks.sort(_dynamicSort('price'));
            break;
        default:
            break;
    }
}

function getCurrBook() {
    return gCurrBook;
}
function updateBookRate(amount) {
    gCurrBook.rate += amount;
    saveToLocalStorage(KEY, gBooks);
}

function changeCurrBook(book) {
    gCurrBook = book;
}

function toggleEditMode(bookId) {
    if (!gOnEdit) gCurrBook = gBooks.find(book => book.id === bookId);
    else gCurrBook = null;
    gOnEdit = !gOnEdit;
}

function findBook(bookId) {
    return gBooks.find(book => book.id === bookId);
}

function AddBook(book) {
    if (gOnEdit) {
        var edittedBookIdx = gBooks.findIndex(book=> book.id === gCurrBook.id);
        gBooks[edittedBookIdx].price = book.price;
        saveToLocalStorage(KEY, gBooks);
    } else {
        var newBook = _createBook(book);
        gBooks.unshift(newBook);
        saveToLocalStorage(KEY, gBooks);
    }
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(book=> book.id === bookId);
    gBooks.splice(bookIdx, 1);
    saveToLocalStorage(KEY, gBooks);
}

function getBooksToDisplay() {
    return [...gBooks];
}
function _createBooks() {
    var books = getFromLocalStorage(KEY);
    if (books) return books;

    var books = [
        {name: 'The DaVinci Code', price: 60, img: 'https://s3.scoopwhoop.com/anj/book/d1342e0d-bd22-4e2a-8614-3489e295f589.jpg'},
        {name: 'The Hobbit', price: 70, img: 'https://imgix.bustle.com/uploads/image/2018/7/27/728f96bd-c52c-44f8-ae4e-a7514777a0e1-the-hobbit-big.jpg'},
        {name: 'The Hitchhiker\'s Guide To The Galaxy', price: 80, img: 'https://cdn.lifehack.org/wp-content/uploads/2015/03/h2g2-01-copy.png'}
    ];
    return books.map(_createBook);
}
function _createBook(book) {
    return {
        id: generatePass(5),
        name: book.name,
        price: book.price,
        img: book.img,
        rate: 0
    }
}