const User = require('../models/modelUsers');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../keys');

const controller = {
    singIn:  async (req, res) => {
        const userFound = await User.findOne({email: req.body.email});
        if(!userFound) return res.status(403).json({message: "Usuario no encontrado"});
        const mastchPassword = await User.comparePassword(req.body.password, userFound.password);
        if(!mastchPassword) return res.status(401).json({token: null, message: 'Contraseña invalida'});
        const token = jwt.sign({id: userFound._id}, secretKey, {
            expiresIn: '1d'
        });
        //console.log(userFound);
        res.status(200).json({
            token: token
        });
    },
}

module.exports = {
    controller
}