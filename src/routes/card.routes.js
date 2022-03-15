const express = require('express');
const router = express.Router();

const { verifySession } = require('../middlewares/verifySession');
const { verifyCard } = require('../middlewares/verifyCard');
const { controller } = require('../controller/Cards');

router.post('/', verifySession, controller.createCard);
router.post('/show', [verifySession, verifyCard], controller.showCard);
router.put('/', [verifySession, verifyCard], controller.editCard);
router.delete('/', [verifySession, verifyCard], controller.deleteCard);

module.exports = router;