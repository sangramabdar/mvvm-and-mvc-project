import { Request, Response } from "express";
import BookService from "./book.service";

class BookController {
  private static bookService: BookService = new BookService();

  static async getBooks(req: Request, res: Response) {
    const result = await BookController.bookService.getBooks();
    return res.json(result);
  }
}

export default BookController;
