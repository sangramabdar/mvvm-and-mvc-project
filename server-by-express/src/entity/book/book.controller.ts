import { Request, Response } from "express";
import ResponseBuilder from "../../helper/responseBuilder";
import { BookService, BookServiceImpl } from "./book.service";
import { BookEntity } from "./book.repository";

class BookController {
  private static bookService: BookService = new BookServiceImpl();

  static async getBooks(request: Request, response: Response, next) {
    try {
      const result = await BookController.bookService.getAllEntities();
      let responseBody = new ResponseBuilder<BookEntity[]>("", result);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async addBook(request: Request, response: Response, next) {
    try {
      const book = request.body;
      const result = await BookController.bookService.addEntity(book);
      let responseBody = new ResponseBuilder<string>("", result);
      return response.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async updateBook(request: Request, response: Response, next) {
    try {
      const id = request.params["id"];
      const book: BookEntity = request.body;
      const result = await BookController.bookService.updateEntity(id, book);
      const responseBody = new ResponseBuilder<string>("", result);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async deleteBook(request: Request, response: Response, next) {
    try {
      const id = request.params["id"];
      const result = await BookController.bookService.deleteEntity(id);
      const responseBody = new ResponseBuilder<string>("", result);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async getBook(request: Request, response: Response, next) {
    try {
      const id = request.params["id"];
      const result = await BookController.bookService.getEntity(id);
      const responseBody = new ResponseBuilder<Document>().setPayload(result);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async wrongRoute(request: Request, response: Response) {
    console.log("wrong");
    return response.status(404).json({ result: "wrong route" });
  }
}

export default BookController;
