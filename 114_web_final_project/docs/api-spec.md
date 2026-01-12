# 瀕危動物認養平台 - API 規格文件 

## 1. 會員驗證 (Authentication)
### 會員註冊
建立新的使用者帳號。
- **URL**: `/auth/register`
- **Method**: `POST`
- **Request Body**:
```json
{
  "nickname": "測試小明",
  "email": "test@example.com",
  "password": "password123"
}
``` 

- **Success Response (201 Created)**:
```json
{
  "message": "註冊成功！請重新登入",
  "user": {
    "_id": "65a123...",
    "nickname": "測試小明",
    "email": "test@example.com",
    "password": "$2a$10$..." 
  }
}
```

- **Error Response (400 Bad Request)**:
```json
{ "message": "此信箱已被註冊！" }
```

### 會員登入
驗證使用者身分並回傳使用者資訊。
- **URL**: `/auth/login`
- **Method**: `POST`
- **Request Body**:
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

- **Success Response (200 OK)**:
```json
{
  "message": "登入成功",
  "user": {
    "_id": "65a123...",
    "nickname": "測試小明",
    "email": "test@example.com",
    "avatar": "" 
  }
}
```

- **Error Response (401 Unauthorized)**:
```json
{ "message": "密碼錯誤" }
```

## 2. 動物資料 (Animals)
### 取得所有動物列表
獲取系統中所有瀕危動物的詳細資訊。
- **URL**: `/animals`
- **Method**: `GET`
- **Success Response (200 OK)**:
```json
[
  {
    "_id": "65b456...",
    "name": "石虎",
    "status": "瀕危",
    "description": "台灣現存唯一的原生貓科動物...",
    "image": "/images/cat.jpg"
  },
  {
    "_id": "65b457...",
    "name": "台灣黑熊",
    "status": "易危",
    "description": "胸前有V字型白色斑紋...",
    "image": "/images/bear.jpg"
  }
]
```

### 初始化種子資料 (Seeding)
開發測試用。清空並重新寫入 10 筆預設的瀕危動物資料。
- **Path**: `backend/seed.js`
- **Method**: `GET` (Execute via node command)
- **Success Response (200 OK)**: (Console output indicating success)


## 3. 認養功能 (Adoption)
### 新增認養 (Create)
使用者對特定動物進行認養。
- **URL**: `/adopt`
- **Method**: `POST`
- **Request Body**:
```json
{
  "userId": "65a123...",   // 使用者 ID
  "animalId": "65b456..."  // 動物 ID
}
```

- **Success Response (201 Created)**:
```json
{
  "message": "恭喜！認養成功！",
  "adoption": {
    "_id": "65c789...",
    "userId": "65a123...",
    "animalId": "65b456...",
    "adoptDate": "2026-01-12T..."
  }
}
```

- **Error Response (400 Bad Request)**:
```json
{ "message": "你已經認養過這隻動物囉！" }
```

### 查詢個人認養清單 (Read)
取得特定使用者的所有認養紀錄 (包含動物詳細資料)。
- **URL**: `/adopt/user/:userId`
- **Method**: `GET`
- **URL Params**: `userId` (使用者 ID)
- **Success Response (200 OK)**:
```json
[
  {
    "_id": "65c789...",
    "userId": "65a123...",
    "adoptDate": "2026-01-12T...",
    "animalId": {   // 透過 populate 關聯查詢自動填入
      "_id": "65b456...",
      "name": "石虎",
      "status": "瀕危",
      "image": "/images/cat.jpg"
    }
  }
]
```

### 取消認養 (Delete)
刪除一筆認養紀錄。
- **URL**: `/adopt/:id`
- **Method**: `DELETE`
- **URL Params**: `id` (認養單的 _id, 不是動物 ID)
- **Success Response (200 OK)**:
```json
{ "message": "已取消認養 " }
```

- **Error Response (404 Not Found)**:
```json
{ "message": "找不到這筆認養紀錄" }
```
