const express = require("express");
var router = express.Router();
const User = require("../models/user");
const Group = require("../models/group");
const Announcement = require("../models/announcement");
const mongoose = require("mongoose");

router.get("/:id", function(req, res) {

	User.findById(req.params.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			Announcement.find({}, function(err, allAnnouncements) {

				res.render("faculty_page", {

					user: foundUser,
					announcement: allAnnouncements
				});
			});	
		}
	});
});

router.get("/:id/assignments", function(req, res) {

	User.findById(req.params.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			res.render("faculty_assignment", {

				user: foundUser
			});
		}
	});
});

router.get("/:id/groups", function(req, res) {

	User.findById(req.params.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			res.render("faculty_class_groups", {

				user: foundUser
			});
		}
	});
});

router.get("/:id/groups/:group_id", function(req, res) {

	User.findById(req.params.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			Group.findById(req.params.group_id).exec(function(err, foundGroup) {

				res.render("faculty_group_info", {

					user: foundUser,
					group: foundGroup
				});
			})
		}
	});
});

router.get("/:id/evaluations", function(req, res) {

	// 
});

router.get("/:id/notes", function(req, res) {

	// 
});

router.get("/:id/addmember", function(req, res) {

	User.findById(req.params.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			res.render("faculty_addstudent", {

				user: foundUser
			});
		}
	});
});

router.post("/:id/addmember", function() {

	// 
});

module.exports = router;