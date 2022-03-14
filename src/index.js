const express = require('express');

const usersRoute = require('./routes/user.routes');
const authRoute = require('./routes/auth.routes');

//Initialization
const app = express();
require('./database');

//Setings
app.set('port', process.env.PORT || 9999);
app.use(express.json());

//Routes
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});