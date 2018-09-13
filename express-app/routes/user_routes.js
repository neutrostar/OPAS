const express = require("express");
var router = express.Router();
const User = require("../models/user");
const Group = require("../models/group");
const Announcement = require("../models/announcement");
const mongoose = require("mongoose");

router.get("/:id", function(req, res) {

	User.findById(req.params.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			if (foundUser.isFaculty) {

				res.redirect("/faculty/" + req.params.id);
			} else {

				res.redirect("/student/" + req.params.id);
			}
		}
	})
});

module.exports = router;