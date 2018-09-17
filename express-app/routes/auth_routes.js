const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const Faculty = require("../models/faculty");
const mongoose = require("mongoose");
const keys = require("../config/keys");

router.post("/login", function(req, res) {

	var rollnumber = req.body.rollnumber;
	var password = req.body.password;

	if (rollnumber[0].match(/[a-z]/i)) {

		Faculty.getFacultyByRollnumber(rollnumber, function(err, faculty) {

			if (err) {

				console.log(err);
			} else if (!faculty) {

				console.log("Unknown user");
				res.redirect("/");
			} else if (password !== faculty.password) {

				console.log("Invalid password");
				res.redirect("/");
			} else {

				res.redirect("/faculty/" + faculty._id);
			}
		});
	} else {

		Student.getStudentByRollnumber(rollnumber, function(err, student) {

			if (err) {

				console.log(err);
			} else if (!student) {

				console.log("Unknown user");
				res.redirect("/");
			} else if (password !== student.password) {

				console.log("Invalid password");
				res.redirect("/");
			} else {

				res.redirect("/student/" + student._id);
			}
		});
	}
	// User.findOne({

	// 	rollnumber: req.body.rollnumber
	// }, function(err, foundUser) {

	// 	if (err) {

	// 		console.log(err);
	// 	} else if (foundUser.password != req.body.password) {

	// 		console.log("invalid password");
	// 		res.redirect("/");
	// 	} else {

	// 		res.redirect("/user/" + foundUser._id);
	// 	}
	// });
});

router.post("/register", function(req, res) {

	if (req.body.rollnumber[0].match(/[a-z]/i)) {

		// newUser.isFaculty = true;
		var name = req.body.name;
		var mail = req.body.name;
		var rollnumber = req.body.rollnumber;
		var password = req.body.password;
		var repassword = req.body.repassword;

		Faculty.findOne({rollnumber: {

			"$regex": "^" + rollnumber + "\\b",
			"$options": "i"
		}}, function(err, user) {

			Faculty.findOne({mail: {

				"$regex": "^" + mail + "\\b",
				"$options": "i"
			}}, function(err, mail) {

				if (user || mail) {

					res.render("index", {

						user: user,
						mail: mail
					});
				} else {

					var newFaculty = {

						name: req.body.name,
						rollnumber: req.body.rollnumber,
						mail: req.body.mail,
						password: req.body.password,
						image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg/600px-Default_profile_picture_%28male%29_on_Facebook.jpg" 
					}

					Faculty.create(newFaculty, function(err, newlyCreated) {

						if (err) {

							console.log(err);
						} else {

							res.redirect("/faculty/" + newlyCreated._id);
						}
					});
				}
			});
		});
	} else {

		// newUser.isFaculty = false;
		var name = req.body.name;
		var mail = req.body.name;
		var rollnumber = req.body.rollnumber;
		var password = req.body.password;
		var repassword = req.body.repassword;

		Student.findOne({rollnumber: {

			"$regex": "^" + rollnumber + "\\b",
			"$options": "i"
		}}, function(err, user) {

			Student.findOne({mail: {

				"$regex": "^" + mail + "\\b",
				"$options": "i"
			}}, function(err, mail) {

				if (user || mail) {

					res.render("index", {

						user: user,
						mail: mail
					});
				} else {

					var newStudent = {

						name: req.body.name,
						rollnumber: req.body.rollnumber,
						mail: req.body.mail,
						password: req.body.password,
						image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg/600px-Default_profile_picture_%28male%29_on_Facebook.jpg" 
					}

					Student.create(newStudent, function(err, newlyCreated) {

						if (err) {

							console.log(err);
						} else {

							res.redirect("/student/" + newlyCreated._id);
						}
					});
				}
			});
		});
	}
});

module.exports = router;