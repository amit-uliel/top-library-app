const library = [];

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
function createTd(text) {
    const td = document.createElement('td');
    td.textContent = text;
    return td;
}

function addBookRow(book) {
    const tr = document.createElement('tr');

    const values = [
        book.id,
        book.title,
        book.author,
        book.pages,
        book.isRead ? '✅' : '❌',
    ];

    values.forEach(value => tr.appendChild(createTd(value)));

    return tr;
}

function displayBooks() {
    library.forEach(book => tbody.appendChild(addBookRow(book)));
}

function displayNewBook(book) {
    tbody.appendChild(addBookRow(book));
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

displayBooks();

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
