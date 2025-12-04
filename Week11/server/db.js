// server/db.js
//負責「連接資料庫」的程式碼。
/*
它不處理業務邏輯，只負責確保：「我們連上 MongoDB 了沒？斷線了怎麼辦？」
*/
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);//撈mongodb的連線字串
let db;

export async function connectDB() {
  if (db) return db;
  await client.connect();
  db = client.db();            // URI 已指定 DB
  console.log('[DB] Connected to MongoDB');
  return db;
}

export function getDB() {
  if (!db) throw new Error('Database not initialized');
  return db;
}

process.on('SIGINT', async () => {
  await client.close();
  console.log('\n[DB] Connection closed');
  process.exit(0);
});
