const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes");
const mongoose = require("mongoose");
const keys = require("./config/keys");

var app = express();

mongoose.connect(keys.mongodb.dbURI, () => {

	console.log("Connected to MongoDb");
});

app.use(bodyParser.urlencoded({

	extended: true
}));
// console.log(__dirname + "/public");
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.use("/", routes);

app.listen(3000, () => console.log("Listening to port 3000"));

// module.exports = app;