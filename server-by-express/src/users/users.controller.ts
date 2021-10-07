import "reflect-metadata";
import { autoInjectable, container, inject, singleton } from "tsyringe";
import { app } from "../config/initserver";
import { UserEntity } from "../Dao/UserDao";
import UsersService from "./users.service";

@singleton()
class UsersController {
  static userService: UsersService = container.resolve(UsersService);

  async getUsers(req, res) {
    const result = await UsersController.userService.getUsers();
    return res.json(result);
  }

  async addUser(req, res) {
    const user: UserEntity = req.body;

    const r = await UsersController.userService.addUser(user);

    return res.json(r);
  }

  async updateUser(req, res) {
    const { id, value } = req.body;

    const r = await UsersController.userService.updateUser(id, value);

    return res.json(r);
  }

  async deleteUser(req, res) {
    const id = req.body.id;

    const r = await UsersController.userService.deleteUser(id);

    return res.json(r);
  }
}

export { UsersController };
