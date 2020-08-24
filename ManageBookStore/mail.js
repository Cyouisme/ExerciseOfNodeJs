const { setApiKey } = require('@sendgrid/mail')

var sendgrid = require('@sendgrid/mail')
sendgrid  = setApiKey(process.env.SENDGRID_USER_KEY)
module.exports.maill = function (req, res, next) {

  sendgrid.send({
    to: "baochunga1@gmail.com",
    from: 'hbcqb2k@gmail.com',
    subject: 'Wrong Password',
    text: "The password not match to your password"
  }, function (err, json) {
    if (err) { return res.send('AAA') }
    res.send('WHOoooo')
  })
  next();

}