function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function() {
        let str = '';
        str += `${this.title} by ${this.author}, ${this.pages} pages, `;
        str += this.isRead ? 'read' : 'not read yet';
        return str;
    };
}

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
console.log(book1.info());
