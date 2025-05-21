const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const session = require('express-session');
const db = require('./db/db');
const routes = require('./routes/routes');


const app = express();

app.use(express.static(path.join(__dirname + '/public')))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(session({
    secret: 'abcd',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000}
}));

app.use('/', routes);

app.listen(3000, () => {
    console.log("App listening on port 3000")
})