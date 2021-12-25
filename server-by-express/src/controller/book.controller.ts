import { Request, Response } from "express";
import { DataBaseConnectionError } from "../helper/exceptions";
import ResponseBuilder from "../helper/result";
import { BookEntity } from "../Repository/bookRepository";
import BookService from "../service/book.service";

class BookController {
  private static bookService: BookService = new BookService();

  static async getBooks(req: Request, res: Response) {
    try {
      const result = await BookController.bookService.getBooks();
      let response = new ResponseBuilder<BookEntity[]>().setPayload(result);
      return res.json(response);
    } catch (error) {
      let response = new ResponseBuilder<string>().setError(error.message);
      if (error instanceof DataBaseConnectionError) {
        return res.status(500).json(response.setStatus(500));
      }
      return res.json(response);
    }
  }
}

export default BookController;
