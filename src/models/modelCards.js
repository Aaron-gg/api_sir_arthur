const mongoose = require('mongoose');
const { Schema } = mongoose;

const cardsSchema = new Schema({
    alias: {
        type: String,
        unique: true
    },
    icon: String,
    closing_date: Date,
    due_date: Date,
    purchases: [{
        ref: "purchases", // indica que esta relacionado con otro modelo de datos
        type: Schema.Types.ObjectId // guardaremos un tipo de dato id de mongo
    }],
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('cards', cardsSchema);