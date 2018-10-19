var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({

	username: String,
	password: String,
	email: String,
	name: String,
	image: String,
	announcements: [{

		type: mongoose.Schema.Types.ObjectId,
		ref: "announcement"
	}]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);