// backend/seed.js
// [檔案功能] 種子資料腳本：執行此檔案可重置資料庫並寫入範例資料
// 執行指令：node seed.js

const mongoose = require('mongoose');
require('dotenv').config();
const Animal = require('./models/Animal'); // 引入動物模型

// 範例動物資料
const sampleAnimals = [
    {
        name: "石虎",
        image: "https://i.imgur.com/Xk7tYyD.jpeg", // 網路圖源
        conservation_level: "瀕危",
        description: "台灣現存唯一的原生貓科動物，特徵是耳後有黑底白斑。"
    },
    {
        name: "台灣黑熊",
        image: "https://i.imgur.com/5l3lXyB.jpeg",
        conservation_level: "易危",
        description: "台灣特有亞種，胸前有V字型白色斑紋，是台灣最大的食肉目動物。"
    },
    {
        name: "櫻花鉤吻鮭",
        image: "https://i.imgur.com/r7w8yqL.jpeg",
        conservation_level: "極危",
        description: "台灣特有亞種，冰河時期孑遺生物，又有「國寶魚」之稱。"
    }
];

const seedDB = async () => {
    try {
        // 1. 連線資料庫
        await mongoose.connect(process.env.MONGO_URI);
        console.log('連線成功，準備寫入種子資料...');

        // 2. 清空舊資料 (避免重複)
        await Animal.deleteMany({});
        console.log('舊資料已清除');

        // 3. 寫入新資料
        await Animal.insertMany(sampleAnimals);
        console.log('成功寫入 3 筆動物資料！');

        // 4. 結束連線
        mongoose.connection.close();
        console.log('連線已關閉');
    } catch (error) {
        console.error('發生錯誤:', error);
        mongoose.connection.close();
    }
};

seedDB();