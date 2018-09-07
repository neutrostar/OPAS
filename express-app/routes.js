const express = require("express");
const router = express.Router();

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

	console.log(req.body.rollnumber);
	console.log(req.body.password);
	res.redirect("/");
});

router.post("/signup", function(req, res) {

	res.redirect("/");
});

module.exports = router;