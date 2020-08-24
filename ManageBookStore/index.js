require('dotenv').config()

var express = require('express')
var port = 3000;

var bookRoute = require('./routes/book.route')
var userRoute = require('./routes/user.route')
var transactionRoute = require('./routes/transaction.route')
var cookieParser = require('cookie-parser')
var authMiddleware = require('./middlewares/auth.middleware')
var authRoute = require('./routes/auth.router')
// var mail = require('./routes/mail.router')
var count = require('./countCookie/count')

var app = express();
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))
app.use(cookieParser(process.env.SESSION_SECRET))
// app.use(count.count) function count the number cookie post to server

app.get('/',authMiddleware.requireAuth, (req, res) => res.render('index'));

app.use('/books', authMiddleware.requireAuth, bookRoute);
app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/transactions', authMiddleware.requireAuth, transactionRoute)
// app.use('/mail',mail)
app.use('/auth', authRoute)

app.listen(port, function () {
  console.log("Server listening on port " + port);
});

