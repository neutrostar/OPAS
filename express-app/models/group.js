var mongoose = require("mongoose");

// Schema setup
var GroupSchema = new mongoose.Schema({

	group_name: String,
	group_pass: String,

	announcements: [{

		type: mongoose.Schema.Types.ObjectId,
		ref: "announcement"
	}]
});

module.exports = mongoose.model("group", GroupSchema);