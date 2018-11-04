var mongoose = require("mongoose");

// Schema setup
var GroupSchema = new mongoose.Schema({

	group_name: String,
	group_pass: String,

	users: [{

		type: mongoose.Schema.Types.ObjectId,
		ref: "user"
	}],

	announcements: [{

		type: mongoose.Schema.Types.ObjectId,
		ref: "announcement"
	}],

	assignments: [{

		type: mongoose.Schema.Types.ObjectId,
		ref: "assignment"
	}],

	submissions: [{

		type: mongoose.Schema.Types.ObjectId,
		ref: "submission"
	}],

	notes: [{
		
		type: mongoose.Schema.Types.ObjectId,
		ref: "note"
	}]
});

module.exports = mongoose.model("group", GroupSchema);