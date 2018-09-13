const mongoose = require("mongoose");

// Schema setup
var announcementSchema = new mongoose.Schema({

	date: String,
	description: String,
	group: [{

		type: mongoose.Schema.Types.ObjectId,
		ref: "Group"
	}]
});

module.exports = mongoose.model("Announcement", announcementSchema);