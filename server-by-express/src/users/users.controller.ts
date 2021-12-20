import { UserEntity } from "../Dao/UserDao";
import UserService from "./users.service";

class UserController {
  static userService: UserService = new UserService();

  static async getUsers(req, res) {
    const result = await UserController.userService.getUsers();
    return res.json(result);
  }

  static async addUser(req, res) {
    const user: UserEntity = req.body;
    const result = await UserController.userService.addUser(user);
    return res.json(result);
  }

  static async updateUser(req, res) {
    const { id, value } = req.body;
    const result = await UserController.userService.updateUser(id, value);
    return res.json(result);
  }

  static async deleteUser(req, res) {
    const id = req.body.id;
    const result = await UserController.userService.deleteUser(id);
    return res.json(result);
  }

  static async getUser(req, res) {
    const id = req.body.id;
    const result = await UserController.userService.getUser(id);
    return res.json(result);
  }
}

export { UserController };
