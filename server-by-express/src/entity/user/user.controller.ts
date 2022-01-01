import { Request, Response } from "express";

import { Document } from "mongodb";
import ResponseBuilder from "../../helper/responseBuilder";
import { UserEntity } from "./user.entity";

import { UserService, UserServiceImpl } from "./user.service";

class UserController {
  static userService: UserService = new UserServiceImpl();

  static async getUsers(request: Request, response: Response, next) {
    try {
      const users = await UserController.userService.getAllEntities();
      let responseBody = new ResponseBuilder<UserEntity[]>("", users);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async addUser(request: Request, response: Response, next) {
    try {
      const user: UserEntity = request.body;
      const result = await UserController.userService.addEntity(user);
      let responseBody = new ResponseBuilder<string>("", result).setStatus(201);
      return response.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(request: Request, response: Response, next) {
    try {
      const id = request.params["id"];
      const user: UserEntity = request.body;
      const result = await UserController.userService.updateEntity(id, user);
      const responseBody = new ResponseBuilder<string>("", result);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(request: Request, response: Response, next) {
    try {
      const id = request.params["id"];
      const result = await UserController.userService.deleteEntity(id);
      const responseBody = new ResponseBuilder<string>("", result);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async getUser(request: Request, response: Response, next) {
    try {
      const id = request.params["id"];
      const result = await UserController.userService.getEntity(id);
      const responseBody = new ResponseBuilder<Document>().setPayload(result);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  }

  static async wrongRoute(request: Request, response: Response) {
    return response.status(404).json({ result: "wrong route" });
  }
}

export { UserController };
