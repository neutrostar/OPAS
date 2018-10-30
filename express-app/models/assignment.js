var mongoose = require("mongoose");

// Schema setup
var AssignmentSchema = new mongoose.Schema({

	title: String,
	author: {

		id: {

			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},

		name: String
	},

	languages: [String],
	questions: [String],
	test_input: [String]
});

module.exports = mongoose.model("assignment", AssignmentSchema);