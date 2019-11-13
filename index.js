const express = require('express');
const expressSession = require('express-session');
const pug = require('pug');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt-nodejs');
const routes = require('./routes/routes.js');
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname + '/views'));
app.use(express.static(path.join(__dirname + '/public')));

const urlEncodedParser = bodyParser.urlencoded({extended: false});

app.get('/', routes.index);
app.get('/create', routes.create);
app.get('/edit', routes.edit);
app.get('/loggedOut', routes.loggedOut);
app.get('/meme', routes.meme);

app.listen(3000);