const mongoose = require("mongoose");

// Schema setup
var AnnouncementSchema = new mongoose.Schema({

	author: {

		id: {

			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},

		username: String,
		image: String
	},

	text: String
});

module.exports = mongoose.model("Announcement", AnnouncementSchema);