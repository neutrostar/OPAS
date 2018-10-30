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
		input: String
	}],

	languages: [String]
});

module.exports = mongoose.model("assignment", AssignmentSchema);