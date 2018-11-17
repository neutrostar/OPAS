// Node Dependencies
var express = require("express");
var mongoose = require("mongoose");
const path = require('path');
const fs = require('fs');
const {c, cpp, node, python, java} = require('compile-run');

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

				if (User.submissions) {

					User.submissions.forEach(function(submission) {

						if (currentQuestion.id === submission.question.id && req.user.id === submission.assignment.author.id) {
							console.log('Done question');
							console.log(currentQuestion.title);

							flag = true;
						}
					});
				}

				if (!flag) {

					res.render("student_judge", {

						user: foundUser,
						currentGroup: foundGroup,
						question: currentQuestion,
						assignment: foundAssignment,
						languages: foundAssignment.languages,
						codes: '',
						outputs: ''
						
					});
				} else {

					console.log("Submission already made");
					return res.redirect("/student/groups/view/" + req.params.group_id + "/assignments/view/" + req.params.assignment_id);
				}
			});
		});
	});
});


router.post("/student/groups/view/:group_id/assignments/view/:assignment_id/question/view/:question_id/compile", function(req, res) {

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
			// console.log(req.body.code);
			var currentQuestion;
				foundAssignment.questions.forEach(function(question) {

					if (question.id === req.params.question_id) {

						currentQuestion = question;
					}
				});
			
			
			var int_code = req.body.code;
			var code = int_code.toString();
			fs.writeFile('.//codes//a.cpp', code, function(err){
				if(err){
					console.log(err);
				}
				else{
					console.log('working');
					var int_input = req.body.input;
					var input = int_input.toString();
					cpp.runFile('.//codes//a.cpp',{stdin: input},(err, result)=>{
						if(err){
							console.log(err);
						}
						else{
							console.log(result.stdout.toString());
							var output = result.stdout.toString();
							res.render("student_judge", {

								user: foundUser,
								currentGroup: foundGroup,
								question: currentQuestion,
								assignment: foundAssignment,
								languages: foundAssignment.languages,
								codes: code,
								outputs: output
								
							});
						}
					});
				}
			});

			

			
			// return res.redirect("/student/groups/view/" + req.params.group_id + "/assignments/view/" + req.params.assignment_id);
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
			// console.log(req.body.code);
			console.log('Running submission route');
			var int_code = req.body.code;
			var code = int_code.toString();
			var filename = req.user.id + req.params.question_id + Date.now()+ '.cpp';
			fs.writeFile('.//submissions//'+filename, code, function(err){
				if(err){
					console.log(err);
				}
				else{
					console.log('working');
					
					console.log(filename);
					var int_input = currentQuestion.input;
					var input = int_input.toString();
					console.log(input);
					// console.log('The input is: ');
					// console.log(input);
					cpp.runFile('.//submissions//'+filename,{stdin: input},(err, result)=>{
						if(err){
							console.log(err);
						}
						else{
							console.log(result);
							var output = result.stdout.toString();
							console.log(output);
							var newSubmission = new Submission({

								author: {

									id: req.user.id,
									name: foundUser.name
								},

								assignment: {
				
									id: req.params.assignment_id,
									title: foundAssignment.title
								},
				
								question: {
				
									id: req.params.question_id,
									title: currentQuestion.title
								},

								output: output,
								filename: filename
							});
							console.log(newSubmission.output);
							Submission.create(newSubmission, function(err, newSubmission) {

								if (err) {
				
									console.log(err);
									return res.redirect("*");
								}
				
								foundUser.submissions.push(newSubmission);
								foundUser.save();
				
								
							});
							return res.redirect("/student/groups/view/" + req.params.group_id + "/assignments/view/" + req.params.assignment_id);

						}
					})
				}
			})

			

			
			
		});
	});
});
});

// ================================================================================

router.get("/student/groups/view/:group_id/submissions", isLoggedIn, function(req, res) {

	User.findById(req.user.id).populate("submissions").exec(function(err, foundUser) {

		if (err) {

			console.log(err);
			return res.redirect("*");
		}

		Group.findById(req.params.group_id).exec(function(err, foundGroup) {

			if (err) {

				console.log(err);
				return res.redirect("*");
			}

			res.render("student_submissions", {

				user: foundUser,
				currentGroup: foundGroup,
				submissions: foundUser.submissions
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

router.get("/student/groups/view/:group_id/practice", isLoggedIn, function(req, res) {

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

			res.render('student_practice',{
				user: foundUser,
				currentGroup: foundGroup,
			});
		});
	});
});

//==================================================================================

function isLoggedIn(req, res, next) {

	if (req.isAuthenticated()) {

		return next();
	}

	res.redirect("/");
}

module.exports = router;