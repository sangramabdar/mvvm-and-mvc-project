import "reflect-metadata";
import { injectable } from "tsyringe";
import { UserDao, UserEntity } from "../Dao/UserDao";
import Result from "../helper/result";
import { userValidation } from "../helper/validation";

@injectable()
class UsersService {
  constructor(private userDao: UserDao) {}
  async addUser(user: UserEntity) {
    try {
      await this.userDao.add(user);
      return Result(null, "added");
    } catch (error) {
      return Result(error.message, null);
    }
  }

  async getUsers() {
    try {
      const users = await this.userDao.get();
      return Result(null, users);
    } catch (e) {
      console.log(e.message);
      return Result(e.message, null);
    }
  }

  async deleteUser(id: string) {
    try {
      if (!id) {
        return Result("plz provide id in request body");
      }
      await this.userDao.deleteById(id);
      return Result(null, "deleted");
    } catch (error) {
      return Result(error.message, null);
    }
  }

  async updateUser(id: string, user: UserEntity) {
    try {
      //it throws error if input is not valid
      userValidation(id, user);
      await this.userDao.updateById(id, user);
      return Result(null, "updated");
    } catch (error) {
      return Result(error.message, null);
    }
  }
}

export default UsersService;
