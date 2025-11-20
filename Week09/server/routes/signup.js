// routes/signup.js
import { Router } from 'express';
import { nanoid } from 'nanoid';
import fs from 'fs/promises'; // 加分題：引入 fs 模組來讀寫檔案
import path from 'path';

export const router = Router();

// 原始版本是用陣列：const participants = [];
// 進階版本改用 json 檔案當作資料庫
const DB_PATH = './db.json';

// 讀取資料庫
async function readDb() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // 如果檔案還沒建立，就回傳空陣列，避免程式報錯
    return []; 
  }
}

// 寫入資料庫
async function writeDb(data) {
  // null, 2 是為了讓 json 檔案排版漂亮，不要擠成一行
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

// GET: 取得清單
router.get('/', async (req, res) => {
  // const participants = ... (原本是直接讀變數)
  const participants = await readDb(); // 現在改成等待檔案讀取
  res.json({ total: participants.length, data: participants });
});

// POST: 新增資料
router.post('/', async (req, res) => {
  const { name, email, phone, password, confirmPassword, interests, terms } = req.body ?? {};

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ error: '所有欄位皆為必填' });
  }

  // 1. 先把舊資料讀出來
  const participants = await readDb();

  const newParticipant = {
    id: nanoid(8),
    name,
    email,
    phone,
    interests: interests || [],
    terms: terms || false,
    createdAt: new Date().toISOString()
  };

  // 2. 推入新資料
  participants.push(newParticipant);

  // 3. 寫回db.json 存檔 
  await writeDb(participants);

  res.status(201).json({ message: '報名成功', participant: newParticipant });
});

// 根據 ID 查詢單筆資料
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const participants = await readDb();
  const found = participants.find(p => p.id === id);

  if (!found) {
    return res.status(404).json({ error: '找不到此報名資料' });
  }
  res.json(found);
});