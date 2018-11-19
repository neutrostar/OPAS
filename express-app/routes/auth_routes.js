var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("../models/user");
var keys = require("../config/keys");

var router = express.Router();

router.get("/", function(req, res) {

	if (req.isAuthenticated()) {

		return res.redirect("/auth/redirect");
	}

	res.render("index");
});

// AUTH ROUTES
// REGISTER
router.post("/auth/register", function(req, res) {

	console.log(req.body);
	var newUser = new User({

		username: req.body.username,
		email: req.body.email,
		name: req.body.name,
		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg/600px-Default_profile_picture_%28male%29_on_Facebook.jpg"
	});

	if (req.body.password === req.body.repassword) {

		User.register(newUser, req.body.password, function(err, newUser) {

			if (err) {

				console.log(err);
				return res.redirect("/");
			}

			passport.authenticate("local")(req, res, function() {

				if (newUser.username[0].match(/[a-z]/i)) {

					res.redirect("/faculty/groups");
				} else {

					res.redirect("/student/groups");
				}
			});
		});
	} else {

		console.log("Passwords do not match");
		return res.redirect("/");
	}
});

// LOGIN
router.post("/auth/login", passport.authenticate("local", {

	successRedirect: "/auth/redirect",
	failureRedirect: "/"
}), function(req, res) {

	// 
});

// LOGOUT
router.get("/auth/logout", function(req, res) {

	req.logout();
	res.redirect("/");
});

// REDIRECT
router.get("/auth/redirect", function(req, res) {

	if (req.user.username[0].match(/[a-z]/i)) {

		res.redirect("/faculty/groups");
	} else {

		res.redirect("/student/groups");
	}
});

module.exports = router;