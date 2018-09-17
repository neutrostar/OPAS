const mongoose = require("mongoose");

// Schema setup
var studentSchema = new mongoose.Schema({

	rollnumber: {

		type: String,
		index: true
	},
	name: String,
	image: String,
	password: String,
	mail: String
});

var Student = module.exports = mongoose.model("Student", studentSchema);

module.exports.getStudentByRollnumber = function(rollnumber, callback){
	var query = {rollnumber: rollnumber};
	Student.findOne(query, callback);
}

module.exports.getStudentById = function(id, callback){
	Student.findById(id, callback);
}