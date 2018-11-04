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

	question: String,

	status: String
});

module.exports = mongoose.model("submission", SubmissionSchema);