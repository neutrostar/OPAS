const express = require("express");
var router = express.Router();
const Student = require("../models/student");
const Faculty = require("../models/faculty");
const Group = require("../models/group");
const Announcement = require("../models/announcement");
const mongoose = require("mongoose");

router.get("/:id", function(req, res) {

	Student.findById(req.params.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			Announcement.find({}, function(err, allAnnouncements) {

				res.render("student_page", {

					user: foundUser,
					announcement: allAnnouncements
				});
			});	
		}
	});
});

router.get("/:id/group", function(req, res) {

	Student.findById(req.params.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			res.render("student_page", {

				user:foundUser
			});
		}
	});
});

router.get("/:id/assignment", function(req, res) {

	Student.findById(req.params.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			res.render("student_assignment", {

				user: foundUser
			});
		}
	});
});

router.get("/:id/evaluations", function(req, res) {

	Student.findById(req.params.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			res.render("student_page", {

				user:foundUser
			});
		}
	});
});

router.get("/:id/notes", function(req, res) {

	Student.findById(req.params.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			res.render("student_page", {

				user:foundUser
			});
		}
	});
});

router.get("/:id/change_group", function(req, res) {

	Student.findById(req.params.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			res.render("student_entercode", {

				user:foundUser
			});
		}
	});
});

router.post("/:id/change_group", function(req, res) {

	// console.log(req.params.id);
	res.redirect("/student/" + req.params.id);
});

module.exports = router;