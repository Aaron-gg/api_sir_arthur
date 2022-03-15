const express = require('express');
const router = express.Router();

const { verifySession } = require('../middlewares/verifySession');
const { controller } = require('../controller/Users');

router.post('/', controller.createUser);
router.get('/', verifySession, controller.showUser);
router.put('/', verifySession, controller.editUser);
router.delete('/', verifySession, controller.deleteUser);

module.exports = router;