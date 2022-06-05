import Book from './Book';

export default class Model {
  bookCatalogue: Map<string, Book>;

  constructor() {
    this.bookCatalogue = JSON.parse(localStorage.getItem('booksList')) || new Map();
  }

  createBook(title: string, bookProps: Book) {
    if (this.bookCatalogue.get(title)) return;
    this.bookCatalogue.set(title, bookProps);
    this.commit();
  }

  updateBook(title: string, props: Book) {
    if (this.bookCatalogue.get(title)) {
      this.bookCatalogue.set(title, props);
      this.commit();
    }
  }

  deleteBook(title: string) {
    this.bookCatalogue.delete(title);
    this.commit();
  }

  toggleBookFinished(title: string) {
    // TODO
    this.commit();
  }

  private commit() {
    localStorage.setItem('bookCatalogue', JSON.stringify(this.bookCatalogue));
  }
}
