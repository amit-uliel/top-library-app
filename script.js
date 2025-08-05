let library = [];

function Book(title, author, pages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.toggleIsReadStatus = function() {
    this.isRead = !this.isRead;
}

// function the add book to library array
function addBookToLibrary(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead);
    library.push(book);
    return book;
}

function text(text) {
    return document.createTextNode(text);
}

function createTd(node) {
    const td = document.createElement('td');
    td.appendChild(node);
    return td;
}

function clearTableBody() {
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}

function deleteBookFromLibrary(library, bookId) {
    return library.filter(book => book.id !== bookId);
}

function createButton(label, onClick) {
    const button = document.createElement('button');
    button.textContent = label;

    button.addEventListener('click', onClick);

    return button;
}

function handleDeleteClick(book) {
    library = deleteBookFromLibrary(library, book.id);
    clearTableBody();
    displayBooks(library);
}

function updateRow(oldTr, book) {
    const newTr = createBookTr(book);
    oldTr.replaceWith(newTr);
}

function getButtonConfigs(tr, book) {
    return [
        {
            label: book.isRead ? "Change, I didn't read it" : 'I read it',
            onClick: () => {
                book.toggleIsReadStatus();
                updateRow(tr, book);
            }
        },
        {
            label: 'Delete',
            onClick: () => handleDeleteClick(book)
        }
    ];
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

    values.forEach(value => tr.appendChild(createTd(text(value))));

    const buttonConfigs = getButtonConfigs(tr, book);
    buttonConfigs.forEach(({ label, onClick }) => tr.appendChild(createTd(createButton(label, onClick))));

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
