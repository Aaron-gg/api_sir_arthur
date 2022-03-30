const User = require('../models/modelUsers');
const Card = require('../models/modelCards');

const controller = {
    createCard: async (req, res) => {
        const { icon } = req.body;

        const newCard = Card({
            userRel: req.userId,
            alias: req.alias,
            icon,
            closing_date: req.closingDate,
            due_date: req.dueDate,
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
        const { icon } = req.body;
        await Card.findByIdAndUpdate(req.cardId, { 
            alias: req.alias,
            icon,
            closing_date: req.closingDate,
            due_date: req.dueDate,
        });
        res.status(200).send("Datos actualizados");
    },
    deleteCard: async (req, res) => {
        await Card.findByIdAndDelete(req.cardId);
        const user = await User.findById(req.userId);
        const newArrayCards = user.cards.filter((element) => element != req.cardId);
        await User.findOneAndUpdate( { _id: req.userId }, { cards: newArrayCards });
        res.status(200).send("Tarjeta eliminada");
    }
}

module.exports = {
    controller
}