import { Request, Response } from "express";
import BookService from "../service/book.service";

class BookController {
  private static bookService: BookService = new BookService();

  static async getBooks(req: Request, res: Response) {
    try {
      const result = await BookController.bookService.getBooks();
      return res.json(result);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

export default BookController;
