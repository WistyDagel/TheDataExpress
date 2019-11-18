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
app.use(cookieParser('login'));

const urlEncodedParser = bodyParser.urlencoded({extended: false});

const checkAuth = (req, res, next) => {
    if(req.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/');
    }
}

app.use(expressSession({
    secret: 'my5ecretpa55cod3',
    saveUninitialized: true,
    resave: true
}));

app.get('/', routes.index);
app.get('/create', routes.create);
app.get('/edit', routes.edit);
app.post('/create', urlEncodedParser, routes.parseCreateData);
app.post('/edit', urlEncodedParser, routes.edit);
app.get('/home', checkAuth, routes.home);
app.post('/home', routes.home);
app.get('/loggedOut', routes.loggedOut);
// app.get('/meme', routes.meme);

app.post('/', urlEncodedParser, (req, res) => {
    if(req.body.username == 'user' && req.body.password == 'pass'){
        req.session.user = {
            isAuthenticated: true,
            username: req.body.username
        };
        res.redirect('/home');
    } else {
        res.redirect('/');
    }
});

app.listen(3000);