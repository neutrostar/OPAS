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
	
	questions: [{

		title: String,
		body: String,
		input: String
	}],

	languages: [String]
});

module.exports = mongoose.model("assignment", AssignmentSchema);