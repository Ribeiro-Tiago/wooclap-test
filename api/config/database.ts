import { MongoClient, Db } from "mongodb";

let db: Db = undefined;

export const createConnection = async () => {
  const {
    MONGO_HOST,
    MONGO_DATABASE,
    MONGO_PORT,
    MONGO_USER,
    MONGO_PASSWORD,
  } = process.env;

  if (db) {
    throw Error("A connection already exists");
  }

  const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    appname: "movies",
  });

  db = client.db(MONGO_DATABASE);

  return async () => await client.close();
};

export const getConnection = () => {
  if (!db) {
    throw Error("DB not initialized");
  }

  return db;
};
