var md5 = require('md5')
var db = require('../db')
var bcrypt = require('bcrypt')

module.exports.login = function (req, res, next) {
    res.render("auth/login");
}

module.exports.postLogin = async function (req, res, next) {
    var email = req.body.email;
    // var password = md5(req.body.password); use md5 
    var password = req.body.password;
    var user = db.get('users').find({ email: email }).value() //find the user have email match with email input
    if (!user) {
        res.render('auth/login', {
            errors: ["User does not exist"],
            valued: req.body
        });
        return;
    }
    
    //use await for bcrypt
    var isCorrectPassword = await bcrypt.compare(password, user.password)
    if (!isCorrectPassword) {
        res.render('auth/login', {
            errors: ["Wrong password"],
            valued: req.body
        });
        return;
    }
    
    // if(count>0){
    //     res.render("auth/login",{
    //         errors: ["Password not match"],
    //         valued: req.body
    //     });
    //     return;
    // }

    res.cookie("userId", user.id,{
        signed: true
    });

    if (user.isAdmin === true) {
        return res.redirect('/');
    }

    res.redirect('/transactions');
}   
