var mongoose = require("mongoose");

// Schema setup
var SubmissionSchema = new mongoose.Schema({

	author: {

		id: {

			type: mongoose.Schema.Types.ObjectId,
			ref: "user"
		},

		name: String
	},

	assignment: {

		id: {

			type: mongoose.Schema.Types.ObjectId,
			ref: "assignment"
		},

		title: String
	},

	question: {

		id: {

			type: mongoose.Schema.Types.ObjectId,
			ref: "question"
		},

		title: String
	},

	output: String,
	filename: String
});

module.exports = mongoose.model("submission", SubmissionSchema);