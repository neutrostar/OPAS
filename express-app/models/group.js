var mongoose = require("mongoose");

// Schema setup
var GroupSchema = new mongoose.Schema({

	group_id: String,
	group_name: String,
	group_pass: String,

	subject: {

		type: mongoose.Schema.Types.ObjectId,
		ref: "subject"
	},

	announcements: [{

		type: mongoose.Schema.Types.ObjectId,
		ref: "announcement"
	}]
});

module.exports = mongoose.model("group", GroupSchema);