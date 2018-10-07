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
				
				console.log(allAnnouncements);
				res.render("student_page", {
					user: foundUser,
					announcements: allAnnouncements
				});
			});	
		}
	});
});

router.get("/student/group", isLoggedIn, function(req, res) {

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

router.get("/student/assignment", isLoggedIn, function(req, res) {

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

// router.get("/student/assignment/view_assignment/:assignment_id", isLoggedIn, function(req, res) {

// 	User.findById(req.user.id).exec(function(err, foundUser) {

// 		if (err) {

// 			console.log(err);
// 		} else {

// 			Assignment.findById(req.params.assignment_id).exec(function(err, foundGroup) {

// 				res.render("ques1", {

// 					user: foundUser,
// 					assignment: foundAssignment
// 				});
// 			});
// 		}
// 	});
// });

router.get("/student/assignment/view_assignment", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			res.render("ques_UCS617", {

				user: foundUser
			});
		}
	});
});

router.get("/student/assignment/view_assignment/ques", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			res.render("quest1", {

				user: foundUser
			});
		}
	});
});


router.get("/student/evaluations", isLoggedIn, function(req, res) {

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

router.get("/student/notes", isLoggedIn, function(req, res) {

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

router.get("/student/change_group", isLoggedIn, function(req, res) {

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

router.post("/student/change_group", isLoggedIn, function(req, res) {

	// console.log(req.user.id);
	res.redirect("/student/" + req.user.id);
});

function isLoggedIn(req, res, next) {

	if (req.isAuthenticated()) {

		return next();
	}

	res.redirect("/");
}

module.exports = router;