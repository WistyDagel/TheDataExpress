const bcrypt = require('bcrypt-nodejs');
const config = require('../config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data', { useNewUrlParser: true, useUnifiedTopology: true });

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
    const cookie = () => {
        res.cookie('lastVisit', new Date().toString(), {maxAge: 9999999999});
    };
    var visitMsg;
    if(req.cookies.lastVisit) {
        visitMsg = 'last visit: ' + req.cookies.lastVisit;
        res.clearCookie('lastVisit');
        cookie();
    } else {
        cookie();
        visitMsg = 'This is your first time here!';
    }

    res.render('index', {
        "title": config['menu'][0][0],
        "username": config['formData'][0],
        "password": config['formData'][1],
        "noAccount": config['homePage'][0],
        config,
        visitMsg,
        "graphTitle": config.menu[6]
    });
};

exports.create = (req, res) => {
    res.render('create', {
        "title": config['menu'][1],
        "edit": config['menu'][2],
        "questions": config['questions'],
        "answers": config['answers'],
        "formData": config['formData']
    });
};

const createAccount = (req, res) => {
    var account = new Account({
        username: req.body.username,
        hashedPassword: req.body.hashedPassword,
        email: req.body.email,
        age: req.body.age,
        answer1: req.body.answers[0],
        answer2: req.body.answers[1],
        answer3: req.body.answers[2]
    });
    account.save((err, account) => {
        if (err) return console.error(err);
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
    // res.send(req.session.user.account);
    previousData = [
        req.session.user.account.username, 
        req.session.user.account.email, 
        req.session.user.account.age, 
    ]
    
    previousAnswers = [
        req.session.user.account.answer1, 
        req.session.user.account.answer2, 
        req.session.user.account.answer3
    ]

    res.render('edit', {
        config,
        "pData": previousData,
        "pAnswers": previousAnswers,
        "title": config['menu'][2][0],
        "data": config['editData'][0],
        "answers": config['answers'],
        "questions": config['questions']
    });
};

exports.validateCredentials = (req, res) => {
    Account.findOne({'username': req.body.username}, (err, account) => {
        if (!account) {
            console.log(`\nCould not find account '${req.body.username}'\n`);
            res.redirect('/');
        } else {
            bcrypt.compare(req.body.password, account.hashedPassword, (err2, result) => {
                console.log(`\nFound account '${req.body.username}'`);
                console.log(`Password does ${(result ? '' : 'not ')}match\n`);
                if (result) {
                    req.session.user = {
                        isAuthenticated: true,
                        account
                    };
                    res.render('home', {
                        title: 'Home',
                        config,
                        account
                    });
                } else {
                    res.redirect('/');
                }
            });
        }
    });
};

exports.home = (req, res) => {
    res.render('home', {
        config,
        account: req.session.user.account
    });

    // res.send(`Authorized access: Welcome ${req.session.user.username}<br /><a href="/logout">Logout</a>`);

    // if(req.cookies.loggedIn === 'yes'){

    // } else {
    //     res.cookie('loggedIn', 'yes')
    // }
};

exports.loggedOut = (req, res) => {
    // res.clearCookie('loggedIn');
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
}

exports.parseUpdateData = (req, res) => {
    bcrypt.hash(req.body.password, null, null, (err, hash) => {
        req.body.hashedPassword = hash;
        req.body.password = undefined;
        updateAccount(req, res);
    });
}

const updateAccount = (req, res) => {
    console.log(req.body);
    var myQuery = { 'username': req.session.user.account.username };
    var newValues = { $set: {'username': req.body.username, 'hashedPassword': req.body.hashedPassword, 'email': req.body.email, 'age': req.body.age, 'answer1': req.body.answers[0], 'answer2': req.body.answers[1], 'answer3': req.body.answers[2]}};
    Account.updateOne(myQuery, newValues, {upsert: true}, (err, result) =>{
        if (err) throw err;
    });
    res.redirect('/loggedOut');
}

exports.api = (req, res) => {
    // Initialize var to store api data. This does not include
    // filling it with the proper values
    var answers = {};
    for (let i = 1; i <= config['answers'].length; i++) {
        answers[`question${i}`] = {};
    }
    answers['total'] = 0;

    // Fill each question Object with the possible answers and
    // a default value/quantity of 0
    config['answers'].forEach((options, i) => {
        options.forEach(answer => {
            answers[`question${i+1}`][answer] = 0;
        });
    });

    // Iterate over every account
    Account.find({}, (err, accounts) => {
        if(err) throw err;

        // Increment the value assigned to any possible answer
        // in var answers where account answers match the key
        accounts.forEach(info => {
            for (let i = 1; i <= 3; i++) {
                answers[`question${i}`][info[`answer${i}`]] += 1;
            }
            answers['total'] += 1;
        })

        // Return the answers data
        res.json(answers);
    });
};

exports.avatar = (req, res) => {
    var url = 'https://api.adorable.io/avatars/list';

    res.render('avatar', {
        "title": config.menu[5][0]
    });
};