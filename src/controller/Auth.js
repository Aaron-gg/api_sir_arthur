const User = require('../models/modelUsers');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../keys');
const recoverPasswordMail  = require('../mails/recoverPassword');

const controller = {
    singIn:  async (req, res) => {
        const userFound = await User.findOne({email: req.body.email});
        if(!userFound) return res.status(401).send("Usuario no encontrado");
        const matchPassword = await User.comparePassword(req.body.password, userFound.password);
        if(!matchPassword) return res.status(403).send("Contraseña invalida");
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
    },
    recoverPassword: async (req, res) => {
        const { email } = req.body;
        const user = await User.findOne({email: email});
        if(!user) return res.status(401).send("Email no encontrado");
        let accessCode = "";
        for(let i = 0; i < 4; i++){
            accessCode = accessCode + Math.floor((Math.random() * 10)) + "";
        }
        const accessCodeCrypt = await User.encryptPassword(accessCode);
        await User.findByIdAndUpdate(user._id, {accessCode: accessCodeCrypt});
        recoverPasswordMail(accessCode, email);
        res.status(200).send("Correo enviado");
        //res.status(200).send(accessCode);
    },
    authCode: async (req, res) => {
        const { email, code } = req.body;
        const user = await User.findOne({email: email});
        const matchCode = await User.comparePassword(code, user.accessCode);
        if(!matchCode) return res.status(403).send("Codigo invalido");
        const token = jwt.sign({id: user._id}, code, {
            expiresIn: '600s'
        });
        res.status(200).json({
            tokenRecoverPassword: token
        });
    },
    changePassword: async (req, res) => {
        const { newPassword } = req.body;
        if(!newPassword) return res.status(401).send("Contraseña no ingresada");
        await User.findByIdAndUpdate(req.userId, {password: await User.encryptPassword(newPassword)});
        res.status(200).send("Contraseña actualizada");
    }
}

module.exports = {
    controller
}