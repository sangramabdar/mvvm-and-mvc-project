import { ObjectId } from "mongodb";
import Database from "../config/db";

interface Repository<T> {
  getAll(): Promise<T[]>;
  add(element: T);
  updateById(id: string, element: T);
  deleteById(id: string);
  getById(id: string): Promise<T>;
}

class RepositoryImpl<T> implements Repository<T> {
  protected _collection: string;

  constructor(collection: string) {
    this._collection = collection;
  }
  async getById(id: string): Promise<T> {
    const _id = new ObjectId(id);
    const db = await Database.getDb();
    const getResult = await db.collection(this._collection).findOne({ _id });
    if (!getResult) {
      throw new Error("specified id is not there");
    }
    return getResult as T;
  }
  async add(element: T) {
    const db = await Database.getDb();
    db.collection(this._collection).insertOne(element);
  }

  async updateById(id: string, element: T) {
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
      throw new Error(`specified id is not there in ${this._collection}`);
    }
  }

  async deleteById(id: string) {
    const db = await Database.getDb();
    const deleteResult = await db
      .collection(this._collection)
      .deleteOne({ _id: new ObjectId(id) });

    if (deleteResult.deletedCount == 0) {
      throw new Error(
        `specified id is not there in ${this._collection} collection or object is already deleted`
      );
    }
  }

  async getAll(): Promise<T[]> {
    const db = await Database.getDb();
    const users = (await db
      .collection(this._collection)
      .find()
      .toArray()) as T[];
    if (users.length === 0) {
      throw new Error(
        `no ${this._collection} documents in ${this._collection} collection`
      );
    }
    return users;
  }
}

export { Repository, RepositoryImpl };
