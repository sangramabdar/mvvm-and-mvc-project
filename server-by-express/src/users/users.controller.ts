import { UserEntity } from "../Dao/UserDao";
import UserService from "./users.service";

class UsersController {
  static userService: UserService = new UserService();

  static async getUsers(req, res) {
    const result = await UsersController.userService.getUsers();
    return res.json(result);
  }

  static async addUser(req, res) {
    const user: UserEntity = req.body;

    const r = await UsersController.userService.addUser(user);

    return res.json(r);
  }

  static async updateUser(req, res) {
    const { id, value } = req.body;

    const r = await UsersController.userService.updateUser(id, value);

    return res.json(r);
  }

  static async deleteUser(req, res) {
    const id = req.body.id;

    const r = await UsersController.userService.deleteUser(id);

    return res.json(r);
  }
}

export { UsersController };
