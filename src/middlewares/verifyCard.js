const User = require('../models/modelUsers');

const verifyCard = async (req, res, next) => {
    try {
        const { id } = req.body;
        if(!id) return res.status(404).json({message: 'id no provided'});
        const user = await User.findById(req.userId);
        if(!user.cards.includes(id)) return res.status(404).json({message: 'id no valida'});
        req.cardId = id;
        next();
    }
    catch (error){
        return res.status(401).json({message: 'Id no valida'});
    }
}

module.exports = {
    verifyCard
}