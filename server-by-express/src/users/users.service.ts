import Result from "../helper/result";
import { IUserDao, UserDao, UserModel } from "./users.model";

class UsersService {
  static userDao: IUserDao;

  async addUser(user: UserModel) {
    try {
      if (!(user.name && user.age))
        return Result("not valid information provided");

      await UsersService.userDao.addUser(user);

      return Result<string>(null, "added");
    } catch (error) {
      return Result(error.message, null);
    }
  }

  async getUsers() {
    try {
      const users = await UsersService.userDao.getUsers();

      return Result(null, users);
    } catch (e) {
      console.log(e.message);
      return Result(e.message, null);
    }
  }

  async deleteUser(id: string) {
    try {
      await UsersService.userDao.deleteUser(id);
      return Result(null, "deleted");
    } catch (error) {
      return Result(error.message, null);
    }
  }

  async updateUser(id: string, user: UserModel) {
    console.log(user);
    try {
      await UsersService.userDao.updateUser(id, user);
      return Result(null, "updated");
    } catch (error) {
      return Result(error.message, null);
    }
  }
}

UsersService.userDao = new UserDao();

export default UsersService;
