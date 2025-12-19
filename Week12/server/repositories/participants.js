// server/repositories/participants.js
import { ObjectId } from 'mongodb';
import { getCollection } from '../db.js';

const COLLECTION_NAME = 'participants';

// 1. 新增報名
export async function createParticipant(data) {
    const doc = { ...data, createdAt: new Date() };
    const result = await getCollection(COLLECTION_NAME).insertOne(doc);
    return result.insertedId;
}

// 2. 查詢全部 (Admin 用)
export async function findAll() {
    return await getCollection(COLLECTION_NAME).find({}).toArray();
}

// 3. 查詢個人 (學生用)
export async function findByOwner(ownerId) {
    return await getCollection(COLLECTION_NAME).find({ ownerId }).toArray();
}

// 4. 透過 ID 找單筆 (為了刪除前檢查權限)
export async function findById(id) {
    if (!ObjectId.isValid(id)) return null;
    return await getCollection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
}

// 5. 刪除資料
export async function deleteParticipant(id) {
    return await getCollection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
}