import { Request, Response } from "express";
import { STATUS_CODES } from "http";
import { Document } from "mongodb";
import { DataBaseConnectionError } from "../helper/exceptions";
import ResponseBuilder from "../helper/result";
import { UserEntity } from "../Repository/userRepository";
import UserService from "../service/user.service";

class UserController {
  static userService: UserService = new UserService();

  static async getUsers(req: Request, res: Response) {
    try {
      const result = await UserController.userService.getUsers();
      let response = new ResponseBuilder<UserEntity[]>().setPayload(result);
      return res.json(response);
    } catch (error) {
      let response = new ResponseBuilder<string>().setError(error.message);
      return res.json(response);
    }
  }

  static async addUser(req: Request, res: Response) {
    try {
      const user: UserEntity = req.body;
      const result = await UserController.userService.addUser(user);
      let response = new ResponseBuilder<string>()
        .setPayload(result)
        .setStatus(201);

      return res.status(201).json(response);
    } catch (error) {
      let response = new ResponseBuilder<string>().setError(error.message);
      if (error instanceof DataBaseConnectionError) {
        return res.status(500).json(response.setStatus(500));
      }
      return res.json(response);
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const { id, value } = req.body;
      const result = await UserController.userService.updateUser(id, value);
      const response = new ResponseBuilder<string>().setPayload(result);
      return res.json(response);
    } catch (error) {
      let response = new ResponseBuilder<string>().setError(error.message);
      if (error instanceof DataBaseConnectionError) {
        return res.status(500).json(response.setStatus(500));
      }
      return res.json(response);
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const id = req.body.id;
      const result = await UserController.userService.deleteUser(id);
      const response = new ResponseBuilder<string>().setPayload(result);
      return res.json(response);
    } catch (error) {
      let response = new ResponseBuilder<string>().setError(error.message);
      if (error instanceof DataBaseConnectionError) {
        return res.status(500).json(response.setStatus(500));
      }
      return res.json(response);
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const id = req.body.id;
      const result = await UserController.userService.getUser(id);
      const response = new ResponseBuilder<Document>().setPayload(result);
      return res.json(response);
    } catch (error) {
      let response = new ResponseBuilder<string>().setError(error.message);

      if (error instanceof DataBaseConnectionError) {
        return res.status(500).json(response.setStatus(500));
      }
      return res.json(response);
    }
  }

  static async wrongRoute(req: Request, res: Response) {
    return res.json({ result: "wrong route" });
  }
}

export { UserController };
