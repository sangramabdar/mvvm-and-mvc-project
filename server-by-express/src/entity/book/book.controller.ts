import { Request, Response } from "express";
import ResponseBuilder from "../../helper/responseBuilder";
import { BookService, BookServiceImpl } from "./book.service";
import { BookEntity } from "./book.repository";

class BookController {
  private static bookService: BookService = new BookServiceImpl();

  static async getBooks(httpRequest: Request, httpResponse: Response, next) {
    try {
      const result = await BookController.bookService.getAllEntities();
      let response = new ResponseBuilder<BookEntity[]>("", result);
      return httpResponse.json(response);
    } catch (error) {
      next(error);
    }
  }

  static async addBook(httpRequest: Request, httpResponse: Response, next) {
    try {
      const book = httpRequest.body;
      const result = await BookController.bookService.addEntity(book);
      let response = new ResponseBuilder<string>("", result);
      return httpResponse.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateBook(httpRequest: Request, httpResponse: Response, next) {
    try {
      const id = httpRequest.params["id"];
      const book: BookEntity = httpRequest.body;
      const result = await BookController.bookService.updateEntity(id, book);
      const response = new ResponseBuilder<string>("", result);
      return httpResponse.json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteBook(httpRequest: Request, httpResponse: Response, next) {
    try {
      const id = httpRequest.params["id"];
      const result = await BookController.bookService.deleteEntity(id);
      const response = new ResponseBuilder<string>("", result);
      return httpResponse.json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getBook(httpRequest: Request, httpResponse: Response, next) {
    try {
      const id = httpRequest.params["id"];
      const result = await BookController.bookService.getEntity(id);
      const response = new ResponseBuilder<Document>().setPayload(result);
      return httpResponse.json(response);
    } catch (error) {
      next(error);
    }
  }

  static async wrongRoute(httpRequest: Request, httpResponse: Response) {
    return httpResponse.status(404).json({ result: "wrong route" });
  }
}

export default BookController;
