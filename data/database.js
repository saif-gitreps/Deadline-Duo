require("dotenv").config();
const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

const localDb = "mongodb://localhost:27017";
const atlasDb = process.env.MONGO_URI;

async function connectToDatabase() {
   const client = await MongoClient.connect(atlasDb);
   database = client.db("deadline-duo");
}

function getDb() {
   if (!database) {
      throw { message: "You must connect first!" };
   }
   return database;
}

module.exports = {
   connectToDatabase: connectToDatabase,
   getDb: getDb,
};
