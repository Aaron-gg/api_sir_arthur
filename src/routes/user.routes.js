const express = require('express');
const router = express.Router();

const { verifySession, clearBlackList } = require('../middlewares/verifySession');
const { controller } = require('../controller/Users');

router.post('/', controller.createUser);
router.get('/', [verifySession, clearBlackList], controller.showUser);
router.put('/', verifySession, controller.editUser);
router.delete('/', verifySession, controller.deleteUser);

module.exports = router;

/*
paylot cuerpo de peticion 

estados

200 ok
201 created
204 no content(no paylot)

301 moved permanent
202|203 found at this other url
307 temporary redirect
308 permanent redirect

400 bad request
401 unauthorized(server no sabe quien es)
403 forbidden(server sabe quien es pero no permite acceso)
404 not found
405 method not allowed(cuado tenemos una url que admite metodo GET y mandemos un POST)

500 internal server error
502 bad gateway
503 service unavailable
*/