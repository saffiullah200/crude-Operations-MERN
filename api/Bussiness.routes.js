let express = require("express");
let BusinessRoutes = express.Router();
let Business = require("./Business.model");

//add backend

BusinessRoutes.route("/add").post(function(req, res) {
  let business = new Business(req.body);
  business
    .save()
    .then(business => {
      res.status(200).json({ business: "business in added successfully" });
    })
    .catch(err => {
      res.status(400).send("unable to save to the database");
    });
});

// index backend

BusinessRoutes.route("/").post(function(req, res) {
  Business.find(function(err, businesses) {
    if (err) {
      console.log(err);
    } else {
      res.json(businesses);
    }
  });
});

//          edit route

BusinessRoutes.route("/edit/:id").post(function(req, res) {
  Business.findById(req.params.id, function(err, business) {
    if (err) {
      console.log(err);
    } else {
      res.json(business);
    }
  });
});

///update data

BusinessRoutes.route("/update/:id").post(function(req, res) {
  Business.findById(function(err, business) {
    if (!business) {
      res.status(400).send("bussniess data not found");
    } else {
      business.person_name = req.body.person_name;
      business.business_gst_number = req.body.business_gst_number;
      business.business_name = req.body.business_name;
      Business.save()
        .then(business => {
          res.json("successfully updated ");
        })
        .catch(err => {
          console.log("error updating ");
          res.status(400).send("error updating database ");
        });
    }
  });
});

BusinessRoutes.route("/delete/:id").get(function(req, res) {
  Business.findByIdAndRemove({ _id: req.params.id }, function(err, business) {
    if (err) res.json(err);
    else res.json("Successfully removed");
  });
});

module.exports = BusinessRoutes;
