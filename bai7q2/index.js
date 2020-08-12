var express = require('express');
var low = require('lowdb');
var shortid = require('shortid');
var port = 3000;
var app = express();
var FileSync = require("lowdb/adapters/FileSync");
var adapter = new FileSync("db.json");

var db = low(adapter);
// Set some defaults (required if your JSON file is empty)
db.defaults({ books: [] }).write();

app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => res.render('index'));

app.get('/books', function (req, res) {
  res.render('store/home', {
    books: db.get('books').value()
  })
})

app.get('/books/create', function (req, res) {``
  res.render('store/create')
})
app.post('/books/create', function (req, res) {
  req.body.id = shortid.generate();
  db.get('books').push(req.body).write()
  res.redirect('/books')
})

app.get('/books/:id/delete', function (req, res) {
  var id = req.params.id;
  db.get('books').remove({ id: id }).write()
  res.redirect('/books')
})
app.get('/books/update/:id', function (req, res) {
  var id = req.params.id;
  res.render('store/update')
})
app.post('/books/update/:id', function (req, res) {
  var id = req.params.id;
  var title = req.body.title;
  db.get('books').find({ id: id }).assign({ title: title }).write()
  res.redirect('/books')
})

app.listen(port, function () {
  console.log("Server listening on port " + port);
});