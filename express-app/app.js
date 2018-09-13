const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth_routes");
const userRoutes = require("./routes/user_routes");
const facultyRoutes = require("./routes/faculty_routes");
const studentRoutes = require("./routes/student_routes");
const mongoose = require("mongoose");
const keys = require("./config/keys");

var app = express();

mongoose.connect(keys.mongodb.dbURI, {

	useNewUrlParser: true
}, () => {

	console.log("Connected to MongoDb");
});

app.use(bodyParser.urlencoded({

	extended: true
}));
// console.log(__dirname + "/public");
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/student", studentRoutes);
app.use("/faculty", facultyRoutes);

app.get("/", function(req, res) {

	res.render("index");
})

app.listen(3000, () => console.log("Listening to port 3000"));

// module.exports = app;