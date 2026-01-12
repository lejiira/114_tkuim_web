// backend/seed.js
// [檔案功能] 種子資料腳本：執行此檔案可重置資料庫並寫入範例資料
// 執行指令：node seed.js

const mongoose = require('mongoose');
require('dotenv').config(); // 載入環境變數 (讀取 .env 裡的 MONGO_URI)
const Animal = require('./models/Animal'); // 引入動物模型

// 10 隻瀕危動物種子資料
const sampleAnimals = [
    {
        name: "石虎",
        status: "瀕危",
        description: "台灣現存唯一的原生貓科動物，特徵是耳後有黑底白斑，主要棲息在淺山地區。",
        image: "/images/Cat.jpg"
    },
    {
        name: "台灣黑熊",
        status: "易危",
        description: "台灣特有亞種，胸前有V字型白色斑紋，是台灣最大的食肉目動物。",
        image: "/images/Bear.jpg"
    },
    {
        name: "櫻花鉤吻鮭",
        status: "極危",
        description: "冰河時期孑遺生物，又有「國寶魚」之稱，僅分布於大甲溪上游。",
        image: "/images/Fish.jpg"
    },
    {
        name: "台灣穿山甲",
        status: "易危",
        description: "全身覆蓋堅硬鱗片，遇到危險會捲成球狀，是全球被走私最嚴重的哺乳類之一。",
        image: "/images/mountain.jpg"
    },
    {
        name: "歐亞水獺",
        status: "瀕危",
        description: "台灣本島已滅絕，目前僅存於金門，夜行性動物，善於游泳與潛水。",
        image: "/images/water.jpg"
    },
    {
        name: "黑面琵鷺",
        status: "瀕危",
        description: "擁有獨特的扁平匙狀嘴，每年冬天會飛來台灣台南曾文溪口過冬的候鳥。",
        image: "/images/blackbird.jpg"
    },
    {
        name: "台灣山椒魚",
        status: "易危",
        description: "冰河孑遺生物，台灣特有種，生活在高海拔山區的溪流源頭，數量極為稀少。",
        image: "/images/mountainfish.jpg"
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
        console.log('成功寫入動物資料！');

        // 4. 結束連線
        mongoose.connection.close();
        console.log('連線已關閉');
    } catch (error) {
        console.error('發生錯誤:', error);
        mongoose.connection.close();
    }
};

seedDB();