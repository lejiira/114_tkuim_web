// docker/mongo-init.js
db.createUser({
  user: 'week11-user',
  pwd: 'week11-pass',
  roles: [{ role: 'readWrite', db: 'week11' }]
});

db.createCollection('participants');
db.participants.insertOne({
  name: '示範學員',
  email: 'demo@example.com',
  phone: '0912345678',
  createdAt: new Date()
});

//mongo-init.js: 這個檔案會在 MongoDB 容器啟動時(docker compose up)自動執行，
//目的:用來初始化資料庫，建立使用者和集合，並插入一筆示範資料。
//當容器第一次啟動時，會根據這個腳本來設定資料庫環境。  
// 注意: docker compose up 之前，必須先建立 mongo-init 
