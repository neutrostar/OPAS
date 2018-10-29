var mongoose = require("mongoose");

// Schema setup
var QuestionSchema = new mongoose.Schema({

	title: String,
	marks: Number
});

module.exports = mongoose.model("question", QuestionSchema);