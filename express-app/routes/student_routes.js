var express = require("express");
var mongoose = require("mongoose");
var Group = require("../models/group");
var User = require("../models/user");
var Announcement = require("../models/announcement");
var Comment = require("../models/comment");
var Assignment = require("../models/assignment");
var Subject = require("../models/subject");

var router = express.Router();

// ================================================================================

router.get("/student/groups", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
			return res.redirect("*");
		}

		Group.find({

			"users": req.user.id
		}).exec(function(err, foundGroups) {

			if (err) {

				console.log(err);
				return res.redirect("*");
			}

			res.render("student_groups", {

				user: foundUser,
				groups: foundGroups
			});
		});
	});
});

router.post("/student/groups/join", isLoggedIn, function(req, res) {

	// console.log(req.body);
	User.findById(req.user.id).exec(function(err, foundUser) {

		Group.findOne({

			group_pass: req.body.passkey
		}).exec(function(err, foundGroup) {

			if (foundGroup) {

				foundGroup.users.push(foundUser);
				foundGroup.save();
				return res.redirect("/student/groups");
			} else {

				console.log("Group not found");
				return res.redirect("*");
			}
		})
	})
});

// ================================================================================

router.get("/student/groups/view/:group_id", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
			return res.redirect("*");
		}

		Group.findById(req.params.group_id).populate("announcements").exec(function(err, foundGroup) {

			if (err) {

				console.log(err);
				return res.redirect("*");
			}

			res.render("student_page", {

				user: foundUser,
				currentGroup: foundGroup,
				announcements: foundGroup.announcements
			});
		});
	});
});

router.get("/student/groups/view/:group_id/announcement/view/:announcement_id", isLoggedIn, function(req, res) {

	// User.findById(req.user.id).exec(function(err, foundUser) {

	// 	if (err) {

	// 		console.log(err);
	// 		res.redirect("*");
	// 	}

	// 	Announcement.findById(req.params.id, function(err, foundAnnouncement) {

	// 		console.log(foundAnnouncement);
	// 		if (err) {

	// 			console.log(err);
	// 			res.redirect("*");
	// 		}

	// 		res.render("student_announcement", {

	// 			user: foundUser,
	// 			announcement: foundAnnouncement
	// 		});
	// 	});
	// });

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
			return res.redirect("*");
		}

		Group.findById(req.params.group_id).exec(function(err, foundGroup) {

			if (err) {

				console.log(err);
				return res.redirect("*");
			}

			Announcement.findById(req.params.announcement_id).populate("comments").exec(function(err, foundAnnouncement) {

				if (err) {

					console.log(err);
					return res.redirect("*");
				}

				res.render("student_announcement", {

					user: foundUser,
					currentGroup: foundGroup,
					announcement: foundAnnouncement,
					comments: foundAnnouncement.comments
				});
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

			res.redirect("/student/" + req.params.id);
		});
	});
});

// ================================================================================

router.get("/student/assignment", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			Assignment.find({}, function(err, allAssignments) {

				console.log(allAssignments);
				if (err) {

					console.log(err);
					res.redirect("*");
				}

				res.render("student_assignment", {

					user: foundUser,
					assignments: allAssignments
				});
			});
		}
	});
});

router.get("/student/assignment/:assignment_id/view", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
			res.redirect("*");
		} else {

			Assignment.findById(req.params.assignment_id, function(err, foundAssignment) {

				if (err) {

					console.log(err);
					res.redirect("*");
				}

				res.render("ques_UCS617", {

					user: foundUser,
					assignment: foundAssignment
				});
			});
		}
	});
});

router.get("/student/assignment/:assignment_id/view/ques", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			Assignment.findById(req.params.assignment_id, function(err, foundAssignment) {

				if (err) {

					console.log(err);
					res.redirect("*");
				}

				res.render("quest1", {

					user: foundUser,
					assignment: foundAssignment
				});
			});
		}
	});
});

// ================================================================================

router.get("/student/evaluations", isLoggedIn, function(req, res) {

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

				res.render("student_page", {

					user: foundUser,
					announcements: allAnnouncements
				});
			});
		}
	});
});

// ================================================================================

router.get("/student/notes", isLoggedIn, function(req, res) {

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

				res.render("student_page", {

					user: foundUser,
					announcements: allAnnouncements
				});
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