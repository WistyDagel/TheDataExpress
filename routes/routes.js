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
    res.render('Home Page', {
        "title": config['titles'][0],
        "config": config
    });
};