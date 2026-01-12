# 專案結構
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