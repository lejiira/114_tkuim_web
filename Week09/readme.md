# Week09 Lab
## 如何啟動後端（npm install、npm run dev）。
- 進入server資料夾(必須要是package.json所在的資料夾)，安裝套件並啟動:
- cd server
- npm install
- npm run dev
- 伺服器將運行於 http://localhost:3001

## 如何啟動前端（Live Server / Vite）。
- 使用 VS Code 的 Live Server 開啟 client/signup_form.html
  
## API 端點文件與測試方式
- 1. 使用 VS Code REST Client 開啟 tests/api.http 點擊 Send Request。
- 2. 使用 Postman 
- 3. 使用 curl 指令 

## 環境變數
- 在 server 目錄下建立 .env 檔案：
- PORT=3001
- ALLOWED_ORIGIN=http://127.0.0.1:5500

## 加分挑戰:將資料暫存於 JSON 檔案或 SQLite，並提供 GET /api/signup/:id 查詢。
- 沒有將資料暫存於 JSON 檔案，重開伺服器 (npm run dev)，之前輸入的報名資料就會全部消失（因為只存在記憶體變數裡）。
- 確認報名成功:打開 VS Code 裡的 server/db.json 檔案，資料自動跑進去了
- GET /api/signup/:id 查詢: 
- 先看 db.json 裡面的 id 是什麼（例如 "id": "abc12345"）。
- 瀏覽器網址列輸入：http://localhost:3001/api/signup/abc12345