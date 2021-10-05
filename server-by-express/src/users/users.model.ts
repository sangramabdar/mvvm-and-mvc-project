import { ObjectId } from "mongodb";
import { db } from "../config/db";

type UserModel = {
  name: string;
  age: string;
};

interface IUserDao {
  getUsers(): any;
  addUser(user: UserModel);
  updateUser(id: string, user: UserModel);
  deleteUser(id: string);
}

class UserDao implements IUserDao {
  static collection = "users2";

  async addUser(user: UserModel) {
    await db.collection(UserDao.collection).insertOne(user);
  }

  async updateUser(id: string, user: UserModel) {
    const isValid = ObjectId.isValid(id);

    if (!isValid) {
      throw new Error("wrong id");
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

export { UserModel, UserDao, IUserDao };
