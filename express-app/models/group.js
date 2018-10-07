var mongoose = require("mongoose");

// Schema setup
var GroupSchema = new mongoose.Schema({

	faculty_id: {

		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},

		group_id: String,
	}
});

module.exports = mongoose.model("Group", GroupSchema);