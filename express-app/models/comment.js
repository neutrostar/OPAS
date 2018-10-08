var mongoose = require("mongoose");

// Schema Setup
var CommentSchema = new mongoose.Schema({

	text: String,

	author: {

		id: {

			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},

		name: String
	}

});

module.exports = mongoose.model("Comment", CommentSchema);