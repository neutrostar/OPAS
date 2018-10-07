var express = require("express");
var User = require("../models/user");
var Group = require("../models/group");
var Announcement = require("../models/announcement");
var mongoose = require("mongoose");

var router = express.Router();

router.get("/faculty", function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			// console.log(foundFaculty);
			Announcement.find({}, function(err, allAnnouncements) {

				res.render("faculty_page", {

					user: foundUser,
					announcement: allAnnouncements
				});
			});	
		}
	});
});

router.post("/faculty/announcement", function(req, res) {

	console.log(req.body);
	res.redirect("/faculty");
});

router.get("/faculty/assignments", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			res.render("faculty_assignment", {

				user: foundUser
			});
		}
	});
});

router.get("/faculty/groups", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			res.render("faculty_class_groups", {

				user: foundUser
			});
		}
	});
});

router.get("/faculty/groups/:group_id", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			Group.findById(req.user.group_id).exec(function(err, foundGroup) {

				res.render("faculty_group_info", {

					user: foundUser,
					group: foundGroup
				});
			});
		}
	});
});

router.get("/faculty/evaluations", isLoggedIn, function(req, res) {

	return res.redirect("/faculty");
});

router.get("/faculty/notes", function(req, res) {

	// 
});

router.get("/faculty/addmember", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			res.render("faculty_addstudent", {

				user: foundUser
			});
		}
	});
});

router.post("/faculty/addmember", isLoggedIn, function() {

	// 
});

function isLoggedIn(req, res, next) {

	if (req.isAuthenticated()) {

		return next();
	}

	res.redirect("/");
}

module.exports = router;