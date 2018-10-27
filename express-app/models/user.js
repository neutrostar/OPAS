var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({

	username: String,
	password: String,
	email: String,
	name: String,
	image: String,
	assignments: [{

		type: mongoose.Schema.Types.ObjectId,
		ref: "assignments"
	}]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);