// Node Dependencies
var express = require("express");
var mongoose = require("mongoose");
const path = require('path');

// Database models
var Group = require("../models/group");
var User = require("../models/user");
var Announcement = require("../models/announcement");
var Comment = require("../models/comment");
var Assignment = require("../models/assignment");
var Note = require('../models/note');
var Subject = require("../models/subject");
var Submission = require("../models/submission");

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

router.post("/student/groups/view/:group_id/announcement/view/:announcement_id/new", function(req, res) {

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
			return res.redirect("/student/groups/view/" + req.params.group_id + "/announcement/view/" + req.params.announcement_id)
		});
	});
});

// ================================================================================

router.get("/student/groups/view/:group_id/assignments", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
			return res.render("*");
		}

		Group.findById(req.params.group_id).populate("assignments").exec(function(err, foundGroup) {

			if (err) {

				console.log(err);
				return res.render("*");
			}

			res.render("student_assignment", {

				user: foundUser,
				currentGroup: foundGroup,
				assignments: foundGroup.assignments
			});
		});
	});
});

router.get("/student/groups/view/:group_id/assignments/view/:assignment_id", isLoggedIn, function(req, res) {

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

				res.render("ques_UCS617", {

					user: foundUser,
					currentGroup: foundGroup,
					assignment: foundAssignment,
					languages: foundAssignment.languages,
					questions: foundAssignment.questions
				});
			});
		});
	});
});

router.get("/student/groups/view/:group_id/assignments/view/:assignment_id/question/view/:question_id", isLoggedIn, function(req, res) {

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

				var currentQuestion;
				foundAssignment.questions.forEach(function(question) {

					if (question.id === req.params.question_id) {

						currentQuestion = question;
					}
				});

				var flag = false;
				User.submissions.forEach(function(submission) {

					if (currentQuestion.id === submission.question.id && foundAssignment.id === submission.assignment.id) {

						flag = true;
					}
				});

				if (!flag) {

					res.render("student_judge", {

						user: foundUser,
						currentGroup: foundGroup,
						question: currentQuestion,
						languages: foundAssignment.languages
					});
				} else {

					console.log("Submission already made");
					return res.redirect("/student/groups/view/" + req.params.group_id + "/assignments/view/" + req.params.assignment_id);
				}
			});
		});
	});
});

router.post("/student/groups/view/:group_id/assignments/view/:assignment_id/question/view/:question_id/submit", function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
			return res.redirect("*");
		}

		Assignment.findById(req.params.assignment_id).exec(function(err, foundAssignment) {

			if (err) {

				console.log(err);
				return res.redirect("*");
			}

			var newSubmission = new Submission({

				assignment: {

					id: req.params.assignment_id,
					title: foundAssignment.title
				},

				question: {

					id: req.params.question_id,
				}
			});

			Submission.create(newSubmission, function(err, newSubmission) {

				if (err) {

					console.log(err);
					return res.redirect("*");
				}

				foundUser.submissions.push(newSubmisssion);
				foundUser.save();

				return res.redirect("/student/groups/view/" + req.params.group_id + "/assignments/view/" + req.params.assignment_id);
			});
		});
	});
});

// ================================================================================

router.get("/student/evaluations", isLoggedIn, function(req, res) {
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

// ================================================================================

router.get("/student/groups/view/:group_id/notes", isLoggedIn, function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
			return res.redirect("*");
		}

		Group.findById(req.params.group_id).populate("notes").exec(function(err, foundGroup) {

			if (err) {

				console.log(err);
				return res.redirect("*");
			}
				console.log(foundGroup.notes.title);
			res.render("student_notes", {

				user: foundUser,
				currentGroup: foundGroup,
				note: foundGroup.notes
			});
		});
	});
});

router.get("/student/groups/view/:group_id/notes/:note_name", isLoggedIn, function(req, res) {

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

			Note.findById(req.params.note_id).exec(function(err,foundNote){
				var file = req.params.note_name;
				var fileLocation = path.join('./uploads', file);
				console.log(fileLocation);
				res.download(fileLocation, file);
			});
		});
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