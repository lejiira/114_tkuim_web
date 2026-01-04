// backend/models/Adoption.js
// [檔案功能] 認養關聯表：紀錄「哪個使用者」在「什麼時候」認養了「哪隻動物」
// 對應 P0 功能：核心互動 (User <-> Animal 關聯)

const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // 關聯到 User 模型
        required: true
    },
    animal_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal', // 關聯到 Animal 模型
        required: true
    },
    adoption_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Adoption', adoptionSchema);