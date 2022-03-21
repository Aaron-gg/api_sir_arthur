const express = require('express');
const router = express.Router();

const { verifySession, clearBlackList } = require('../middlewares/verifySession');
const { controller } = require('../controller/Auth');

router.post('/signin', controller.singIn);
router.post('/logout', [verifySession, clearBlackList], controller.logOut);

module.exports = router;