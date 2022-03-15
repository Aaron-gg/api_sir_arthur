const express = require('express');
const router = express.Router();

const { verifySession } = require('../middlewares/verifySession');
const { controller } = require('../controller/Auth');

router.post('/signin', controller.singIn);
router.post('/logout', verifySession, controller.logOut);

module.exports = router;