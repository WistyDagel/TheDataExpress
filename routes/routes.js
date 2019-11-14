const config = require('../config');

// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/data');

// const mdb = mongoose.connection;
// mdb.on('error', console.error.bind(console, 'connection error:'));
// mdb.once('open', callback => {
// });

// var accountSchema = mongoose.Schema({
//     username: String,
//     hashedPassword: String,
//     email: String,
//     age: String,
//     question1: String,
//     answer1: String,
//     question2: String,
//     answer2: String,
//     question3: String,
//     answer3: String,
// });

// var Account = mongoose.model('Account_Collection', accountSchema);

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
    res.render('Create an Account')
};