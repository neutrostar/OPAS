const mongoose = require("mongoose");

// Schema setup
var groupSchema = new mongoose.Schema({

	code: String,
	name: String
});

module.exports = mongoose.model("Group", groupSchema);