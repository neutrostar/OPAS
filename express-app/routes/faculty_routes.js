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

router.post("/faculty/groups/:group_id/home/new", function(req, res) {

	console.log(req.body);
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

			console.log(foundGroup);
			var newAnnouncement = new Announcement({

				text: req.body.text,
				author: {

					id: req.user.id,
					name: req.user.name,
					image: req.user.image
				}
			});

			Announcement.create(newAnnouncement, function(err, newAnnouncement) {

				foundGroup.announcements.push(newAnnouncement);
				foundGroup.save();
				return res.redirect("/faculty/groups/" + req.params.group_id + "/home");
			});
		});
	});
});

router.get("/faculty/groups/:group_id/home", isLoggedIn, function(req, res) {

	User.findById(req.user.id, function(err, foundUser) {

		if (err) {

			console.log(err);
			return res.redirect("*");
		}

		Group.find({

			"users": req.user.id
		}).exec(function(err, allGroups) {

			if (err) {

				console.log(err);
				return res.redirect("*");
			}

			Group.findById(req.params.group_id).populate("announcements").exec(function(err, foundGroup) {

				console.log(foundGroup);
				if (err) {

					console.log(err);
					return res.redirect("*");
				}

				res.render("faculty_page", {

					user: foundUser,
					groups: allGroups,
					currentGroup: foundGroup,
					announcements: foundGroup.announcements
				});
			});
		});
	});
});

router.get("/faculty/groups/:group_id/announcements/:announcement_id", function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
			return res.redirect("*");
		}

		console.log(foundUser);
		Group.find({

			"users": req.user.id
		}).exec(function(err, foundGroups) {

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

					res.render("faculty_announcement", {

						user: foundUser,
						groups: foundGroups,
						currentGroup: foundGroup,
						announcement: foundAnnouncement,
						comments: foundAnnouncement.comments
					});
				});
			});
		});
	});
});

router.post("/faculty/groups/:group_id/announcements/:announcement_id/new", function(req, res) {

	Group.findById(req.params.group_id).exec(function(err, foundGroup) {

		Announcement.findById(req.params.announcement_id).exec(function(err, foundAnnouncement) {

			var newComment = new Comment({

				author: {

					id: req.user.id,
					name: req.user.name
				},

				text: req.body.comment
			});

			Comment.create(newComment, function(err, newComment) {

				foundAnnouncement.comments.push(newComment);
				foundAnnouncement.save();
				return res.redirect("/faculty/groups/:group_id/announcements/:announcement_id");
			});
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

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(foundUser);
			return res.redirect("*");
		}

		Group.find({

			"users": req.user.id
		}).exec(function(err, foundGroups) {

			// console.log(foundGroups);
			res.render("faculty_class_groups", {

				user: foundUser,
				groups: foundGroups
			});
		});
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

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
			return res.redirect("*");
		}

		var newGroup = new Group({

			group_name: req.body.group_name,
			group_pass: req.body.passkey
		});

		Group.create(newGroup, function(err, newGroup) {

			if (err) {

				console.log(err);
				return res.redirect("*");
			}

			newGroup.users.push(foundUser);
			newGroup.save();
		});

		return res.redirect("/faculty/groups");
	});
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