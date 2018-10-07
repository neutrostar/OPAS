var mongoose = require("mongoose");

// Schema setup
var FacultySchema = new mongoose.Schema({

	current: {

		id: {

			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	},

	groups: [{

		type: mongoose.Schema.Types.ObjectId,
		ref: "Group"
	}],
	
	announcements: [{

		type: mongoose.Schema.Types.ObjectId,
		ref: "Announcement"
	}]
});

module.exports = mongoose.model("FacultyMain", FacultySchema);