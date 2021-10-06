import { Dao } from "./Dao";

type UserEntity = {
  name: string;
  age: number;
};

class UserDao extends Dao<UserEntity> {
  private static URL = "users";
  constructor() {
    super(UserDao.URL);
  }
}

export { UserDao, UserEntity };
