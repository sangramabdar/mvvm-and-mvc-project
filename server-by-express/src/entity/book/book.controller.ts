import { Request, Response } from "express";
import ResponseBuilder from "../../helper/result";
import { statusCodeHandler } from "../../helper/validation";
import { BookService, BookServiceImpl } from "./book.service";
import { BookEntity } from "./book.repository";

class BookController {
  private static bookService: BookService = new BookServiceImpl();

  static async getBooks(httpRequest: Request, httpResponse: Response) {
    try {
      const result = await BookController.bookService.getAllEntities();
      let response = new ResponseBuilder<BookEntity[]>("", result);
      return httpResponse.json(response);
    } catch (error) {
      let response = new ResponseBuilder<string>(error.message);
      statusCodeHandler(error, response, httpResponse);
      return httpResponse.json(response);
    }
  }

  static async addBook(httpRequest: Request, httpResponse: Response) {
    try {
      const Book: BookEntity = httpRequest.body;
      const result = await BookController.bookService.addEntity(Book);
      let response = new ResponseBuilder<string>("", result);
      return httpResponse.status(201).json(response);
    } catch (error) {
      let response = new ResponseBuilder<string>(error.message);
      statusCodeHandler(error, response, httpResponse);
      return httpResponse.json(response);
    }
  }

  static async updateBook(httpRequest: Request, httpResponse: Response) {
    try {
      const id = httpRequest.params["id"];
      const book: BookEntity = httpRequest.body;
      const result = await BookController.bookService.updateEntity(id, book);
      const response = new ResponseBuilder<string>("", result);
      return httpResponse.json(response);
    } catch (error) {
      let response = new ResponseBuilder<string>(error.message);
      statusCodeHandler(error, response, httpResponse);
      return httpResponse.json(response);
    }
  }

  static async deleteBook(httpRequest: Request, httpResponse: Response) {
    try {
      const id = httpRequest.params["id"];
      const result = await BookController.bookService.deleteEntity(id);
      const response = new ResponseBuilder<string>("", result);
      return httpResponse.json(response);
    } catch (error) {
      let response = new ResponseBuilder<string>(error.message);
      statusCodeHandler(error, response, httpResponse);
      return httpResponse.json(response);
    }
  }

  static async getBook(httpRequest: Request, httpResponse: Response) {
    try {
      const id = httpRequest.params["id"];
      const result = await BookController.bookService.getEntity(id);
      const response = new ResponseBuilder<Document>().setPayload(result);
      return httpResponse.json(response);
    } catch (error) {
      let response = new ResponseBuilder<string>(error.message);
      statusCodeHandler(error, response, httpResponse);
      return httpResponse.json(response);
    }
  }

  static async wrongRoute(httpRequest: Request, httpResponse: Response) {
    return httpResponse.status(404).json({ result: "wrong route" });
  }
}

export default BookController;
