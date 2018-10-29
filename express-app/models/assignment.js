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

	// ques1: {

	// 	title: String,
	// 	marks: Number
	// },

	// ques2: {

	// 	title: String,
	// 	marks: Number
	// }

	questions: [{

		type: mongoose.Schema.Types.ObjectId,
		ref: "question"
	}]
});

module.exports = mongoose.model("assignment", AssignmentSchema);