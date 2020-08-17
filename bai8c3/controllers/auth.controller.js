var md5 = require('md5')
var db = require('../db')

module.exports.login = function(req,res,next){
    res.render("auth/login");
}

module.exports.postLogin = function(req,res,next){
    var email = req.body.email;
    var password = md5(req.body.password);
    var user = db.get('users').find({email:email}).value()
    if(!user){
        res.render('auth/login',{
            errors: ["User does not exist"],
            valued: req.body
        });
        return;
    }
    if(user.password !== password){
        res.render('auth/login',{
            errors: ["Wrong password"],
            valued: req.body
        });
        return;
    }
    res.cookie("userId",user.id);
    res.redirect('/');
}