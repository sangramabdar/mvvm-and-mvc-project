import { Request, Response } from "express";

import { Document } from "mongodb";
import ResponseBuilder from "../../helper/responseBuilder";
import { UserEntity } from "./user.entity";

import { UserService, UserServiceImpl } from "./user.service";

class UserController {
  static userService: UserService = new UserServiceImpl();

  static async getUsers(httpRequest: Request, httpResponse: Response, next) {
    try {
      const result = await UserController.userService.getAllEntities();
      let responseBody = new ResponseBuilder<UserEntity[]>("", result);
      return httpResponse.json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async addUser(httpRequest: Request, httpResponse: Response, next) {
    console.log("addUSer");
    try {
      const user: UserEntity = httpRequest.body;
      const result = await UserController.userService.addEntity(user);
      let responseBody = new ResponseBuilder<string>("", result);
      return httpResponse.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(httpRequest: Request, httpResponse: Response, next) {
    try {
      const id = httpRequest.params["id"];
      const user: UserEntity = httpRequest.body;
      const result = await UserController.userService.updateEntity(id, user);
      const responseBody = new ResponseBuilder<string>("", result);
      return httpResponse.json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(httpRequest: Request, httpResponse: Response, next) {
    try {
      const id = httpRequest.params["id"];
      const result = await UserController.userService.deleteEntity(id);
      const responseBody = new ResponseBuilder<string>("", result);
      return httpResponse.json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async getUser(httpRequest: Request, httpResponse: Response, next) {
    try {
      const id = httpRequest.params["id"];
      const result = await UserController.userService.getEntity(id);
      const responseBody = new ResponseBuilder<Document>().setPayload(result);
      return httpResponse.json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async wrongRoute(httpRequest: Request, httpResponse: Response) {
    return httpResponse.status(404).json({ result: "wrong route" });
  }
}

export { UserController };
