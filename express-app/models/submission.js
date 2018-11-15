var mongoose = require("mongoose");

// Schema setup
var SubmissionSchema = new mongoose.Schema({


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
		}
	},

	output: String,
	filename: String
});

module.exports = mongoose.model("submission", SubmissionSchema);