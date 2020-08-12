var express = require('express')
var shortid = require('shortid');

var db = require('../db');

var router = express.Router()

router.get("/", (req, res) =>
    res.render("taskF/index", {
        tasks: db.get("tasks").value()
    })
);
router.get("/create", function (req, res) {
    res.render("taskF/create");
});

router.get("/:id", function(req, res) {
    var id = req.params.id;
    var task = db
      .get("tasks")
      .find({ id: id })
      .value();
    res.render("taskF/view", {
      tasks: task
    });
  });

router.get("/task", function(req, res) {
    var q = req.query.q;
    var findKey = db.get('tasks').filter(function (task) {
        return task.work.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    }).value();
    // var findKey = db.get('task').filter({work:q}).value()
    res.render("taskF/search", {
        tasks: findKey,
        valued: q
    });
});

router.get('/:id/delete', function (req, res) {
    var id = req.params.id;
    db.get('tasks').remove({ id: id }).write();
    res.redirect("/todos");
})


router.post("/create", function (req, res) {
    req.body.id = shortid.generate();
    db.get("tasks")
        .push(req.body)
        .write();
    res.redirect("/todos");
});

module.exports = router;