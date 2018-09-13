const mongoose = require("mongoose");

// Schema setup
var subjectSchema = new mongoose.Schema({

	code: String,
	name: String
});

module.exports = mongoose.model("Subject", subjectSchema);