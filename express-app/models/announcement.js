var mongoose = require("mongoose");

// Schema setup
var AnnouncementSchema = new mongoose.Schema({

	text: String,
	author: {

		id: {

			type: mongoose.Schema.Types.ObjectId,
			ref: "user"
		},

		name: String,
		image: String
	},

	comments: [{

		type: mongoose.Schema.Types.ObjectId,
		ref: "comment"
	}]
});

module.exports = mongoose.model("announcement", AnnouncementSchema);