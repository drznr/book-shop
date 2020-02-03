'use strict';

function onInit() {
    renderBooks();
}

function renderRate() {
    var book = getCurrBook();
    var elRate = document.querySelector('.rate');

    elRate.innerText = book.rate;
}

function renderBooks() {
    var books = getBooksToDisplay();
    var strHTML = '<table><thead><td>Id</td><td class="sorters" onclick="onSortTable(this.innerText)">Title</td><td class="sorters" onclick="onSortTable(this.innerText)">Price</td><td>Actions</td></thead><tbody>';
    strHTML += books.map((book, idx) => `
    <tr>
        <td>${idx}</td>
        <td>${book.name}</td>
        <td>${book.price}</td>
        <td>
            <table class="btns-table">
                <tbody>
                    <tr>
                        <td>
                            <button class="btn read" data-id="${book.id}" onclick="onInfoDisplay(this.dataset.id)">Read</button>
                        </td>
                        <td>
                            <button class="btn update" data-id="${book.id}" onclick="onUpdateBook(this.dataset.id)">Update</button>
                        </td>
                        <td>
                            <button class="btn delete" data-id="${book.id}" onclick="onRemoveBook(this.dataset.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </td>
    </tr>`).join('');

    strHTML += '</tbody></table>';
    var elBooksContainer = document.querySelector('.books-container');
    elBooksContainer.innerHTML = strHTML;
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}
function onFormToggle() {
    var elForm = document.querySelector('.form-container');
    elForm.classList.toggle('hide');
}
function onAddBook() {
    var elInputs = Array.from(document.querySelectorAll('.form-container input'));
    var bookObj = elInputs.reduce((acc, input) => {
        acc[input.dataset.key] = (input.dataset.key === 'price') ? +input.value : input.value;
        return acc;
    }, {});
    if (!gOnEdit && Object.values(bookObj).some(val => !val)) return;
    AddBook(bookObj);
    elInputs.forEach(elInput => {
        elInput.value = '';
    });
    if (gOnEdit) toggleEditMode();
    renderBooks();
}
function onUpdateBook(bookId) {
    var book = findBook(bookId);
    var elInput = document.querySelector('[data-key="price"]');
    var elForm = document.querySelector('.form-container');
    var elButton = document.querySelector('.add');

    if (elForm.classList.contains('hide')) elForm.classList.remove('hide');
    elInput.value = (gOnEdit) ? '' : book.price;
    elButton.innerText = (gOnEdit) ? 'Edit Book' : 'Add Book';
    toggleEditMode(bookId);
}
function onInfoDisplay(bookId) {
    var book = findBook(bookId);
    var elModal = document.querySelector('.modal');

    var strHTML = `
        <span class="close-modal" onclick="_closeModal()">X</span>
        <img src="${book.img}" />
        <p>${book.name}</p>
        <p>${book.price}.00$</p>
        <span onclick="onRateChange(-1)" class="rate-btn">-</span><span class="rate">${book.rate}</span><span onclick="onRateChange(1)" class="rate-btn">+</span>
    `;
    changeCurrBook(book);
    elModal.innerHTML = strHTML;
    elModal.classList.add('active');
}
function _closeModal() {
    document.querySelector('.modal').classList.remove('active');
    changeCurrBook(null);
}
function onRateChange(amount) {
    updateBookRate(amount);
    renderRate();
}
function onSortTable(sortBy) {
    sortBooks(sortBy);
    renderBooks();
}