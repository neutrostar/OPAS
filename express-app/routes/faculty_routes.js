var express = require("express");
var User = require("../models/user");
var Group = require("../models/group");
var Announcement = require("../models/announcement");
var mongoose = require("mongoose");

var router = express.Router();

router.get("/faculty", function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			// console.log(foundFaculty);
			Announcement.find({}, function(err, allAnnouncements) {

				res.render("faculty_page", {

					user: foundUser,
					announcement: allAnnouncements
				});
			});	
		}
	});
});

router.get("/faculty/assignments", function(req, res) {

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

router.get("/faculty/groups", function(req, res) {

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

router.get("/faculty/groups/:group_id", function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			Group.findById(req.user.group_id).exec(function(err, foundGroup) {

				res.render("faculty_group_info", {

					user: foundUser,
					group: foundGroup
				});
			})
		}
	});
});

router.get("/faculty/evaluations", function(req, res) {

	// 
});

router.get("/faculty/notes", function(req, res) {

	// 
});

router.get("/faculty/addmember", function(req, res) {

	User.findById(req.user.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			res.render("faculty_addstudent", {

				user: foundUser
			});
		}
	});
});

router.post("/faculty/addmember", function() {

	// 
});

module.exports = router;