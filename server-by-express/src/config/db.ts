import { Db, MongoClient } from "mongodb";

class Database {
  private static readonly URL = "mongodb://localhost:27017";
  private static readonly DB_NAME = "new";
  private static db: Db | null = null;

  static async connectToDatabse() {
    const client = await new MongoClient(Database.URL, {
      serverSelectionTimeoutMS: 2000,
    }).connect();

    Database.db = client.db(Database.DB_NAME);
  }

  static async getDb(): Promise<Db | null> {
    if (!Database.db) {
      await this.connectToDatabse();
    }
    return Database.db;
  }
}

export default Database;
