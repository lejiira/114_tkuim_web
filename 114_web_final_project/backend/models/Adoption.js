// backend/models/Adoption.js
const mongoose = require('mongoose');

const adoptionSchema = new mongoose.Schema({
    // ✨ 這裡必須是 userId，不能是 user_id
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // ✨ 這裡必須是 animalId，不能是 animal_id
    animalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal',
        required: true
    },
    // ✨ 這裡必須是 adoptDate
    adoptDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Adoption', adoptionSchema);