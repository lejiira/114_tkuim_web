# 瀕危動物認養平台

## 專案簡介
本專案是一個生態環境為主題，主要針對台灣瀕臨絕種動物的網站，專案的核心理念在於「將被動的瀏覽轉化為參與的行動」。鑑於台灣及全球許多珍貴物種正面臨生存危機，本平台透過數位化的「虛擬認養」機制，降低大眾參與生態保育的門檻。使用者可以瀏覽瀕危動物資訊，並透過認養功能建立與物種的連結，藉此喚醒大眾對生態多樣性的重視。

## 使用技術
### 前端開發 (Frontend)
- 核心框架：React.js (Vite)
- 路由管理：React Router DOM (SPA 單頁式應用體驗)
- UI 框架：React-Bootstrap & Bootstrap 5 
- 圖示庫：React Bootstrap Icons 
- 狀態管理：React Hooks (useState, useEffect)
- 樣式設計：CSS Modules & Custom Variables 
### 後端開發 (Backend)
- 執行環境：Node.js
- Web 框架：Express.js (RESTful API 設計)
- 安全性：Bcrypt.js (使用者密碼加密雜湊處理)
- 跨域處理：CORS (Cross-Origin Resource Sharing)
- 環境變數：Dotenv (管理資料庫連線字串等敏感資訊)
### 資料庫 (Database)
- 資料庫：MongoDB (NoSQL 文件型資料庫)
- ODM 工具：Mongoose (定義 Schema 與資料驗證)
- 資料結構：設計了 Users (使用者)、Animals (動物)、Adoptions (認養紀錄) 三個主要集合。

## 專案結構
114_web_final_project/ 
├── .gitignore              # Git 忽略清單 (忽略 node_modules, .env 等)
├── README.md               # 專案說明文件 (包含簡介、安裝教學、API 規格)
├── api-spec.md             # API 詳細規格書
├── flowchart.png           # 系統流程圖 (由 Mermaid 產生)
│
├── backend/                # [後端] Node.js + Express
│   ├── models/             # 資料庫模型 (Schema)
│   │   ├── User.js         # 使用者設計圖 (email, password, nickname)
│   │   ├── Animal.js       # 動物設計圖 (name, status, description, image)
│   │   └── Adoption.js     # 認養單設計圖 (userId, animalId, adoptDate)
│   │
│   ├── routes/             # API 路由 (路徑規劃)
│   │   ├── auth.js         # 驗證路由 (登入、註冊 - 含 Bcrypt 加密)
│   │   ├── animals.js      # 動物路由 (取得所有動物列表)
│   │   └── adopt.js        # 認養路由 (新增認養、查詢我的認養、取消認養)
│   │
│   ├── .env                # 環境變數 (MONGO_URI, PORT)
│   ├── package.json        # 後端套件清單 (express, mongoose, bcryptjs, cors...)
│   ├── server.js           # 後端入口點 (啟動 Server, 連線 DB, 匯總 Routes)
│   └── seed.js             # 獨立種子腳本 (一鍵寫入 10 隻瀕危動物資料)
│
└── frontend/               # [前端] React + Vite
    ├── public/             # 靜態資源 (不經過打包，直接透過網址存取)
    │   └── images/         # 圖片倉庫
    │       ├── cat.jpg         # 石虎
    │       └── ... (其他動物圖片)
    │
    ├── src/                # 原始程式碼
    │   ├── components/     # 共用元件
    │   │   ├── Navbar.jsx      # 導覽列 (含登入狀態切換、React Icons)
    │   │   └── Footer.jsx      # 頁尾 (聯絡資訊)
    │   │
    │   ├── pages/          # 主要頁面
    │   │   ├── Home.jsx        # 首頁 (Hero區塊 + 動物列表 + 認養按鈕)
    │   │   ├── Login.jsx       # 登入頁 (寫入 localStorage)
    │   │   ├── Register.jsx    # 註冊頁
    │   │   └── Dashboard.jsx   # 會員中心 (顯示認養清單 + 刪除功能)
    │   │
    │   ├── App.jsx         # 路由配置 (Routes) 與 主要版面結構
    │   ├── App.css         # 全域樣式 (定義森林綠配色、Hero 樣式)
    │   └── main.jsx        # 前端入口點 (引入 Bootstrap CSS, BrowserRouter)
    │
    ├── index.html          # 網頁骨架
    ├── package.json        # 前端套件清單 (react, bootstrap, react-router-dom...)
    └── vite.config.js      # Vite 設定檔

