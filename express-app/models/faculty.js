const mongoose = require("mongoose");

// Schema setup
var facultySchema = new mongoose.Schema({

	rollnumber: {

		type: String,
		index: true
	},
	name: String,
	image: String,
	password: String,
	mail: String
});

var Faculty = module.exports = mongoose.model("Faculty", facultySchema);

module.exports.getFacultyByRollnumber = function(rollnumber, callback){
	var query = {rollnumber: rollnumber};
	Faculty.findOne(query, callback);
}

module.exports.getFacultyById = function(id, callback){
	Faculty.findById(id, callback);
}