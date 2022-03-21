const User = require('../models/modelUsers');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../keys');

const controller = {
    singIn:  async (req, res) => {
        const userFound = await User.findOne({email: req.body.email});
        if(!userFound) return res.status(401).send("Usuario no encontrado");
        const mastchPassword = await User.comparePassword(req.body.password, userFound.password);
        if(!mastchPassword) return res.status(403).send("Contraseña invalida");
        const token = jwt.sign({id: userFound._id}, secretKey, {
            expiresIn: '6h'
        });
        res.status(200).json({
            token: token
        });
    },
    logOut: async (req, res) => {
        const ExpiredToken = req.headers["x-access-token"];
        await User.findOneAndUpdate( { _id: req.userId }, { $push: { blackListToken: ExpiredToken }});
        res.status(200).send("Usuario deslogeado");
    }
}

module.exports = {
    controller
}