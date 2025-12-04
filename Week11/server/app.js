//程式的進入點
/*
當你啟動伺服器時，就是執行這個檔案。它負責把所有部門（資料庫、路由）組裝起來，
並開始監聽網路請求。
*/

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import signupRouter from './routes/signup.js';

const app = express();
app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
app.use(express.json());

app.use('/api/signup', signupRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server Error' });
});

const port = process.env.PORT || 3001;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect MongoDB', error);
    process.exit(1);
  });
/*
什麼是 CORS？
想像你的瀏覽器（Chrome/Edge）是一位非常嚴格的大樓管理員
你的前端網頁 (住在 5500 號房)：這是你用 Live Server 開的網頁。
你的後端伺服器 (住在 3001 號房)：這是你的 Node.js/MongoDB 程式。
都在 localhost 你的電腦上，但對管理員（瀏覽器）來說，它們是不同的房間（Port 不同，視為不同來源）。
*/