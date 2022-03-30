const express = require('express');
const router = express.Router();

const { verifySession, clearBlackList, verifyCodeToken } = require('../middlewares/verifySession');
const { controller } = require('../controller/Auth');

router.post('/signin', controller.singIn);
router.post('/logout', [verifySession, clearBlackList], controller.logOut);
router.post('/recover-password', controller.recoverPassword);
router.post('/auth-code', controller.authCode);
router.post('/recover-change-password', [verifyCodeToken], controller.changePassword);

module.exports = router;