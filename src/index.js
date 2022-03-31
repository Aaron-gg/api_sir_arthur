const express = require('express');

const usersRoute = require('./routes/user.routes');
const cardsRoute = require('./routes/card.routes');
const authRoute = require('./routes/auth.routes');

//Initialization
const app = express();
require('./database');

//Setings
app.set('port', process.env.PORT || 9999);
app.use(express.json());

//Routes
app.use('/api/users', usersRoute);
app.use('/api/cards', cardsRoute);
app.use('/api/auth', authRoute);
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});


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