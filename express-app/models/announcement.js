const mongoose = require("mongoose");

// Schema setup
var announcementSchema = new mongoose.Schema({

	date: String,
	text: String,
	author: {

		id: {

			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},

		username: String
	}
});

module.exports = mongoose.model("Announcement", announcementSchema);