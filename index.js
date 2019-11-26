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

app.use(expressSession({
    secret: 'my5ecretpa55cod3',
    saveUninitialized: true,
    resave: true
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const urlEncodedParser = bodyParser.urlencoded({extended: false});

const checkAuth = (req, res, next) => {
    if(req.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/');
    }
}

app.get('/', routes.index);
app.get('/create', routes.create);
app.get('/edit', checkAuth, routes.edit);
app.post('/create', urlEncodedParser, routes.parseCreateData);
app.get('/home', checkAuth, routes.home);
app.post('/home', urlEncodedParser, routes.validateCredentials);
app.get('/loggedOut', routes.loggedOut);
app.post('/update', urlEncodedParser, routes.parseUpdateData);
app.get('/avatar', checkAuth, routes.avatar);
app.post('/updateAvatar', urlEncodedParser, routes.updateAvatar);

app.get('/api', routes.api);
// app.get('/meme', routes.meme);

// app.post('/', urlEncodedParser, (req, res) => {
    
// });

app.listen(3000);