var mongoose = require("mongoose");

// Schema setup
var AssignmentSchema = new mongoose.Schema({

	title: String,
	author: {

		id: {

			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},

		name: String,
		image: String
	},

	subjects: {

		type: mongoose.Schema.Types.ObjectId,
		ref: "subject"
	},

	questions: [{

		type: mongoose.Schema.Types.ObjectId,
		ref: "question"
	}]
});

module.exports = mongoose.model("assignment", AssignmentSchema);