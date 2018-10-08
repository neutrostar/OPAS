var express = require("express");
var mongoose = require("mongoose");
var User = require("../models/user");
var Announcement = require("../models/announcement");
var Comment = require("../models/comment");

var router = express.Router();

// ========================================================================================

router.get("/faculty", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
			res.redirect("*");
		} else {

			Announcement.find({}, function(err, allAnnouncements) {

				if (err) {

					console.log(err);
					res.redirect("*");
				}

				res.render("faculty_page", {

					user: foundUser,
					announcements: allAnnouncements
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
			name: req.user.name,
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
});

router.get("/faculty/announcement/:id", isLoggedIn, function(req, res) {

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

			res.render("faculty_announcement", {

				user: foundUser,
				announcement: foundAnnouncement
			});
		});
	});
});

router.post("/faculty/announcement/:id", function(req, res) {

	console.log(req.body);
	Announcement.findById(req.params.announcement_id, function(err, foundAnnouncement) {

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

			res.redirect("/faculty");
		});
	});
});

// ========================================================================================

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

router.get("/faculty/assignments/:assignment_id", isLoggedIn, function(req, res) {

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

// ========================================================================================

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

router.get("/faculty/groups/creategroup", isLoggedIn, function(req, res) {

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

router.post("/faculty/groups/creategroup", isLoggedIn, function(req, res) {

	// console.log(req.body);
	res.redirect("/faculty");
});

// ========================================================================================

router.get("/faculty/evaluations", isLoggedIn, function(req, res) {

	return res.redirect("/faculty");
});

// =======================================================================================

router.get("/faculty/notes", function(req, res) {

	// 
});

// ========================================================================================

function isLoggedIn(req, res, next) {

	if (req.isAuthenticated()) {

		return next();
	}

	res.redirect("/");
}

module.exports = router;