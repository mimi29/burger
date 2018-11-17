var express = require("express");

var router = express.Router();

// requires for accessing the model (database)
var burger = require("../models/burger.js");

router.get('/', function (req, res) {
  res.redirect('/index');
});

// Create all our routes and set up logic within those routes where required.
router.get("/index", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {burgers: data};
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

// order am burger
router.post("/burgers", function(req, res) {
  console.log("burger_name: "+req.body.burger_name);
  console.log("devour: "+req.body.devoured);
  burger.create(
    ["burger_name", "devoured"],
    [req.body.burger_name, 0], function(result) {
    res.redirect("/");
    //res.json({ id: result.insertId });
  });
});
// localhost:3000/burgers/1234
router.post("/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update(
    {devoured: true},
    condition,
    function(result) {
      console.log("update: ", result.body);
      if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      //res.status(200).end();
      res.redirect("/");
    }
  );
});

// Export routes for server.js to use.
module.exports = router;
