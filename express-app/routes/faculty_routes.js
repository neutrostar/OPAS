var express = require("express");
var mongoose = require("mongoose");
var User = require("../models/user");
var Group = require("../models/group");
var Announcement = require("../models/announcement");
var Comment = require("../models/comment");
var Subject = require("../models/subject");
var Assignment = require("../models/assignment");

var router = express.Router();

// ========================================================================================

router.get("/faculty", isLoggedIn, function(req, res) {

	User.findById(req.user.id).populate("announcements").exec(function(err, foundUser) {

		// console.log(foundUser);
		if (err) {

			console.log(err);
			res.redirect("*");
		} else {

			res.render("faculty_page", {

				user: foundUser
			});
		}
	});
});

router.post("/faculty/announcement", function(req, res) {

	User.findById(req.user.id, function(err, foundUser) {

		if (err) {

			console.log(err);
			res.redirect("*");
		} else {

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
					res.redirect("*");
				} else {

					foundUser.announcements.push(newAccouncement);
					foundUser.save();
					res.redirect("/faculty");
				}
			});
		}
	});
});

router.get("/faculty/announcement/:id", isLoggedIn, function(req, res) {

	User.findById(req.user.id, function(err, foundUser) {

		if (err) {

			console.log(err);
			res.redirect("*");
		}

		Announcement.findById(req.params.id).populate("comments").exec(function(err, foundAnnouncement) {

			// console.log(foundAnnouncement);
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

router.post("/faculty/announcement/:id/new", function(req, res) {

	Announcement.findById(req.params.id, function(err, foundAnnouncement) {

		// console.log(foundAnnouncement);
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

			res.redirect("/faculty/announcement/" + req.params.id);
		});
	});
});

// ========================================================================================

router.get("/faculty/assignments", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
			res.redirect("*")
		} else {

			Assignment.find({

				"author.id": req.user.id
			}, function(err, foundAssignments) {

				res.render("faculty_assignment", {

					user: foundUser,
					assignments: foundAssignments
				});
			});
		}
	});
});

router.get("/faculty/assignments/:assignment_id/edit", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
			res.redirect("*");
		} else {

			Assignment.findById(req.params.assignment_id, function(err, foundAssignment) {
			
				res.render("faculty_edit_assignment", {

					user: foundUser,
					assignment: foundAssignment
				});
			});
		}
	});
});

router.get("/faculty/assignments/:assignment_id/viewsubmissions", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
			res.redirect("*");
		}

		res.render("faculty_assignment_viewsubmissions", {

			user: foundUser
		});
	});
});

router.get("/faculty/assignments/create", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			res.render("faculty_createNewAssignment", {

				user: foundUser,
			});
		}
	});
});

router.post("/faculty/assignments/create", isLoggedIn, function(req, res) {

	console.log(req.body);

	Subject.findOne({

		subject_id: req.body.subject
	}, function(err, foundSubject) {

		if (err) {

			console.log(err);
			resredirect("*");
		}

		if (!foundSubject) {

			console.log("Subject not found");
		} else {

			var newAssignment = new Assignment({

				title: req.body.title,
				author: {

					id: req.user.id,
					name: req.user.name
				},

				subject: {

					id: foundSubject._id,
					subject_id: foundSubject.subject_id
				},

				ques1: req.body.ques1,
				ques2: req.body.ques2
			});

			Assignment.create(newAssignment, function(err, newAssignment) {

				if (err) {

					console.log(err);
					res.redirect("*");
				}

				res.redirect("/faculty");
			});
		}
	});
});

// ========================================================================================

router.get("/faculty/groups", isLoggedIn, function(req, res) {

	User.findById(req.user.id).populate("groups").exec(function(err, foundUser) {

		if (err) {

			console.log(err);
			return res.redirect("*");
		} else {

			console.log(foundUser);
			res.render("faculty_class_groups", {

				user: foundUser
			});
		}
	});
});

router.get("/faculty/groups/view/:group_id", isLoggedIn, function(req, res) {

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

	console.log(req.body);
	res.redirect("/faculty");
});

// ========================================================================================

router.get("/faculty/evaluations", isLoggedIn, function(req, res) {

	return res.redirect("/faculty");
});

// =======================================================================================

router.get("/faculty/notes", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			res.render("faculty_notes", {

				user: foundUser
			});
		}
	});
});


router.get("/faculty/notes/newUpload", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			res.render("faculty_newNotes", {

				user: foundUser
			});
		}
	});
});

// ========================================================================================

function isLoggedIn(req, res, next) {

	if (req.isAuthenticated()) {

		return next();
	}

	res.redirect("/");
}

module.exports = router;