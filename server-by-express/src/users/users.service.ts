import { Document } from "mongodb";
import { UserDao, UserEntity } from "../Dao/UserDao";
import Result, { ResultType } from "../helper/result";
import { userValidation } from "../helper/validation";

class UserService {
  private userDao: UserDao;

  constructor() {
    this.userDao = new UserDao();
  }
  async addUser(user: UserEntity) {
    try {
      if (Object.keys(user).length == 0) return Result(null, "empty body");

      await this.userDao.add(user);
      return Result("added", null);
    } catch (error: any) {
      return Result(null, error.message);
    }
  }

  async getUsers(): Promise<ResultType<Document[]>> {
    try {
      const users = await this.userDao.get();
      return Result(users, null);
    } catch (error: any) {
      console.log(error.message);
      return Result(null, error.message);
    }
  }

  async deleteUser(id: string) {
    try {
      if (!id) {
        return Result("plz provide id in request body");
      }
      await this.userDao.deleteById(id);
      return Result("deleted", null);
    } catch (error: any) {
      return Result(error.message, null);
    }
  }

  async updateUser(id: string, user: UserEntity) {
    try {
      //it throws error if input is not valid
      userValidation(id, user);
      await this.userDao.updateById(id, user);
      return Result(null, "updated");
    } catch (error: any) {
      return Result(error.message, null);
    }
  }
}

export default UserService;
