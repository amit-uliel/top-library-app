let library = [];

function Book(title, author, pages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.info = function() {
    let str = '';
    str += `${this.title} by ${this.author}, ${this.pages} pages, `;
    str += this.isRead ? 'read' : 'not read yet';
    return str;
}

// function the add book to library array
function addBookToLibrary(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead);
    library.push(book);
    return book;
}

// function to create <td> elements
function createTd(text, ) {
    const td = document.createElement('td');
    td.textContent = text;
    return td;
}

function createButtonTd(button) {
    const td = document.createElement('td');
    td.appendChild(button);
    return td;
}

function clearTableBody() {
    tbody.innerHTML = '';
}

function filterLibrary(library, bookId) {
    return library.filter(book => book.id !== bookId);
}

function createDeleteButton(bookId) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('data-id', bookId);

    deleteButton.addEventListener('click', () => {
        const bookId = deleteButton.dataset.id;
        library = filterLibrary(library, bookId);
        clearTableBody();
        displayBooks(library);
    });

    return deleteButton;
}

function createBookTr(book) {
    const tr = document.createElement('tr');

    const values = [
        book.id,
        book.title,
        book.author,
        book.pages,
        book.isRead ? '✅' : '❌',
    ];

    values.forEach(value => tr.appendChild(createTd(value)));
    tr.appendChild(createButtonTd(createDeleteButton(book.id)));

    return tr;
}

function displayBooks(library) {
    library.forEach(book => tbody.appendChild(createBookTr(book)));
}

function displayNewBook(book) {
    tbody.appendChild(createBookTr(book));
}

// get elements
const tbody = document.querySelector('tbody');
const button = document.querySelector('button');
const closeButton = document.querySelector('.dialog__close-dialog');
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');

// create books
addBookToLibrary("The Hunger Games", "Suzanne Collins", 374, true);
addBookToLibrary("The Witcher", "Andrzej Sapkowski", 295, false);
addBookToLibrary("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 309, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);

displayBooks(library);

// add event listener to button to show / close dialog
button.addEventListener('click', () => dialog.showModal());
closeButton.addEventListener('click', () => dialog.close());

// add event listener to form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const book = addBookToLibrary(formData.get('title'), formData.get('author'), formData.get('pages'), formData.get('isRead') === 'on');

    displayNewBook(book);
    dialog.close();
});
