const express = require("express");
var router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");

router.get("/:id", function(req, res) {

	// console.log(req.params);
	User.findById(req.params.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			if (foundUser.isFaculty) {

				res.render("faculty_page", {

					user: foundUser
				});
			} else {

				res.render("student_page", {

					user: foundUser
				});
			}
		}
	});
});

module.exports = router;