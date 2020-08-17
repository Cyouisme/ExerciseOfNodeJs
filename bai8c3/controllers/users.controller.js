var shortid = require("shortid");
var db = require("../db");
// const { find } = require("../../db");

module.exports.index = function (req, res) {
    res.render("users/home", {
        users: db.get("users").value()
    })
}

module.exports.search = function(req,res){
    var q = req.query.q;
    var findKey = db.get('users').filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    }).value()
    res.render("users/home",{
        users: findKey,
        valued: q
    })
}

module.exports.create = function (req, res) {
    res.render("users/create");
}

module.exports.delete = function (req, res) {
    var id = req.params.id;
    db.get("users")
        .remove({ id: id })
        .write();
    res.redirect("/users");
}

module.exports.update = function (req, res) {
    var id = req.params.id;
    res.render("users/update");
}

module.exports.postCreate = function (req, res) {
    req.body.id = shortid.generate();
    db.get("users")
        .push(req.body)
        .write();
    res.redirect("/users");
}

module.exports.postUpdate = function (req, res) {
    var id = req.params.id;
    var name = req.body.name;
    var phone = req.body.phone;
    db.get("users")
        .find({ id: id })
        .assign({ name: name, phone: phone })
        .write();
    res.redirect("/users");
}


