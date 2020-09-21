
// var md5 = require('md5')
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
    if (!user.wrongLoginCount) {
        db.get("users")
            .find({ id: user.id })
            .set("wrongLoginCount", 0)
            .write();
    }

    if (user.wrongLoginCount >= 4) {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        console.log(process.env.SENDGRID_API_KEY);
        const msg = {
            to: "hbcqb2k@gmail.com",
            from: "hbcqb2k@gmail.com",
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        sgMail.send(msg);

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
