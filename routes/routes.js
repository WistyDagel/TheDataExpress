const bcrypt = require('bcrypt-nodejs');
const config = require('../config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

const mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', callback => {
});

var accountSchema = mongoose.Schema({
    username: String,
    hashedPassword: String,
    email: String,
    age: String,
    answer1: String,
    answer2: String,
    answer3: String,
});

var Account = mongoose.model('Account_Collection', accountSchema);

exports.index = (req, res) => {
    res.render('index', {
        "title": config['menu'][0][0],
        "username": config['formData'][0],
        "password": config['formData'][1],
        "noAccount": config['homePage'][0],
        "config": config
    });
};

exports.create = (req, res) => {
    res.render('create', {
        "title": config['menu'][1],
        "edit": config['menu'][2],
        "questions": config['formQuestions'],
        "formData": config['formData']
    });
};

const createAccount = (req, res) => {
    var account = new Account({
        username: req.body.username,
        hashedPassword: req.body.hashedPassword,
        email: req.body.email,
        age: req.body.age,
        answer1: req.body.answer1,
        answer2: req.body.answer2,
        answer3: req.body.answer3
    });
    account.save((err, account) => {
        if (err) return console.error(err);
        console.log(account.username);
        console.log(account.hashedPassword);
        console.log(account.email);
        console.log(account.age);
        console.log(account.answer1);
        console.log(account.answer2);
        console.log(account.answer3);
    });
    res.redirect('/');
};

exports.parseCreateData = (req, res) => {
    bcrypt.hash(req.body.password, null, null, (err, hash) => {
        req.body.hashedPassword = hash;
        createAccount(req, res);
    });
}

exports.edit = (req, res) => {
    previousData = [
        req.body.username, 
        req.body.password, 
        req.body.email, 
        req.body.age, 
    ]
    
    previousAnswers = [
        req.body.answer1, 
        req.body.answer2, 
        req.body.answer3
    ]

    res.render('edit', {
        "pData": previousData,
        "pAnswers": previousAnswers,
        "title": config['menu'][2][0],
        "data": config['editData'][0],
        "answers": config['editData'][1],
        "questions": config['questions']
    });
};