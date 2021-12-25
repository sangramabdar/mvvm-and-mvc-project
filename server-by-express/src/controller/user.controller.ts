import { Request, Response } from "express";

import { Document } from "mongodb";

import ResponseBuilder from "../helper/result";
import { statusCodeHandler } from "../helper/validation";

import { UserEntity } from "../Repository/userRepository";
import UserService from "../service/user.service";

class UserController {
  static userService: UserService = new UserService();

  static async getUsers(httpRequest: Request, httpResponse: Response) {
    try {
      const result = await UserController.userService.getUsers();
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
      const result = await UserController.userService.addUser(user);
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
      const { id, value } = httpRequest.body;
      const result = await UserController.userService.updateUser(id, value);
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
      const id = httpRequest.body.id;
      const result = await UserController.userService.deleteUser(id);
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
      const id = httpRequest.body.id;
      const result = await UserController.userService.getUser(id);
      const response = new ResponseBuilder<Document>().setPayload(result);
      return httpResponse.json(response);
    } catch (error) {
      let response = new ResponseBuilder<string>(error.message);
      statusCodeHandler(error, response, httpResponse);
      return httpResponse.json(response);
    }
  }

  static async wrongRoute(httpRequest: Request, httpResponse: Response) {
    return httpResponse.json({ result: "wrong route" });
  }
}

export { UserController };
