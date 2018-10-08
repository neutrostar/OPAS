var express = require("express");
var mongoose = require("mongoose");
var User = require("../models/user");
var Announcement = require("../models/announcement");
var Comment = require("../models/comment");
var Assignment = require("../models/assignment");
var Subject = require("../models/subject");

var router = express.Router();

// ================================================================================

router.get("/student", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			Announcement.find({}, function(err, allAnnouncements) {

				if (err) {

					console.log(err);
					res.redirect("*");
				}

				res.render("student_page", {

					user: foundUser,
					announcements: allAnnouncements
				});
			});	
		}
	});
});

router.get("/student/announcement/:id", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
			res.redirect("*");
		}

		Announcement.findById(req.params.id).populate("comments").exec(function(err, foundAnnouncement) {

			console.log(foundAnnouncement);
			if (err) {

				console.log(err);
				res.redirect("*");
			}

			res.render("student_announcement", {

				user: foundUser,
				announcement: foundAnnouncement
			});
		});
	});
});

router.post("/student/announcement/:id", function(req, res) {

	console.log(req.body);
	Announcement.findById(req.params.id, function(err, foundAnnouncement) {

		if (err) {

			console.log(err);
			res.redirect("*");
		}

		var newComment = new Comment({

			author: {

				id: req.user.id,
				name: req.user.name
			},

			text: req.body.comment
		});

		Comment.create(newComment, function(err, newComment) {

			if (err) {

				console.log(err);
				res.redirect("*");
			}

			foundAnnouncement.comments.push(newComment);
			foundAnnouncement.save();

			res.redirect("/student");
		});
	});
});

// ================================================================================

router.get("/student/group", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			Announcement.find({}).populate("Comments").exec(function(err, allAnnouncements) {

				res.render("student_page", {

					user: foundUser,
					announcements: allAnnouncements
				});
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

// ================================================================================

router.get("/student/assignment", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			Assignment.find({}).populate("subject").exec(function(err, allAssignments) {

				if (err) {

					console.log(err);
					res.redirect("*");
				}

				res.render("student_assignment", {

					user: foundUser,
					assignments: allAssignments
				});
			});

			// res.render("student_assignment", {

			// 	user: foundUser
			// });
		}
	});
});

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

// ================================================================================

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

// ================================================================================

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

// ================================================================================

function isLoggedIn(req, res, next) {

	if (req.isAuthenticated()) {

		return next();
	}

	res.redirect("/");
}

module.exports = router;