import { getCollection } from '../db.js';

export async function findUserByEmail(email) {
  return getCollection('users').findOne({ email });
}

export async function createUser({ email, passwordHash, role = 'student' }) {
  const doc = { email, passwordHash, role, createdAt: new Date() };
  const result = await getCollection('users').insertOne(doc);
  return { ...doc, _id: result.insertedId };
}

export async function findById(id) {
  const { ObjectId } = await import('mongodb');
  return await getCollection('participants').findOne({ _id: new ObjectId(id) });
}

