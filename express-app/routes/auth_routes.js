const express = require("express");
const router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");
const keys = require("../config/keys");

router.post("/login", function(req, res) {

	// console.log(req.body.password);
	// if (req.body.rollnumber[0].match(/[a-z]/i)) {

	// 	console.log("Not a number");
	// } else {

	// 	console.log("Number");
	// }

	User.findOne({

		rollnumber: req.body.rollnumber
	}, function(err, foundUser) {

		if (err) {

			console.log(err);
		} else if (foundUser.password != req.body.password) {

			console.log("invalid password");
			res.redirect("/");
		} else {

			res.redirect("/user/" + foundUser._id);
		}
	});
});

router.post("/register", function(req, res) {

	var newUser = {

		name: req.body.name,
		rollnumber: req.body.rollnumber,
		mail: req.body.mail,
		password: req.body.password,
		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg/600px-Default_profile_picture_%28male%29_on_Facebook.jpg"
	}

	if (req.body.rollnumber[0].match(/[a-z]/i)) {

		newUser.isFaculty = true;
	} else {

		newUser.isFaculty = false;
	}
	
	User.create(newUser, function(err, newlyCreated) {

		if (err) {

			console.log(err);
		} else {

			res.redirect("/user/" + newlyCreated._id);
		}
	});
});

module.exports = router;