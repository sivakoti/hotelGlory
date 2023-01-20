const express = require("express");
const bodyParser = require('body-parser');
require('dotenv').config();

const appUses = [
    { apiPath: '/getroom', routerPath: './router/room' },
    { apiPath: '/reservation', routerPath: './router/reserveroom' },
    { apiPath: '/users', routerPath: './router/users' }
]

const app = express();
const dbconf = require("./db")
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
appUses.forEach(use => {
    app.use(use.apiPath, require(use.routerPath));
})

const port =  8888;
app.listen(port, () => console.log(`server started using port ${port}`));
