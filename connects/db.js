require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
let db;

const initDB = async () => {
  if (db) {
    console.warn('DB is already initialize!');
    return db;
  }

  try {
    const client = await MongoClient.connect(process.env.DB_STRING);

    db = client.db(process.env.DB_NAME);
    console.log(`${db.databaseName} DB initialized successfully.`);

    return db;
  } catch (error) {
    console.error('Failed to initialize DB:', error);
    throw error;
  }
}

const getDB = () => {
  if (!db) {
    throw new Error('DB is not initialized!');
  }

  return db;
}

module.exports = {
  initDB,
  getDB
}