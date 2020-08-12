var express = require('express')
var port = 3000;

var bookRoute =  require('./routes/book.route')
var userRoute = require('./routes/user.route')
var transactionRoute = require('./routes/transaction.route')

var app = express();
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))

app.get('/', (req, res) => res.render('index'));

app.use('/books', bookRoute);
app.use('/users', userRoute);
app.use('/transactions', transactionRoute)

app.listen(port, function () {
  console.log("Server listening on port " + port);
});

