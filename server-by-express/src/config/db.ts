import { Db, MongoClient } from "mongodb";

class Database {
  private static readonly URL = "mongodb://localhost:27017";
  private static readonly DB_NAME = "practice-expressjs";
  private static db: Db;

  static async connectToDatabse() {
    const client = await new MongoClient(Database.URL, {
      serverSelectionTimeoutMS: 2000,
    }).connect();
    if (!Database.db) {
      Database.db = client.db(Database.DB_NAME);
    }
  }

  static getDb(): Db {
    return Database.db;
  }
}

export default Database;
