// backend/server.js
// [檔案功能] 後端入口點：負責啟動伺服器、連結資料庫、並統整所有的 API 路由
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// --- 1. 引入路由檔案 (新增) ---
const animalRoutes = require('./routes/animals');
const authRoutes = require('./routes/auth');
const adoptRoutes = require('./routes/adopt');
const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB 資料庫連線成功！'))
    .catch(err => console.error('❌ 資料庫連線失敗:', err));

// --- 2. 設定路由路徑 (新增) ---
// 意思是：只要網址是 "/api/animals" 開頭的，都交給 animalRoutes 處理
app.use('/api/animals', animalRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/adopt', adoptRoutes);
// 測試路由 (這個可以留著當首頁檢查用)
app.get('/', (req, res) => {
    res.send('後端伺服器運作中！');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 伺服器啟動於 http://localhost:${PORT}`);
});
