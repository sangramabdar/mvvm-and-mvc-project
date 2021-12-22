import { Request, Response } from "express";
import { UserEntity } from "../Repository/userRepository";
import UserService from "./user.service";

class UserController {
  static userService: UserService = new UserService();

  static async getUsers(req: Request, res: Response) {
    const result = await UserController.userService.getUsers();
    return res.json(result);
  }

  static async addUser(req: Request, res: Response) {
    const user: UserEntity = req.body;
    const result = await UserController.userService.addUser(user);
    return res.json(result);
  }

  static async updateUser(req: Request, res: Response) {
    const { id, value } = req.body;
    const result = await UserController.userService.updateUser(id, value);
    return res.json(result);
  }

  static async deleteUser(req: Request, res: Response) {
    const id = req.body.id;
    const result = await UserController.userService.deleteUser(id);
    return res.json(result);
  }

  static async getUser(req: Request, res: Response) {
    const id = req.body.id;
    const result = await UserController.userService.getUser(id);
    return res.json(result);
  }

  static async wrongRoute(req: Request, res: Response) {
    return res.json({ result: "wrong route" });
  }
}

export { UserController };
