var shortid = require("shortid");
var db = require("../db");

module.exports.index = function (req, res) {
    res.render("transaction/home", {
        transactions: db.get("transactions").value()
    });
}

module.exports.create = function (req, res) {
    res.render('transaction/create', {
        books: db.get('books').value(),
        users: db.get('users').value()
    })
}

module.exports.postCreate = function (req, res) {
    req.body.id = shortid.generate();
    req.body.iscomplete = false;
    db.get("transactions")
        .push(req.body)
        .write();
    res.redirect("/transactions");
}

module.exports.complete = function (req, res) {
    var id = req.params.id;
    var errors = [];
    db.get('transactions').find({ id: id }).assign({ iscomplete: true }).write()
    res.redirect('/transactions')
}