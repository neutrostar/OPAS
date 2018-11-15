var mongoose = require("mongoose");

// Schema setup
var SubmissionSchema = new mongoose.Schema({

	user: {

		id: {

			type: mongoose.Schema.Types.ObjectId,
			ref: "user"
		},

		username: String
	},
	
	assignment: {

		id: {

			type: mongoose.Schema.Types.ObjectId,
			ref: "assignment"
		},

		title: String
	},

	question: String,

	status: String,

	link: String
});

module.exports = mongoose.model("submission", SubmissionSchema);