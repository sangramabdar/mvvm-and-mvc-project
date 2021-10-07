import { injectable } from "tsyringe";
import { Dao } from "./Dao";

type UserEntity = {
  name: string;
  age: number;
};

@injectable()
class UserDao extends Dao<UserEntity> {
  private static URL = "users";
  constructor() {
    super(UserDao.URL);
  }
}

export { UserDao, UserEntity };
