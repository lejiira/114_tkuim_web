// backend/routes/animals.js
const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal'); // 引入動物設計圖

// --- API 規劃區 ---

// 1. 取得所有動物列表 (GET /api/animals)
// 功能對應：[瀕危動物總覽] 頁面
// 邏輯：去資料庫把所有動物撈出來回傳
router.get('/', async (req, res) => {
    try {
        // .find() 是 Mongoose 的語法，不加條件代表「全搜」
        const animals = await Animal.find();

        // 把撈到的資料包成 JSON 回傳給前端
        res.json(animals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; // 把這個部門導出，讓 server.js 使用