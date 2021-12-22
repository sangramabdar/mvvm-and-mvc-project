import Result, { ResultType } from "../helper/result";
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

  async getBooks(): Promise<ResultType<BookEntity[]>> {
    try {
      let books = await this.#bookRepository.getAll();
      return Result("success", books);
    } catch (error: any) {
      return Result("failure", error.message);
    }
  }
}

export default BookService;
