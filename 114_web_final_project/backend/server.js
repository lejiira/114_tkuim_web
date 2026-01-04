// backend/server.js
// [檔案功能] 後端入口點：負責啟動伺服器、連結資料庫、並統整所有的 API 路由
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware (中介軟體)
app.use(cors()); // 允許跨域
app.use(express.json()); // 允許解析 JSON 格式的 Request

// 資料庫連線 (請修改下方的連線字串)
// 實務上建議放在 .env 檔案，但為了方便測試先寫在這裡
// 格式: mongodb+srv://<帳號>:<密碼>@<cluster>.mongodb.net/<資料庫名>
const MONGO_URI = process.env.MONGO_URI;
console.log(' 準備連線至資料庫...'); // 偵錯用：確認程式有跑
mongoose.connect(MONGO_URI)
    .then(() => console.log(' MongoDB 資料庫連線成功'))
    .catch(err => console.error(' 資料庫連線失敗:', err));

// 測試路由
app.get('/', (req, res) => {
    res.send('後端伺服器運作中！(P0 Check)');
});

// 啟動 Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 伺服器啟動於 http://localhost:${PORT}`);
});