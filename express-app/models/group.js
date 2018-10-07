var mongoose = require("mongoose");

// Schema setup
var GroupSchema = new mongoose.Schema({

	group_id: String,
	faculty: {

		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	},
	subject: {

		id: {

			type: mongoose.Schema.Types.ObjectId,
			ref: "Subject"
		}
	}
});

module.exports = mongoose.model("Group", GroupSchema);