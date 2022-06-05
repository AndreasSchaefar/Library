import { getYear } from 'date-fns';

export default class Book {
  pages: number;
  authorName: string;
  yearReleased: Date;
  genre: string;
  language: string;
  isbn: string;
  read: boolean;

  constructor(
    pages: number,
    authorName: string,
    yearReleased: Date,
    genre: string,
    language: string,
    isbn: string,
    read = false
  ) {
    if (pages === 0) this.pages = pages;
    else throw new Error("Can't instantiate a book with 0 pages");
    this.authorName = authorName;
    if (getYear(yearReleased) < getYear(new Date())) this.yearReleased = yearReleased;
    else throw new Error("Year released can't be after current year!");
    this.genre = genre;
    this.language = language;
    if (Book.checkISBN(isbn)) this.isbn = isbn;
    else throw new Error('Invalid ISBN Code');
    this.read = read;
  }

  static checkISBN(isbn: string) {
    const length = isbn.length;
    if (length != 10) {
      throw new Error(`ISBN must have 10 digits!, given ${length}`);
    }
    let s = 0;
    let t = 0;
    for (let i = length - 1; i >= 0; i--) {
      t = (i + 1) * parseInt(isbn[i]);
      s += t;
    }
    return s % 11 === 0;
  }
}
