# 瀕危動物認養平台

這是一個基於 MERN Stack (MongoDB, Express, React, Node.js) 開發的期末專題。
使用者可以瀏覽瀕危動物資訊、註冊會員，並進行模擬認養與管理。

## 專案結構
- `frontend/`: React 前端應用程式
- `backend/`: Express 後端 API 伺服器
## 如何啟動專案 (操作指引)
請依照以下步驟，分別啟動後端與前端。
### 1. 環境準備
請確保您的電腦已安裝：
- Node.js (v14 以上)
- Git

### 2. 啟動後端 (Backend)

開啟一個終端機 (Terminal)，執行以下指令：

# 1. 進入後端資料夾
cd backend

# 2. 安裝套件
npm install

# 3. 設定環境變數 (重要！)
請確認 backend/ 目錄下有 .env 檔案，內容需包含：
MONGO_URI=你的MongoDB連線字串
PORT=5000

# 4. 啟動伺服器
node server.js
- 伺服器啟動於 http://localhost:5000
### 2. 啟動前端 (Frontend)
# 1. 進入前端資料夾
cd frontend

# 2. 安裝套件
npm install

# 3. 啟動開發伺服器
npm run dev
- 前端啟動於 http://localhost:5173

## 功能與測試帳號
測試流程
-註冊/登入：請先註冊一個新帳號。
-瀏覽動物：首頁可看到動物列表。
-認養動物：點擊「我要認養」，系統會記錄。
-會員中心：點擊右上角進入，可查看或取消認養。