const mongoose = require('mongoose');
const { Schema } = mongoose;

const typePurchaseSchema = new Schema({
    cash: Boolean,
    card: {
        ref: "cards", // indica que esta relacionado con otro modelo de datos
        type: Schema.Types.ObjectId // guardaremos un tipo de dato id de mongo
    },
}, {
    versionKey: false
});

module.exports = mongoose.model('typePurchase', typePurchaseSchema);