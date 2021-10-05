import { Db, MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const dbName = "practice-expressjs";

let db: Db;

async function connectToDatabse() {
  const client = await new MongoClient(url).connect();
  db = client.db(dbName);
}

export { connectToDatabse, db };
