var express = require("express");
var port = 3000;

var todoRoute = require('./routes/todo.route')

var app = express();
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => res.render('index'));

app.use('/todos', todoRoute);

app.listen(port, function () {
  console.log("Server listening on port " + port);
});
