const express = require("express");
const router = express.Router();
var Student = require("./models/student");

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

router.post("/login", function(req, res) {

	// Here find operation will be implemented once database is setup
	// A proxy is implemented here

	// console.log(req.body.rollnumber);
	// console.log(req.body.password); 

	res.render("student_page", {

		name: "John Doe",
		rollnumber: "666",
		mail: "random@random.edu"
	});

	// res.redirect("/");
});

router.post("/sign_up", function(req, res) {

	res.redirect("/");
});

module.exports = router;