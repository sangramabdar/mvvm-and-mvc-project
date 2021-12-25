import Database from "../config/db";
import { DataBaseConnectionError } from "../helper/exceptions";
import {
  BookEntity,
  BookRepository,
  BookRepositoryImpl,
} from "../Repository/bookRepository";

class BookService {
  #bookRepository: BookRepository;

  constructor() {
    this.#bookRepository = new BookRepositoryImpl();
  }

  async getBooks(): Promise<BookEntity[]> {
    let db = await Database.getDb();
    if (!db) {
      throw new DataBaseConnectionError();
    }
    let books = await this.#bookRepository.getAll(db);
    return books;
  }
}

export default BookService;
