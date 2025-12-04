# README：啟動指令、環境需求、測試方式、常見問題。

### 啟動指令、環境需求:
1. 啟動資料庫
使用 Docker Compose 啟動 MongoDB：docker-compose up -d
2. 啟動後端
進入 server 資料夾並安裝依賴套件：cd server > npm run dev
3. 設定環境變數 (.env)
在 `server` 資料夾下建立 `.env` 檔案
> `.env` 檔案包含敏感資訊（資料庫密碼），請勿將其提交至版本控制系統。

###  測試方式: 使用postman連線和api.http連線 。(如圖./screenshot)

###  必做任務:
#### 6.API 層加入分頁
> 目的:不要一次給全部，而是「每次只給一小部分（例如 10 筆）」。就像 Google 搜尋結果一樣，它不會一次列出幾百萬筆結果，而是讓你一頁一頁看。 >> 防止後端爆炸、網路塞車、瀏覽器當機
> 技術:MongoDB 使用兩個指令來達成這件事：skip (跳過) 和 limit (限制數量)。
> 假設你要看「第 2 頁」，每頁顯示 10 筆：
limit(10)：意思是「我這次只要拿 10 筆就好」。| skip(10)：意思是「請幫我跳過前面那 10 筆（第一頁的資料），從第 11 筆開始拿」。

#### 7.Mongo URL、帳號、密碼需透過 .env 管理，並在 README 清楚說明每個欄位用途。
.env 檔用來把「機密或環境設定」從程式碼分離出來，讓同一份程式可在不同環境（開發、測試、正式）用不同設定執行，且不會把密碼或機敏資訊推到版本控制。
 >欄位用途:
 PORT=3001:Express/後端監聽的埠號。程式通常用 process.env.PORT 讀取。
 MONGODB_URI=mongodb://...... : MongoDB 的連線字串。
 ALLOWED_ORIGIN=* :CORS 的允許來源。* 代表允許所有來源  ，也就是允許跨域存取 (CORS) 的來源網址。

#### 8.Mongo Shell 指令範例（寫在 README）
>常用操作指令
**查看所有報名資料 (依照時間排序)：**
db.participants.find().sort({ createdAt: -1 })
**新增一筆資料：**
db.participants.insertOne({
  name: "Shell測試員",
  email: "shell@example.com",
  phone: "0900000000",
  createdAt: new Date(),
  updatedAt: new Date()
})
**尋找特定 Email 的人：**
db.participants.findOne({ email: "shell@example.com" })
**刪除資料：**
db.participants.deleteOne({ email: "shell@example.com" })

### 常見問題1:Compass 畫面不會自動更新
>找到一個 綠色的 Find 按鈕。在 Find 按鈕的 下方，有一排小圖示。找到 1-1 of 1 文字旁邊的 「旋轉箭頭圖示 (Refresh)」。MongoDB Compass 比較像是一個「快照 (Snapshot)」檢視器。它只會顯示你打開那一瞬間的資料庫狀態。當你的後端 (Node.js) 塞入新資料後，Compass 並不知道，必須由你手動告訴它。

### 指令:
docker ps:查詢目前有哪些 Docker 容器在運作|STATUS 欄位顯示 Up (代表活著)
docker exec -it mongodb mongosh "mongodb://week11-user:week11-pass@localhost:27017/week11?authSource=week11" :
  成功畫面： 游標變成 week11> 的提示符號，代表已進入資料庫裡，即可以直接透過終端機 (Terminal) 操作資料庫，
  例如:輸入 db.participants.find() 等shell指令 




