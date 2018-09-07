var mongoose = require("mongoose");

// Schema setup
var studentSchema = new mongoose.Schema({

	name: String,
	image: String,
	password: String,
	rollnumber: String,
	mail: String
});

module.exports = mongoose.model("student", studentSchema);