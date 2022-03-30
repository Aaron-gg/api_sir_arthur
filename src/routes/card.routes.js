const express = require('express');
const router = express.Router();

const { verifySession } = require('../middlewares/verifySession');
const { verifyCard, verifyAliasDate } = require('../middlewares/verifyCard');
const { controller } = require('../controller/Cards');

router.post('/', [verifySession, verifyAliasDate], controller.createCard);
router.post('/show', [verifySession, verifyCard], controller.showCard);
router.put('/', [verifySession, verifyCard, verifyAliasDate], controller.editCard);
router.delete('/', [verifySession, verifyCard], controller.deleteCard);

module.exports = router;