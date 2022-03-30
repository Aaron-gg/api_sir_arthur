const User = require('../models/modelUsers');

const verifyCard = async (req, res, next) => {
    try {
        const { id } = req.body;
        if(!id) return res.status(404).send('id no provided');
        const user = await User.findById(req.userId);
        if(!user.cards.includes(id)) return res.status(404).send('id no valida');
        req.cardId = id;
        next();
    }
    catch (error){
        return res.status(401).send('Id no valida');
    }
}

const verifyAliasDate = async (req, res, next) => {
    try {
        const { alias, closing_date } = req.body;
        
        if(!alias) return res.status(404).send('Alias no ingresado');

        let aliasSame = false;
        const aliasFound = await User.findById(req.userId).populate('cards', 'alias');
        aliasFound.cards.forEach(element => {
            if(element.alias == alias) aliasSame = true;
        });
        if(aliasSame) return res.status(403).send("Alias ya existe");

        const closingDate = new Date(closing_date);
        const dueDate = new Date(closing_date);
        if(isNaN(Date.parse(closingDate))) return res.status(403).send("Fecha no valida");
        dueDate.setDate(dueDate.getDate() + 20);

        req.alias = alias;
        req.closingDate = closingDate;
        req.dueDate = dueDate;

        next();
    }
    catch (error){
        return res.status(401).send('Error en mandar alias y/o fecha');
    }
}

module.exports = {
    verifyCard,
    verifyAliasDate
}