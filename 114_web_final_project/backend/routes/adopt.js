// backend/routes/adopt.js
// [檔案功能] 認養 API：處理認養 (Create)、查詢認養清單 (Read)、取消認養 (Delete)
const express = require('express');
const router = express.Router();
const Adoption = require('../models/Adoption');

// --- API 1: 進行認養 (新增認養紀錄) ---
// 路徑: POST /api/adopt
router.post('/', async (req, res) => {
    try {
        // ✨ 修正點 1: 改成 userId 和 animalId (配合前端傳來的名稱)
        const { userId, animalId } = req.body;

        // 檢查: 如果沒收到資料，先擋下來，方便除錯
        if (!userId || !animalId) {
            return res.status(400).json({ message: '資料不完整，找不到 userId 或 animalId' });
        }

        // 1. 檢查是否已經認養過這隻動物
        // ✨ 修正點 2: 資料庫查詢也要用 userId, animalId
        const existingAdoption = await Adoption.findOne({ userId, animalId });

        if (existingAdoption) {
            return res.status(400).json({ message: '你已經認養過這隻動物囉！' });
        }

        // 2. 建立新的認養資料
        const newAdoption = new Adoption({
            userId,   // ✨ 修正點 3
            animalId  // ✨ 修正點 3
        });

        // 3. 存入資料庫
        await newAdoption.save();

        res.status(201).json({ message: '恭喜！認養成功！', adoption: newAdoption });

    } catch (error) {
        console.error("認養失敗:", error); // 在後端終端機印出錯誤，方便你看
        res.status(500).json({ message: '伺服器錯誤', error: error.message });
    }
});

// --- API 2: 查詢某使用者的認養清單 ---
// 路徑: GET /api/adopt/user/:userId
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // 1. 找出該使用者的所有認養紀錄
        // ✨ 修正點 4: 查詢條件改成 userId
        // ✨ 修正點 5: populate 改成 animalId (這要看你的 Schema 怎麼定，下面會檢查)
        const adoptions = await Adoption.find({ userId: userId })
            .populate('animalId')
            .sort({ adoptDate: -1 }); // ✨ 修正點 6: 排序欄位改成 adoptDate (配合 Schema)

        res.json(adoptions);

    } catch (error) {
        res.status(500).json({ message: '查詢失敗', error: error.message });
    }
});

// --- 3. 取消認養 (Delete) ---
// 路徑: DELETE /api/adopt/:id (这里的 id 是認養單的 _id)
router.delete('/:id', async (req, res) => {
    try {
        const adoptionId = req.params.id;

        // 刪除該筆資料
        const result = await Adoption.findByIdAndDelete(adoptionId);

        if (!result) {
            return res.status(404).json({ message: "找不到這筆認養紀錄" });
        }

        res.json({ message: "已取消認養 👋" });
    } catch (error) {
        res.status(500).json({ message: "刪除失敗", error: error.message });
    }
});

module.exports = router;