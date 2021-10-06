import { UserEntity } from "./users.model";
import UsersService from "./users.service";

export class UsersController {
  static userService: UsersService<UserEntity>;

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
    console.log(id, value);

    const r = await UsersController.userService.updateUser(id, value);

    return res.json(r);
  }

  static async deleteUser(req, res) {
    const id = req.body.id;

    const r = await UsersController.userService.deleteUser(id);

    return res.json(r);
  }
}

UsersController.userService = new UsersService();
