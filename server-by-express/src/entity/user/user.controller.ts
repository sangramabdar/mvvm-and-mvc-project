import { Request, Response } from "express";

import { Document } from "mongodb";
import ResponseBuilder from "../../helper/result";
import { statusCodeHandler } from "../../helper/validation";
import { UserEntity } from "./user.repository";
import { UserService, UserServiceImpl } from "./user.service";

class UserController {
  static userService: UserService = new UserServiceImpl();

  static async getUsers(httpRequest: Request, httpResponse: Response) {
    try {
      const result = await UserController.userService.getAllEntities();
      let response = new ResponseBuilder<UserEntity[]>("", result);
      return httpResponse.json(response);
    } catch (error) {
      let response = new ResponseBuilder<string>(error.message);
      statusCodeHandler(error, response, httpResponse);
      return httpResponse.json(response);
    }
  }

  static async addUser(httpRequest: Request, httpResponse: Response) {
    try {
      const user: UserEntity = httpRequest.body;
      const result = await UserController.userService.addEntity(user);
      let response = new ResponseBuilder<string>("", result);
      return httpResponse.status(201).json(response);
    } catch (error) {
      let response = new ResponseBuilder<string>(error.message);
      statusCodeHandler(error, response, httpResponse);
      return httpResponse.json(response);
    }
  }

  static async updateUser(httpRequest: Request, httpResponse: Response) {
    try {
      const id = httpRequest.params["id"];
      const user: UserEntity = httpRequest.body;
      const result = await UserController.userService.updateEntity(id, user);
      const response = new ResponseBuilder<string>("", result);
      return httpResponse.json(response);
    } catch (error) {
      let response = new ResponseBuilder<string>(error.message);
      statusCodeHandler(error, response, httpResponse);
      return httpResponse.json(response);
    }
  }

  static async deleteUser(httpRequest: Request, httpResponse: Response) {
    try {
      const id = httpRequest.params["id"];
      const result = await UserController.userService.deleteEntity(id);
      const response = new ResponseBuilder<string>("", result);
      return httpResponse.json(response);
    } catch (error) {
      let response = new ResponseBuilder<string>(error.message);
      statusCodeHandler(error, response, httpResponse);
      return httpResponse.json(response);
    }
  }

  static async getUser(httpRequest: Request, httpResponse: Response) {
    try {
      const id = httpRequest.params["id"];
      console.log(id);
      const result = await UserController.userService.getEntity(id);
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

export { UserController };
