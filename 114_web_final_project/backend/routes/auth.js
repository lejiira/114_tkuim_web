// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs'); // ✨ 1. 引入 bcrypt 套件

// --- API: 會員註冊 ---
// 路徑: POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { email, password, nickname } = req.body;

        // 檢查信箱是否已經被註冊過
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: '此信箱已被註冊！' });
        }

        // ✨ 2. 密碼加密 (Hash)
        // 10 是 salt rounds (運算強度)，數字越大越安全但越慢，10 是標準值
        const hashedPassword = await bcrypt.hash(password, 10);

        // 建立新使用者 (存入加密後的密碼)
        const newUser = new User({
            email,
            password: hashedPassword, // ✨ 這裡存入 hashedPassword，而不是原本的 password
            nickname
        });

        await newUser.save();

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

        // 找看看有沒有這個使用者
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: '找不到此帳號' });
        }

        // ✨ 3. 密碼比對 (Compare)
        // 使用 bcrypt.compare(使用者輸入的明碼, 資料庫裡的亂碼)
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: '密碼錯誤' });
        }

        // 登入成功！回傳資料
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