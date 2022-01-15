import { Request, Response } from "express";
import { dependencies } from "../../config/dependencies";

import ResponseBodyBuilder from "../../helper/responseBodyBuilder";
import { UserEntity } from "./user.entity";

import { UserService, UserServiceImpl } from "./user.service";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserServiceImpl();
  }

  getUsers = async (request: Request, response: Response, next) => {
    try {
      const users = await this.userService.getAllEntities();
      let responseBody = new ResponseBodyBuilder<UserEntity[]>("", users);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  };

  addUser = async (request: Request, response: Response, next) => {
    try {
      const user: UserEntity = request.body;
      console.log(user);
      const result = await this.userService.addEntity(user);
      let responseBody = new ResponseBodyBuilder<string>("", result).setStatus(
        201
      );
      return response.status(201).json(responseBody);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (request: Request, response: Response, next) => {
    try {
      const id = request.params["id"];
      const user: UserEntity = request.body;
      const result = await this.userService.updateEntity(id, user);
      const responseBody = new ResponseBodyBuilder<string>("", result);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (request: Request, response: Response, next) => {
    try {
      const id = request.params["id"];
      const result = await this.userService.deleteEntity(id);
      const responseBody = new ResponseBodyBuilder<string>("", result);
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  };

  getUser = async (request: Request, response: Response, next) => {
    try {
      const id = request.params["id"];
      const result = await this.userService.getEntity(id);
      const responseBody = new ResponseBodyBuilder<UserEntity>().setPayload(
        result
      );
      return response.json(responseBody);
    } catch (error) {
      next(error);
    }
  };

  async wrongRoute(request: Request, response: Response) {
    return response.status(404).json({ result: "wrong route" });
  }
}

export { UserController };
