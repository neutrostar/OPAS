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

router.get("/faculty/groups", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(foundUser);
			return res.redirect("*");
		}

		Group.find({

			"users": req.user.id
		}).exec(function(err, foundGroups) {

			if (err) {

				console.log(err);
				return res.redirect("*");
			}

			res.render("faculty_class_groups", {

				user: foundUser,
				groups: foundGroups
			});
		});
	});
});

router.get("/faculty/groups/create", isLoggedIn, function(req, res) {

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

router.post("/faculty/groups/create", isLoggedIn, function(req, res) {

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

router.get("/faculty/groups/view/:group_id", isLoggedIn, function(req, res) {

	User.findById(req.user.id, function(err, foundUser) {

		if (err) {

			console.log(err);
			return res.redirect("*");
		}

		Group.findById(req.params.group_id).populate("announcements").exec(function(err, foundGroup) {

			if (err) {

				console.log(err);
				return res.redirect("*");
			}

			res.render("faculty_page", {

				user: foundUser,
				currentGroup: foundGroup,
				announcements: foundGroup.announcements
			});
		});
	});
});

router.post("/faculty/groups/view/:group_id/new", isLoggedIn, function(req, res) {

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
				return res.redirect("/faculty/groups/view/" + req.params.group_id);
			});
		});
	});
});

router.get("/faculty/groups/view/:group_id/announcements/:announcement_id", isLoggedIn, function(req, res) {

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

				res.render("faculty_announcement", {

					user: foundUser,
					currentGroup: foundGroup,
					announcement: foundAnnouncement,
					comments: foundAnnouncement.comments
				});
			});
		});
	});
});

router.post("/faculty/groups/view/:group_id/announcements/:announcement_id/new", isLoggedIn, function(req, res) {

	Announcement.findById(req.params.announcement_id).exec(function(err, foundAnnouncement) {

		if (err) {

			console.log(err);
			return res.redirect("*");
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
				return res.redirect("*");
			}

			foundAnnouncement.comments.push(newComment);
			foundAnnouncement.save();
			return res.redirect("/faculty/groups/view/" + req.params.group_id + "/announcements/" + req.params.announcement_id);
		});
	});
});

// ========================================================================================

router.get("/faculty/groups/view/:group_id/assignments", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
			return res.redirect("*");
		}

		Group.findById(req.params.group_id).populate("assignments").exec(function(err, foundGroup) {

			if (err) {

				console.log(err);
				return res.redirect("*");
			}

			res.render("faculty_assignment", {

				user: foundUser,
				currentGroup: foundGroup,
				assignments: foundGroup.assignments
			});
		});
	});
});

router.get("/faculty/groups/view/:group_id/assignments/create", isLoggedIn, function(req, res) {

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

			res.render("faculty_createNewAssignment", {

				user: foundUser,
				currentGroup: foundGroup
			});
		});
	});
});

router.post("/faculty/groups/view/:group_id/assignments/create", isLoggedIn, function(req, res) {

	// console.log(req.body);
	Group.findById(req.params.group_id).exec(function(err, foundGroup) {

		var newAssignment = new Assignment({

			title: req.body.title,
			author: {

				id: req.user.id,
				name: req.user.name
			},

			ques1: req.body.ques1,
			ques2: req.body.ques2
		});

		Assignment.create(newAssignment, function(err, newAssignment) {

			foundGroup.assignments.push(newAssignment);
			foundGroup.save();
			return res.redirect("/faculty/groups/" + req.params.group_id + "/assignments");
		});
	});
});

router.get("/faculty/groups/view/:group_id/assignments/edit/:assignment_id", isLoggedIn, function(req, res) {

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

			Assignment.findById(req.params.assignment_id).exec(function(err, foundAssignment) {

				if (err) {

					console.log(err);
					return res.redirect("*");
				}

				res.render("faculty_edit_assignment", {

					user: foundUser,
					currentGroup: foundGroup,
					assignment: foundAssignment
				});
			});
		});
	});
});

router.post("/faculty/groups/view/:group_id/assignments/edit/:assignment_id", function(req, res) {

	Assignment.findById(req.params.assignment_id).exec(function(err, foundAssignment) {

		// console.log(foundAssignment);
		// console.log(req.user);
		// foundAssignment = {

		// 	title: req.body.title,
		// 	author: {

		// 		id: req.user.id,
		// 		name: req.user.name
		// 	},

		// 	ques1: req.body.ques1,
		// 	ques2: req.body.ques2
		// }

		// foundAssignment.save();

		return res.redirect("/faculty/groups/" + req.params.group_id + "/assignments");
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

// ========================================================================================

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

// ========================================================================================

router.get("/faculty/evaluations", isLoggedIn, function(req, res) {

	return res.redirect("/faculty");
});

// =======================================================================================

router.get("/faculty/groups/view/:group_id/notes", isLoggedIn, function(req, res) {

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

			res.render("faculty_notes", {

				user: foundUser,
				currentGroup: foundGroup
			});
		});
	});
});


router.get("/faculty/groups/view/:group_id/notes/newUpload", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
			return res.redirect("*");
		} Group.findById(req.params.group_id).exec(function(err, foundGroup) {

			if (err) {

				console.log(err);
				return res.redirect("*");
			}

			res.render("faculty_newNotes", {

				user: foundUser,
				currentGroup: foundGroup
			});
		});
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