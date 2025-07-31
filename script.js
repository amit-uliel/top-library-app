const books = [];

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

function addBookToLibrary(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead);
    books.push(book);
}

const book1 = addBookToLibrary("The Hunger Games", "Suzanne Collins", 374, true);
const book2 = addBookToLibrary("The Witcher", "Andrzej Sapkowski", 295, false);
const book3 = addBookToLibrary("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 309, true);
const book4 = addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);

const tbody = document.querySelector('tbody');

for (const book of books) {
    const tr = document.createElement('tr');

    const id = document.createElement('td');
    id.textContent = book.id;

    const title = document.createElement('td');
    title.textContent = book.title;

    const author = document.createElement('td');
    author.textContent = book.author;

    const pages = document.createElement('td');
    pages.textContent = book.pages;

    const isRead = document.createElement('td');
    isRead.textContent = book.isRead ? '✅' : '❌';

    tr.appendChild(id);
    tr.appendChild(title);
    tr.appendChild(author);
    tr.appendChild(pages);
    tr.appendChild(isRead);

    tbody.appendChild(tr);
}
