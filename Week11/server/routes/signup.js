// server/routes/signup.js 
/*
客人說「我要報名 (POST /register)」，這個資料夾裡的程式碼就會知道要把這個請求轉交給誰處理。
它負責導航，通常不直接寫複雜的資料庫操作。
*/
import express from 'express'; 
import {
  createParticipant,
  listParticipants,
  countParticipants,
  updateParticipant,
  deleteParticipant
} from '../repositories/participants.js';

const router = express.Router();

// 處理重複報名錯誤
router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ error: '缺少必要欄位' });
    }
    const id = await createParticipant({ name, email, phone });
    res.status(201).json({ id });
  } catch (error) {
    // 捕捉 MongoDB 的 Duplicate Key Error (錯誤代碼 11000)
    if (error.code === 11000) {
      return res.status(400).json({ error: '這個 Email 已經報名過了！' });
    }
    next(error);
  }
});
// 實作分頁 API
router.get('/', async (req, res, next) => {
  try {
    // 1. 從網址取得參數 (例如 ?page=2&limit=5)
    // 如果沒傳，預設 page=1, limit=10
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // 2. 計算要跳過幾筆 (Skip)
    // 第一頁 (1-1)*10 = 跳過 0 筆
    // 第二頁 (2-1)*10 = 跳過 10 筆
    const skip = (page - 1) * limit;

    // 3. 平行執行：同時抓「資料清單」和「總數量」
    const [items, total] = await Promise.all([
      listParticipants(skip, limit),
      countParticipants()
    ]);

    // 4. 回傳資料
    res.json({ 
      data: items,      // 這一頁的資料
      total: total,     // 資料庫總共有幾筆
      page: page,       // 目前在第幾頁
      limit: limit      // 一頁幾筆
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const result = await updateParticipant(req.params.id, req.body);
    if (!result.matchedCount) {
      return res.status(404).json({ error: '找不到資料' });
    }
    res.json({ updated: result.modifiedCount });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await deleteParticipant(req.params.id);
    if (!result.deletedCount) {
      return res.status(404).json({ error: '找不到資料' });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;