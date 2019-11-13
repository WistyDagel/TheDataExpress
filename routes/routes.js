const config = require('../config');

exports.index = (req, res) => {
    res.render('Home Page', {
        "title": config['titles'][0],
        "config": config
    });
};