// server/routes/signup.js
import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { 
    findAll, 
    findByOwner, 
    createParticipant, 
    deleteParticipant, 
    findById 
} from '../repositories/participants.js';

const router = express.Router();

// 1. 填寫報名表 (POST) - 記得紀錄 ownerId
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        // 把 "當前登入者的 ID" (req.user._id) 記下來，當作 ownerId
        const id = await createParticipant({ 
            name, 
            email, 
            phone, 
            ownerId: req.user._id 
        });
        res.status(201).json({ id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. 查詢名單 (GET) - ★重點邏輯：學生看自己，管理員看全部
router.get('/', authMiddleware, async (req, res) => {
    try {
        let result;
        // 如果角色是 admin，呼叫 findAll() 找全部
        if (req.user.role === 'admin') {
            result = await findAll();
        } else {
            // 如果是 student，呼叫 findByOwner() 只找自己的
            result = await findByOwner(req.user._id);
        }
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. 刪除資料 (DELETE) - ★重點邏輯：檢查權限
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        // 先把那筆資料找出來，確認它是誰的
        const participant = await findById(id);

        if (!participant) {
            return res.status(404).json({ error: '找不到該筆資料' });
        }

        // 判斷：如果是 Admin 或者 資料的主人(ownerId) 才可以刪除
        if (req.user.role === 'admin' || participant.ownerId === req.user._id) {
            await deleteParticipant(id);
            res.json({ message: '刪除成功' });
        } else {
            res.status(403).json({ error: '權限不足，你不能刪除別人的資料' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;