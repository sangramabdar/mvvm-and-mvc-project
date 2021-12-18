import { Document, ObjectId } from "mongodb";
import Database from "../config/db";
import { UserEntity } from "./UserDao";

interface Dao<T> {
  get(): any;
  add(element: T);
  updateById(id: string, element: T);
  deleteById(id: string);
}

class DaoImpl<T> implements Dao<T> {
  protected _collection: string;

  constructor(collection: string) {
    this._collection = collection;
  }
  async add(element: T) {
    const db = await Database.getDb();
    db.collection(this._collection).insertOne(element);
  }

  async updateById(id: string, element: T) {
    const isValid = ObjectId.isValid(id);

    if (!isValid) {
      throw new Error("wrong id");
    }

    const _id = new ObjectId(id);
    const db = await Database.getDb();
    const updateResult = await db.collection(this._collection).updateOne(
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
    const db = await Database.getDb();
    const deleteResult = await db
      .collection(this._collection)
      .deleteOne({ _id: new ObjectId(id) });

    if (deleteResult.deletedCount == 0) {
      throw new Error("object already deleted");
    }
  }

  async get(): Promise<Document[]> {
    const db = await Database.getDb();
    const users = await db.collection(this._collection).find().toArray();
    return users;
  }
}

export { Dao, DaoImpl };
