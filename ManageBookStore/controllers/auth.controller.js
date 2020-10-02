
// var md5 = require('md5')
var db = require('../db')
var bcrypt = require('bcrypt')
const nodemailer = require("nodemailer");

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
    if (!user.wrongLoginCount) {
        db.get("users")
            .find({ id: user.id })
            .set("wrongLoginCount", 0)
            .write();
    }

    if (user.wrongLoginCount >= 4) {
        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user: process.env.USER,
                pass: process.env.PASS
            }
        });
        let mailOptions = {
            from:"hbcqb2k@gmail.com",
            to:"baochunga1@gmail.com",
            subject:"Test send mail by nodemailer!",
            text:"TEST"
        }
        transporter.sendMail(mailOptions,function(err,data){
            if(err){
                console.log("Error Occurs")
            }else{
                console.log("Email sended!")
            }
        })


        return res.render("auth/login", {
            errors: ["Your account has been locked."],
            valued: req.body
        });


    }
    //use await for bcrypt
    var isCorrectPassword = await bcrypt.compare(password, user.password)
    if (!isCorrectPassword) {
        db.get("users")
            .find({ id: user.id })
            .assign({ wrongLoginCount: (user.wrongLoginCount += 1) })
            .write();
        res.render('auth/login', {
            errors: ["Wrong password"],
            valued: req.body
        });
        return;
    }

    res.cookie('countUserId', '0')
    res.cookie("userId", user.id, {
        signed: true
    });

    if (user.isAdmin === true) {
        return res.redirect('/');
    }

    res.redirect('/transactions');
}

module.exports.logout = function (req, res,) {
    res.clearCookie('userId')
    res.redirect('/auth/login')
};
