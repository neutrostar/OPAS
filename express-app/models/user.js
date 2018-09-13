var mongoose = require("mongoose");

// Schema setup
var userSchema = new mongoose.Schema({

	name: String,
	image: String,
	password: String,
	rollnumber: String,
	mail: String,
	isFaculty: Boolean,
	groups: [{

		type: mongoose.Schema.Types.ObjectId,
		ref: "Group"
	}]
});

module.exports = mongoose.model("User", userSchema);