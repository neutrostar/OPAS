var express = require("express");
var mongoose = require("mongoose");
var User = require("../models/user");
var Group = require("../models/group");
var Announcement = require("../models/announcement");

var router = express.Router();

router.get("/student", function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			Announcement.find({}, function(err, allAnnouncements) {

				res.render("student_page", {

					user: foundUser,
					announcement: allAnnouncements
				});
			});	
		}
	});
});

router.get("/student/group", function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			res.render("student_page", {

				user:foundUser
			});
		}
	});
});

router.get("/student/assignment", function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			res.render("student_assignment", {

				user: foundUser
			});
		}
	});
});

router.get("/student/evaluations", function(req, res) {

	Student.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			res.render("student_page", {

				user:foundUser
			});
		}
	});
});

router.get("/student/notes", function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			res.render("student_page", {

				user:foundUser
			});
		}
	});
});

router.get("/student/change_group", function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			res.render("student_entercode", {

				user:foundUser
			});
		}
	});
});

router.post("/student/change_group", function(req, res) {

	// console.log(req.user.id);
	res.redirect("/student/" + req.user.id);
});

module.exports = router;