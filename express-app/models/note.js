var mongoose = require("mongoose");

var NoteSchema = new mongoose.Schema({
    title: String,
    link: String
});

module.exports = mongoose.model("note", NoteSchema);