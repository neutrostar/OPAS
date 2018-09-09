var express = require("express");
var router = express.Router();
var Student = require("./models/student");
var mongoose = require("mongoose");

router.get("/", function(req, res) {

	res.render("index", {

		// 
	});
});

router.get("/student_page", function(req, res) {

	res.render("student_page", {

		// 
	});
});

router.get("/faculty_page", function(req, res) {

	res.render("faculty_page", {

		// 
	});
});

router.get("/user/login", function(req, res) {

	// Here find operation will be implemented once database is setup
	// A proxy is implemented here

	// console.log(req.body.rollnumber);
	// console.log(req.body.password);

	res.render("student_page", {

		name: "John Doe",
		rollnumber: req.body.rollnumber,
		mail: "random@random.edu"
	});

	// res.redirect("/");
});

router.post("/user/new", function(req, res) {

	// console.log(req.body);

	var newUser = req.body;
	newUser.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Default_profile_picture_%28male%29_on_Facebook.jpg/600px-Default_profile_picture_%28male%29_on_Facebook.jpg";
	Student.create(newUser, function(err, newlyCreated) {

		if (err) {

			console.log(err);
		} else {

			// console.log(newlyCreated.id);
			// res.redirect("/user/login", {

			// 	user: newUser;
			// });
			console.log(newlyCreated);
			res.redirect("/user/" + newlyCreated._id);
		}
	});
});

router.get("/user/:id", function(req, res) {

	// console.log(req.params);
	Student.findById(req.params.id).exec(function(err, foundUser) {

		if (err) {

			console.log(err);
		} else {

			res.render("student_page", {

				user: foundUser
			});
		}
	});
});

module.exports = router;