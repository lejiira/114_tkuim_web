# Week 12 

## 問題整合:
- Q1: npm run dev 無法啟動，顯示 "Missing script: dev"？
原因：專案初始化時 package.json 沒有定義 dev 指令，且缺少 server.js 主程式。
解決：
建立 server.js。
修正 package.json，加入 "dev": "node server.js" 與 "type": "module"。
執行 npm install 安裝 express 等依賴套件。

- Q2: 執行後端時報錯 ERR_MODULE_NOT_FOUND (找不到 db.js)？
原因：db.js 檔案原本放在 Week12/ 外層，但 server.js 引用路徑是同層 (./db.js)。
解決：將 db.js 移動至 server/ 資料夾內，符合模組化結構。

- Q3: 程式碼重複宣告錯誤 Identifier 'deleteParticipant' has already been declared？
原因：在編輯 participants.js 時，複製貼上導致同一個函式出現兩次。
解決：清空檔案，重新貼上正確且唯一的 Repository 程式碼。

- Q4: 登入時出現 500 Error 或 Command find requires authentication？
原因 (關鍵)：
後端讀不到 .env，導致 MONGO_URI 為 undefined，自動降級為 localhost 無密碼連線。
Docker 資料庫內沒有正確建立 week12-admin 使用者 (因為舊的 mongo-data 導致初始化腳本未執行)。
解決：
修正環境變數：將 .env 移動至 server/ 資料夾內，確保 dotenv 能讀取到。
資料庫大掃除：停止 Docker -> 刪除 mongo-data 資料夾 (強制重置) -> 重新 docker-compose up -d。
確認初始化：檢查 Docker Logs 看到 User "week12-admin" created 代表成功。

- Q5: 前端與後端整合時，如何處理 Token？
機制：
登入 (Login)：後端驗證成功後回傳 JWT Token，前端將其存入 localStorage。
請求 (Request)：前端發送 GET 或 POST 到 /api/signup 時，必須在 Header 加入 Authorization: Bearer <Token>。
後端驗證：middleware/auth.js 攔截請求，驗證 Token 有效性並解析使用者身分 (req.user)。

- Q6: 實作權限控管 (Admin vs Student)
邏輯：
GET (查詢)：if (role === 'admin') 查全部；否則只查 findByOwner(MyID)。
DELETE (刪除)：只有 admin 或該筆資料的 ownerId 等於當前使用者才能刪除。


## 專案基本架構圖 (Project Structure)

本專案採用前後端分離架構，搭配 MongoDB 資料庫容器化部署。

```bash
Week12/
├── client/                 # [前端] 負責畫面顯示與使用者互動
│   ├── index.html          # 主頁面 (包含登入介面、報名表單、資料列表)
│   ├── login.js            # 處理登入邏輯 (Fetch API 呼叫 /auth/login) & JWT Token 儲存
│   └── signup_form.js      # 處理報名邏輯 (CRUD 操作，需帶 Header Authorization)
│
├── server/                 # [後端] Node.js + Express API 伺服器
│   ├── routes/             # 路由層 (API 路徑定義)
│   │   ├── auth.js         # 處理 /auth 路由 (註冊、登入、發放 Token)
│   │   └── signup.js       # 處理 /api/signup 路由 (報名資料的增刪查改)
│   │
│   ├── repositories/       # 資料層 (直接對資料庫操作)
│   │   ├── users.js        # 操作 users 集合 (找帳號、建帳號)
│   │   └── participants.js # 操作 participants 集合 (報名名單 CRUD)
│   │
│   ├── middleware/         # 中介軟體
│   │   └── auth.js         # JWT 驗證守門員 (解析 Token，確認身分與權限)
│   │
│   ├── db.js               # 資料庫連線設定 (負責連線 MongoDB)
│   ├── server.js           # 程式進入點 (啟動 Server、掛載路由、讀取 .env)
│   ├── package.json        # 專案設定檔 (定義 npm scripts 與依賴套件)
│   └── .env                # 環境變數 (存放 MONGO_URI, PORT, JWT_SECRET，不應上傳 Github)
│
└── docker/                 # [基礎設施] 容器化環境
    ├── docker-compose.yml  # 定義 MongoDB 服務與環境變數
    └── mongo-init.js       # 資料庫初始化腳本 (建立 week12-admin 帳號與資料庫)

```bash



