const User = require('../models/modelUsers');

const controller = {
    createUser: async (req, res) => {
        const { name, email, password } = req.body;
        const sameEmail = await User.findOne({email: email});
        if(sameEmail) return res.status(403).json({message: "Email ya existe"});
        const newUser = User({
            name,
            email,
            password: await User.encryptPassword(password),
        });
        const saveUser = await newUser.save();
        res.status(200).json({saveUser});
    },
    showUser: async (req, res) => {
        const user = await User.findById(req.userId).populate("cards");
        res.status(200).json({
            name: user.name,
            email: user.email,
            cards: user.cards,
            purchases: user.purchases,
        });
    },
    editUser: async (req, res) => {
        const user = await User.findById(req.userId);
        let { name, password } = req.body;
        password = await User.encryptPassword(password)
        await User.findByIdAndUpdate(user.id, { name, password});
        res.status(200).json({
            message: "Datos actualizados"
        });
    },
    deleteUser: async (req, res) => {
        await User.findByIdAndDelete(req.userId);
        res.status(200).json({
            message: "Usuario eliminado"
        });
    }
}

module.exports = {
    controller
}