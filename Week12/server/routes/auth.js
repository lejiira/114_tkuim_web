import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from '../repositories/users.js';

const router = express.Router();

// 1. 註冊帳號
router.post('/signup', async (req, res) => {
    try {
        const { email, password, role } = req.body;
        // 檢查是否重複
        if (await findUserByEmail(email)) {
            return res.status(400).json({ error: 'Email 已存在' });
        }
        // 加密密碼
        const passwordHash = await bcrypt.hash(password, 10);
        // 建立使用者
        const user = await createUser({ email, passwordHash, role });
        res.status(201).json({ message: '註冊成功', user: { id: user._id, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. 登入 (並發放 Token)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);
        
        // 驗證帳號與密碼
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(401).json({ error: '帳號或密碼錯誤' });
        }

        // 簽發 Token (包含使用者 ID 與 Role)
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: '登入成功', token, role: user.role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;