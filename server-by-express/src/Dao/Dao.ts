import { ObjectId } from "mongodb";
import Database from "../config/db";

interface IDao<T> {
  get(): any;
  add(element: T);
  updateById(id: string, element: T);
  deleteById(id: string);
}

class Dao<T> implements IDao<T> {
  protected _collection: string;

  constructor(collection: string) {
    this._collection = collection;
  }
  async add(element: T) {
    await Database.getDb().collection(this._collection).insertOne(element);
  }

  async updateById(id: string, element: T) {
    const isValid = ObjectId.isValid(id);

    if (!isValid) {
      throw new Error("wrong id");
    }

    const _id = new ObjectId(id);

    const updateResult = await Database.getDb()
      .collection(this._collection)
      .updateOne(
        {
          _id,
        },
        {
          $set: element,
        }
      );

    if (updateResult.matchedCount == 0) {
      throw new Error("specified id is not there");
    }
  }

  async deleteById(id: string) {
    const isValid = ObjectId.isValid(id);

    if (!isValid) {
      throw new Error("wrong id");
    }

    const deleteResult = await Database.getDb()
      .collection(this._collection)
      .deleteOne({ _id: new ObjectId(id) });

    if (deleteResult.deletedCount == 0) {
      throw new Error("object already deleted");
    }
  }

  async get() {
    const users = await Database.getDb()
      .collection(this._collection)
      .find()
      .toArray();
    return users;
  }
}

export { Dao, IDao };
