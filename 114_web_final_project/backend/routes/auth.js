// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // 引入使用者設計圖

// --- API: 會員註冊 ---
// 路徑: POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        // 1. 從前端拿到使用者輸入的資料 (req.body)
        const { email, password, nickname } = req.body;

        // 2. 檢查信箱是否已經被註冊過
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: '此信箱已被註冊！' });
        }

        // 3. 建立新使用者 (密碼暫時存明碼，之後可加分做加密)
        const newUser = new User({
            email,
            password,
            nickname
        });

        // 4. 存入資料庫
        await newUser.save();

        // 5. 回傳成功訊息
        res.status(201).json({ message: '註冊成功！請重新登入', user: newUser });

    } catch (error) {
        res.status(500).json({ message: '伺服器錯誤', error: error.message });
    }
});

// --- API: 會員登入 ---
// 路徑: POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. 找看看有沒有這個使用者
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: '找不到此帳號' });
        }

        // 2. 檢查密碼是否正確 (這裡先用明碼比對，進階可改用 bcrypt)
        if (user.password !== password) {
            return res.status(401).json({ message: '密碼錯誤' });
        }

        // 3. 登入成功！回傳使用者資料 (不包含密碼)
        // 前端會把這個 user._id 存起來，當作「登入證名」
        res.json({
            message: '登入成功',
            user: {
                _id: user._id,
                email: user.email,
                nickname: user.nickname,
                avatar: user.avatar
            }
        });

    } catch (error) {
        res.status(500).json({ message: '伺服器錯誤', error: error.message });
    }
});

module.exports = router;