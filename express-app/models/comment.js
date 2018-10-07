var mongoose = require("mongoose");

// Schema Setup
var CommentSchema = new mongoose.Schema({

	author: {

		id: {

			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},

		name: String
	},

	text: String
});

module.exports = mongoose.model("Comment", CommentSchema);