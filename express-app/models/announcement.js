var mongoose = require("mongoose");

// Schema setup
var AnnouncementSchema = new mongoose.Schema({

	author: {

		id: {

			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},

		name: String,
		image: String
	},

	text: String,

	comments: [{

		id: {

			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	}]
});

module.exports = mongoose.model("Announcement", AnnouncementSchema);