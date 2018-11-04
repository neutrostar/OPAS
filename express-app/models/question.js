var mongoose = require("mongoose");

// Schema setup
var QuestionSchema = new mongoose.Schema({

	title: String,
	input: String,
	languages: [String]
});

module.exports = mongoose.model("question", QuestionSchema);