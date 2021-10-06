import { ObjectId } from "mongodb";
import { db } from "../config/db";
import { userValidation } from "../helper/validation";

type UserEntity = {
  name: string;
  age: number;
};

interface IUserDao {
  getUsers(): any;
  addUser(user: UserEntity);
  updateUser(id: string, user: UserEntity);
  deleteUser(id: string);
}

class UserDao implements IUserDao {
  static collection = "users";

  async addUser(user: UserEntity) {
    await db.collection(UserDao.collection).insertOne(user);
  }

  async updateUser(id: string, user: UserEntity) {
    const isValid = ObjectId.isValid(id);

    if (!isValid) {
      throw new Error("wrong id");
    }

    if (!userValidation(user)) {
      throw new Error("wrong info provided");
    }

    const _id = new ObjectId(id);

    const updateResult = await db.collection(UserDao.collection).updateOne(
      {
        _id,
      },
      {
        $set: user,
      }
    );

    if (updateResult.matchedCount == 0) {
      throw new Error("specified id is not there");
    }
  }

  async deleteUser(id: string) {
    const isValid = ObjectId.isValid(id);

    if (!isValid) {
      throw new Error("wrong id");
    }

    const deleteResult = await db
      .collection(UserDao.collection)
      .deleteOne({ _id: new ObjectId(id) });

    if (deleteResult.deletedCount == 0) {
      throw new Error("object already deleted");
    }
  }

  async getUsers() {
    const users = await db.collection(UserDao.collection).find().toArray();
    return users;
  }
}

export { UserEntity, UserDao, IUserDao };
