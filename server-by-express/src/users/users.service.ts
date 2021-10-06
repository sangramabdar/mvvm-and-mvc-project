import Result from "../helper/result";
import { IUserDao, UserDao, UserEntity } from "./users.model";

class UsersService<T> {
  static userDao: IUserDao;

  async addUser(user: UserEntity) {
    try {
      if (!(user.name && user.age))
        return Result("not valid information provided");

      await UsersService.userDao.addUser(user);

      return Result(null, "added");
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
      if (!id) {
        return Result("plz provide id in request body");
      }
      await UsersService.userDao.deleteUser(id);
      return Result(null, "deleted");
    } catch (error) {
      return Result(error.message, null);
    }
  }

  async updateUser(id: string, user: UserEntity) {
    try {
      if (!id || !user) {
        return Result("plz provide id and value in request body");
      }
      await UsersService.userDao.updateUser(id, user);
      return Result(null, "updated");
    } catch (error) {
      return Result(error.message, null);
    }
  }
}

UsersService.userDao = new UserDao();

export default UsersService;
