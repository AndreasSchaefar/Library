function Book(name, cover, description, author, status = false) {
    this.name = name;
    this.cover = cover;
    this.description = description;
    this.author = author;
    this.status = status;
}

function Library() {
    this.list = [];
}

Library.prototype.addBookToLibrary = function(book) {
    if (book.__proto__ === Book.prototype) {
        this.list.push(book);
        return true;
    }
    return false;
}

Library.prototype.removeBookFromLibrary = function(name) {
    let removeIndex = this.list.findIndex(book => book.name === name)
    this.list.splice(removeIndex, 1)
    return true;
}


let volumeOne = new Book("Volume 1", "none", "description",  "Maruyama Kugane");
let library = new Library();