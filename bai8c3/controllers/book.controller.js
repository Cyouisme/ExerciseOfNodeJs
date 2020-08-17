var shortid = require('shortid');
var db = require('../db');

module.exports.index = function (req, res) {
    res.render('store/home', {
        books: db.get('books').value()
    })
}

module.exports.create = function (req, res) {
    res.render('store/create')
}

module.exports.delete = function (req, res) {
    var id = req.params.id;
    db.get('books').remove({ id: id }).write()
    res.redirect('/books')
}

module.exports.update = function (req, res) {
    var id = req.params.id;
    res.render('store/update')
}

module.exports.postCreate = function (req, res) {
    req.body.id = shortid.generate();
    db.get('books').push(req.body).write()
    res.redirect('/books')
}

module.exports.postUpdate = function (req, res) {
    var id = req.params.id;
    var title = req.body.title;
    db.get('books').find({ id: id }).assign({ title: title }).write()
    res.redirect('/books')
}