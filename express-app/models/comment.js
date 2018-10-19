var mongoose = require("mongoose");

// Schema Setup
var CommentSchema = new mongoose.Schema({

	text: String,

	author: {

		id: {

			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},

		name: String,
		image: String
	}

});

module.exports = mongoose.model("comment", CommentSchema);