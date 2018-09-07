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

module.exports = router;