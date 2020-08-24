var sgMail = require('@sendgrid/mail')
const { setApiKey } = require('@sendgrid/mail')
sgMail  = setApiKey(process.env.SENDGRID_USER_KEY)
router.post('/',function (req, res) {
    var msg = {
        to: 'baochunga1@gmail.com',
        from: "hbcqb2k@gmail.com",
        subject: "Wrong Passwong",
        text: "The input password not match your password",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>"
    };
    sgMail.send(msg);
})


module.exports = router;