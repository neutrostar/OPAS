var express = require("express");
var User = require("../models/user");
var FacultyMain = require("../models/faculty_main");
var Group = require("../models/group");
var Announcement = require("../models/announcement");
var mongoose = require("mongoose");

var router = express.Router();

router.get("/faculty", function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
			res.redirect("*");
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

	var newAccouncement = new Announcement({

		text: req.body.text,
		author: {

			id: req.user.id,
			username: req.user.username,
			image: req.user.image
		}
	});

	Announcement.create(newAccouncement, function(err, newAccouncement) {

		if (err) {

			console.log(err);
		} else {

			res.redirect("/faculty");
		}
	});

	// res.redirect("/faculty");
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

			Group.findById(req.params.group_id).exec(function(err, foundGroup) {

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

router.get("/faculty/creategroup", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			res.render("faculty_creategroup", {

				user: foundUser
			});
		}
	});
});

router.post("/faculty/creategroup", isLoggedIn, function(req, res) {

	// console.log(req.body);
	res.redirect("/faculty");
});


router.get("/faculty/assignments/viewsubmissions", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			res.render("faculty_assignment_viewsubmissions", {

				user: foundUser
			});
		}
	});
});

router.get("/faculty/assignments/create", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			res.render("faculty_createNewAssignment", {

				user: foundUser
			});
		}
	});
});

function isLoggedIn(req, res, next) {

	if (req.isAuthenticated()) {

		return next();
	}

	res.redirect("/");
}

module.exports = router;