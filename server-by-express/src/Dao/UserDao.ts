import { ObjectId } from "mongodb";
import { DaoImpl } from "./Dao";

interface UserEntity {
  _id?: ObjectId;
  name: string;
  age: number;
}

class UserDao extends DaoImpl<UserEntity> {
  private static collection = "users";
  constructor() {
    super(UserDao.collection);
  }
}

export { UserDao, UserEntity };
