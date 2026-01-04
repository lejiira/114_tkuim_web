// backend/models/User.js
// [檔案功能] 使用者資料表：負責管理會員的帳號、密碼、暱稱與大頭貼
// 對應 P0 功能：會員註冊與登入
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true // 確保信箱不能重複註冊
    },
    password: {
        type: String,
        required: true // 實際專案建議加密，這裡先存明碼以便教學，之後可加分
    },
    nickname: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://i.imgur.com/6VBx3io.png" // 給一個預設大頭貼 URL
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);