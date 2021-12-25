import { Request, Response } from "express";
import { UserEntity } from "../Repository/userRepository";
import UserService from "../service/user.service";

class UserController {
  static userService: UserService = new UserService();

  static async getUsers(req: Request, res: Response) {
    try {
      const result = await UserController.userService.getUsers();
      return res.json(result);
    } catch (error) {
      return res.json(error.message);
    }
  }

  static async addUser(req: Request, res: Response) {
    try {
      const user: UserEntity = req.body;
      const result = await UserController.userService.addUser(user);
      return res.json(result);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const { id, value } = req.body;
      const result = await UserController.userService.updateUser(id, value);
      return res.json(result);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const id = req.body.id;
      const result = await UserController.userService.deleteUser(id);
      return res.json(result);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const id = req.body.id;
      const result = await UserController.userService.getUser(id);
      return res.json(result);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async wrongRoute(req: Request, res: Response) {
    return res.json({ result: "wrong route" });
  }
}

export { UserController };
