// server/repositories/participants.js
// 裡面的程式碼專門負責 「跟資料庫說話」
/*
routes 接到報名請求後，會呼叫 repositories 說「幫我把這個人存進資料庫」。
這樣做的好處是，如果以後資料庫欄位變了，你只要改這裡，不用改外面的路由。
*/
import { ObjectId } from 'mongodb';
import { getDB } from '../db.js';

const collection = () => getDB().collection('participants');

// 建立索引的函式: 確保 email 欄位是唯一的 (Unique)
export async function createIndexes() {
  // 如果 email 重複，資料庫會報錯 (code 11000)
  await collection().createIndex({ email: 1 }, { unique: true });
}

export async function createParticipant(data) {
  // 每次建立資料前，確保索引存在 (實務上通常會在 Server 啟動時做一次，但在這裡呼叫最保險)
  await createIndexes();

  const result = await collection().insertOne({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return result.insertedId;
}
// 支援分頁：新增 skip 和 limit 參數
export function listParticipants(skip = 0, limit = 20) {
  return collection()
    .find()
    .sort({ createdAt: -1 })
    .skip(skip)   // 跳過前 X 筆
    .limit(limit) // 只抓 Y 筆
    .toArray();
}

// 新增計算總數的函式:因為分頁後 listParticipants 只會回傳 10 筆，我們需要另外知道總數
export function countParticipants() {
  return collection().countDocuments();
}

export async function updateParticipant(id, patch) {
  return collection().updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...patch, updatedAt: new Date() } }
  );
}

export function deleteParticipant(id) {
  return collection().deleteOne({ _id: new ObjectId(id) });
}
