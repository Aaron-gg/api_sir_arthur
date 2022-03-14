const mongoose = require('mongoose');
const { Schema } = mongoose;

const purchasesSchema = new Schema({
    alias: String,
    icon: {
        type: String,
        unique: true
    },
    amount: Number,
    currency: String,
    debit_duration: Number,
    billing_date: Date,
    billing_cycle: Date,
    type_purchase: {
        ref: "typePurchase", // indica que esta relacionado con otro modelo de datos
        type: Schema.Types.ObjectId // guardaremos un tipo de dato id de mongo
    },
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('purchases', purchasesSchema);