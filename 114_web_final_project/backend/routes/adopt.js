// backend/routes/adopt.js
const express = require('express');
const router = express.Router();
const Adoption = require('../models/Adoption');

// --- API 1: 進行認養 (新增認養紀錄) ---
// 路徑: POST /api/adopt
router.post('/', async (req, res) => {
    try {
        const { user_id, animal_id } = req.body;

        // 1. 檢查是否已經認養過這隻動物 (避免重複認養)
        const existingAdoption = await Adoption.findOne({ user_id, animal_id });
        if (existingAdoption) {
            return res.status(400).json({ message: '你已經認養過這隻動物囉！' });
        }

        // 2. 建立新的認養資料
        const newAdoption = new Adoption({
            user_id,
            animal_id
        });

        // 3. 存入資料庫
        await newAdoption.save();

        res.status(201).json({ message: '恭喜！認養成功！', adoption: newAdoption });

    } catch (error) {
        res.status(500).json({ message: '伺服器錯誤', error: error.message });
    }
});

// --- API 2: 查詢某使用者的認養清單 ---
// 路徑: GET /api/adopt/user/:userId
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // 1. 找出該使用者的所有認養紀錄
        // 2. .populate('animal_id') 是關鍵！它會自動把 animal_id 替換成完整的動物資料(名字、圖片...)
        const adoptions = await Adoption.find({ user_id: userId })
            .populate('animal_id')
            .sort({ adoption_date: -1 }); // 依照日期新到舊排序

        res.json(adoptions);

    } catch (error) {
        res.status(500).json({ message: '查詢失敗', error: error.message });
    }
});

module.exports = router;