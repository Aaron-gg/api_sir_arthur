const express = require('express');
const router = express.Router();

const { controller } = require('../controller/Auth');

router.post('/signin', controller.singIn);

module.exports = router;