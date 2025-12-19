// server/db.js
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// 設定資料庫網址 (讀取 .env 或預設 localhost)
const url = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(url);

// 資料庫名稱 (根據你的 mongo-init.js，這裡應該是 week12)
const dbName = 'week12'; 

let db;

// 1. 連線資料庫函式 (給 server.js 啟動時呼叫)
export async function connectDB() {
    try {
        await client.connect();
        console.log('✅ 成功連線到 MongoDB');
        db = client.db(dbName);
    } catch (error) {
        console.error('❌ MongoDB 連線失敗:', error);
        process.exit(1);
    }
}

// 2. 取得集合函式 (給 Repository 用的)
export function getCollection(collectionName) {
    if (!db) {
        throw new Error('資料庫尚未初始化，請先連線！');
    }
    return db.collection(collectionName);
}