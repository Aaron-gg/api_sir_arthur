const User = require('../models/modelUsers');
const Card = require('../models/modelCards');

const controller = {
    createCard: async (req, res) => {
        const { alias, icon, closing_date } = req.body;
        let aliasSame = false;

        const aliasFound = await User.findById(req.userId).populate('cards', 'alias');
        aliasFound.cards.forEach(element => {
            if(element.alias == alias) aliasSame = true;
        });
        if(aliasSame) return res.status(403).json({message: "Alias ya existe"});

        const closingDate = new Date(2022, 03, 14);
        const dueDate = new Date(2022, 03, 14);
        dueDate.setDate(dueDate.getDate() + 20);

        const newCard = Card({
            alias,
            icon,
            closing_date: closingDate,
            due_date: dueDate,
        });
        
        const saveCard = await newCard.save();

        await User.findOneAndUpdate( { _id: req.userId }, { $push: { cards: saveCard._id }});
        res.status(200).json({saveCard});
    },
    showCard: async (req, res) => {
        const card = await Card.findById(req.cardId);
        res.status(200).json({
            alias: card.alias,
            icon: card.icon,
            purchclosing_date: card.closing_date,
            due_date: card.due_date,
            purchases: card.purchases,
        });
    },
    editCard: async (req, res) => {
        const { alias, icon, closing_date } = req.body;
        await Card.findByIdAndUpdate(req.cardId, { alias, icon });
        res.status(200).json({
            message: "Datos actualizados"
        });
    },
    deleteCard: async (req, res) => {
        await Card.findByIdAndDelete(req.cardId);
        const user = await User.findById(req.userId);
        const newArrayCards = user.cards.filter((element) => element != req.cardId);
        await User.findOneAndUpdate( { _id: req.userId }, { cards: newArrayCards });
        res.status(200).json({
            message: "Tarjeta eliminada"
        });
    }
}

module.exports = {
    controller
}