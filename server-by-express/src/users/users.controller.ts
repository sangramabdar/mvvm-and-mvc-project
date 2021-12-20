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

    const r = await UserController.userService.addUser(user);

    return res.json(r);
  }

  static async updateUser(req, res) {
    const { id, value } = req.body;

    const r = await UserController.userService.updateUser(id, value);

    return res.json(r);
  }

  static async deleteUser(req, res) {
    const id = req.body.id;

    const r = await UserController.userService.deleteUser(id);

    return res.json(r);
  }
}

export { UserController };
