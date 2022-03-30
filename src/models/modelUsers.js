const mongoose = require('mongoose');
const brypt = require('bcryptjs');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        unique: true
    },
    cards: [{
        ref: "cards", // indica que esta relacionado con otro modelo de datos
        type: Schema.Types.ObjectId // guardaremos un tipo de dato id de mongo
    }],
    purchases: [{
        ref: "purchases", // indica que esta relacionado con otro modelo de datos
        type: Schema.Types.ObjectId // guardaremos un tipo de dato id de mongo
    }],
    blackListToken: Array,
    accessCode: {
        type: String,
    },
}, {
    timestamps: true,
    versionKey: false
});

userSchema.statics.encryptPassword = async (password) => {
    const salt = await brypt.genSalt(10);
    return await brypt.hash(password, salt);
}
userSchema.statics.comparePassword = async (password, recivedPassword) => {
    return await brypt.compare(password, recivedPassword);
}

module.exports = mongoose.model('users', userSchema);