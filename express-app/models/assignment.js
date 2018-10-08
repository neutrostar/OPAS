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

	subject: {

		id: {

			type: mongoose.Schema.Types.ObjectId,
			ref: "Subject"
		}
	},

	ques1: {

		title: String,
		marks: Number
	},

	ques2: {

		title: String,
		marks: Number
	}
});

module.exports = mongoose.model("Assignment", AssignmentSchema);