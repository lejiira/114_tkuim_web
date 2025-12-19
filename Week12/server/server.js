// server/server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import signupRouter from './routes/signup.js';
import authRouter from './routes/auth.js'; // --- 1. 新增這行：匯入 auth 路由 ---

// 2. 加上這行 Debug，看看有沒有讀到
console.log("目前的 Port 設定:", process.env.PORT);
console.log("目前的 DB 連線:", process.env.MONGO_URI);
const app = express();

// 注意：如果你的前端是在 localhost:5173 (Vite 預設)，請確認 .env 的 ALLOWED_ORIGIN 設對，或是暫時用 '*'
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' })); 
app.use(express.json());

// --- 2. 新增這行：掛載 auth 路由 ---
// 這樣你的網址才會是 /auth/login 和 /auth/signup
app.use('/auth', authRouter);

app.use('/api/signup', signupRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server Error' });
});

// 建議預設改成 3000，因為 Lab 講義通常預設後端是 3000
const port = process.env.PORT || 3000; 

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