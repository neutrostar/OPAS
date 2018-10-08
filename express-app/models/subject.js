var mongoose = require("mongoose");

// Schema setup
var SubjectSchema = new mongoose.Schema({

	subject_id: String,
	subject_name: String
});

module.exports = mongoose.model("subject", SubjectSchema);