## 使用指引 (User Guide)
當後端與前端都順利啟動後，請依照以下流程體驗本平台：
- 進入首頁： 打開瀏覽器前往 http://localhost:5173。您會看到全螢幕的森林意象主視覺，以及下方的瀕危動物列表。
- 註冊會員 (Register)： 點擊右上角「註冊」，輸入 Email、暱稱與密碼建立帳號。系統會自動將密碼加密後存入資料庫。
- 登入系統 (Login)： 使用剛註冊的帳號登入。登入成功後，導覽列會顯示「Hi, [您的暱稱]」與「會員中心」按鈕。
- 進行認養 (Adopt)： 回到首頁，挑選喜歡的動物，點擊卡片下方的「我要認養」按鈕。
- 若未登入：系統會彈出警示並導向登入頁。
- 若已登入：系統會顯示認養成功訊息，並將資料寫入資料庫。
- 會員中心 (Dashboard)： 點擊導覽列的「會員中心」，您可以查看所有已認養的動物清單。
- 取消認養：若想取消，點擊該動物旁的「取消認養」按鈕，資料即會從資料庫中移除。

## 安裝與啟動方式
1. 環境準備
請確保電腦已安裝 Node.js (v14.0 以上版本)。
請確保電腦已安裝 Git。
請確保有可用的 MongoDB 資料庫連線字串 (本機或 Atlas 皆可)。
2. 後端安裝與啟動 (Backend)
請開啟一個終端機 (Terminal)視窗，執行以下指令：
進入後端資料夾
cd backend
安裝依賴套件
npm install
設定環境變數 請在 backend/ 目錄下建立一個名為 .env 的檔案，並貼入以下內容：
PORT=5000
MONGO_URI=mongodb://localhost:27017/animals_db
若使用 MongoDB Atlas，請將上面的網址換成您的雲端連線字串
1. 初始化資料庫 (寫入種子資料)
node seed.js
2. 啟動伺服器
npm run dev
(成功時會顯示：🚀 伺服器啟動於 http://localhost:5000)
3. 前端安裝與啟動 (Frontend)
請開啟 第二個 終端機 (Terminal)視窗，執行以下指令：
進入前端資料夾
cd frontend
安裝依賴套件
npm install     
4. 啟動開發環境
npm run dev
(成功時會顯示：Local: http://localhost:5173/)

## 功能特色
1. 安全與權限管理
密碼加密存儲：實作 Bcrypt 加密技術，確保使用者密碼在資料庫中以雜湊碼 (Hash) 形式儲存，非明碼存儲，保障資安。
2. 動態導覽列 (Smart Navbar)：
未登入狀態：顯示「首頁」、「登入」、「註冊」。
已登入狀態：自動切換顯示「Hi, 暱稱」、「會員中心」、「登出」。
3. 強制登入驗證：使用者瀏覽動物清單時無需登入，但在點擊「我要認養」時，系統會強制檢查登入狀態；若未登入，將自動導向登入頁面，確保每一筆認養紀錄都有對應的使用者。

## CRUD 完整實作
C (Create),新增使用者：訪客註冊會員帳號。新增認養：使用者點擊按鈕建立認養單。,Register.jsx (POST /api/auth/register)Home.jsx (POST /api/adopt)
R (Read),讀取動物列表：首頁載入所有瀕危動物。讀取認養紀錄：會員中心顯示個人的認養清單。登入驗證：比對帳號密碼。,Home.jsx (GET /api/animals)Dashboard.jsx (GET /api/adopt/user/:id)Login.jsx (POST /api/auth/login)
U (Update),資料更新：(後端架構已預留) 目前主要應用於 User Session 狀態更新與種子資料的批次更新。,後端 seed.js 實作了批次更新動物資料庫的功能。
D (Delete),取消認養：使用者在會員中心可刪除特定的認養紀錄。,Dashboard.jsx (DELETE /api/adopt/:id)

## 未來展望
1. 實質捐款整合 
目前的「認養」為虛擬承諾。未來預計串接第三方金流 (如 Stripe 或 ECPay)，讓使用者的點擊能轉化為實際的保育資金。
2. 電子報與成果追蹤 
當使用者認養動物後，系統將定期發送電子郵件，回報該物種的復育進度或保育團體的資金運用報告，讓捐款公開透明，增強使用者的信任感與持續參與意願。
3. 遊戲化成就系統 
設計「保育勳章」或「等級制度」，根據使用者的認養數量或捐款金額給予虛擬獎勵，增加平台的趣味性與黏著度。