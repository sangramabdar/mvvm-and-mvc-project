import { Request, Response } from "express";

import { Document } from "mongodb";
import ResponseBuilder from "../../helper/result";
import {
  genderValidation,
  schemaValidation,
  statusCodeHandler,
  User,
} from "../../helper/validation";
import { UserEntity } from "./user.repository";
import { UserService, UserServiceImpl } from "./user.service";

class UserController {
  static userService: UserService = new UserServiceImpl();

  static async getUsers(httpRequest: Request, httpResponse: Response, next) {
    try {
      const result = await UserController.userService.getAllEntities();
      let response = new ResponseBuilder<UserEntity[]>("", result);
      return httpResponse.json(response);
    } catch (error) {
      next(error);
    }
  }

  static async addUser(httpRequest: Request, httpResponse: Response, next) {
    console.log("addUSer");
    try {
      const user: UserEntity = httpRequest.body;
      const result = await UserController.userService.addEntity(user);
      let response = new ResponseBuilder<string>("", result);
      return httpResponse.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(httpRequest: Request, httpResponse: Response, next) {
    try {
      const id = httpRequest.params["id"];
      const user: UserEntity = httpRequest.body;
      const result = await UserController.userService.updateEntity(id, user);
      const response = new ResponseBuilder<string>("", result);
      return httpResponse.json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(httpRequest: Request, httpResponse: Response, next) {
    try {
      const id = httpRequest.params["id"];
      const result = await UserController.userService.deleteEntity(id);
      const response = new ResponseBuilder<string>("", result);
      return httpResponse.json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getUser(httpRequest: Request, httpResponse: Response, next) {
    try {
      const id = httpRequest.params["id"];
      console.log(id);
      const result = await UserController.userService.getEntity(id);
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

export { UserController };
