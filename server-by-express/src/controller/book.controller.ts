import { Request, Response } from "express";

import ResponseBuilder from "../helper/result";
import { errorHandler } from "../helper/validation";
import { BookEntity } from "../Repository/bookRepository";
import BookService from "../service/book.service";

class BookController {
  private static bookService: BookService = new BookService();

  static async getBooks(httpRequest: Request, httpResponse: Response) {
    try {
      const result = await BookController.bookService.getBooks();
      let response = new ResponseBuilder<BookEntity[]>().setPayload(result);
      return httpResponse.json(response);
    } catch (error) {
      let response = new ResponseBuilder<string>(error.message);
      errorHandler(error, response, httpResponse);
      return httpResponse.json(response);
    }
  }
}

export default BookController;
