// backend/models/Animal.js
// [檔案功能] 動物資料表：儲存所有瀕危動物的名稱、圖片、保育等級與介紹
// 對應 P0 功能：瀕危動物總覽
const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String, // 圖片通常存 URL
        required: true
    },
    status: {
        type: String, // 例如： "極危", "瀕危", "易危"
        enum: ['極危', '瀕危', '易危', '無危'], // 限制只能填這些
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Animal', animalSchema);