class Book {
    constructor(name, cover, author, status = false) {
        this.name = name;
        this.cover = cover;
        this.author = author;
        this.status = status;
    }

    createBookElement() {
        let bookComponent = document.createElement("div");
        let bookCover = document.createElement("div");
        let coverImg = document.createElement("img");
        let bookInfo = document.createElement("div");
        let bookName = document.createElement("div");
        let bookAuthor = document.createElement("div");

        // Setting properties

        bookComponent.className = "book";
        bookCover.className = "book__cover";
        coverImg.src = this.cover;
        bookInfo.className = "book__info";
        bookName.className = "book__name";
        bookName.textContent = this.name;
        bookAuthor.className = "book__author";
        bookAuthor.textContent = this.author;

        // Nesting

        bookInfo.appendChild(bookName);
        bookInfo.appendChild(bookAuthor);

        bookCover.appendChild(coverImg);

        bookComponent.appendChild(bookCover);
        bookComponent.appendChild(bookInfo);

        return bookComponent;
    }
}

class Library {
    constructor() {
        this.library = [];
    }
    addBookToLibrary(book) {
        if (book.__proto__ === Book.prototype) {
            this.library.push(book);
            return true;
        }
        return false;
    }
    removeBookFromLibrary(name) {
        let removeIndex = this.library.findIndex((book) => book.name === name);
        this.library.splice(removeIndex, 1);
        return true;
    }

    showBooks() {
        this.library.forEach((book) => {
            booksGrid.appendChild(book.createBookElement());
        });
    }
}

let library = new Library();

const booksGrid = document.querySelector(".books");
const addBookButton = document.querySelector("[data-add-book]");
const removeBookButton = document.querySelector("[data-remove-book]");

const addModalElement = document.querySelector("#addModal");
const addModalCloseButton = document.querySelector(".close-button");
const modalForm = document.querySelector("#add-book-form");
const submitBtn = document.querySelector(".submit-btn");

addBookButton.onclick = () => {
    addModalElement.style.display = "block";
};

addModalCloseButton.onclick = () => {
    addModalElement.style.display = "none";
};

function removeFormValues(...inputFields) {
    inputFields.forEach((input) => {
        if (input.type !== "checkbox") {
            input.value = "";
        }
    });
}

function checkIfAllValid(...inputs) {
    return inputs.every((input) => input.value);
}

submitBtn.onclick = (e) => {
    e.preventDefault();
    let bookName = document.querySelector("#bookName"),
        bookAuthor = document.querySelector("#bookAuthor"),
        read = document.querySelector("#read");

    if (checkIfAllValid(bookName, bookAuthor, read)) {
        let bookObj = new Book(
            bookName.value,
            (cover = "images/base-cover.jpg"),
            bookAuthor.value,
            read.value
        );
        library.addBookToLibrary(bookObj);

        while (booksGrid.firstChild) {
            booksGrid.removeChild(booksGrid.lastChild);
        }

        removeFormValues(bookName, bookAuthor, read);
        library.showBooks();
        addModalElement.style.display = "none";
    } else {
        alert("YOU'RE DUMB!!!");
    }
};
