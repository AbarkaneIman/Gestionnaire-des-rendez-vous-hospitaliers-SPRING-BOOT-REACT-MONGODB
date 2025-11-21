const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017"; // MongoDB local
const client = new MongoClient(url);

const dbName = "hospitalDB";

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connecté à MongoDB !");
    const db = client.db(dbName);
    return db;
  } catch (err) {
    console.error("❌ Erreur de connexion :", err);
  }
}

module.exports = connectDB;
