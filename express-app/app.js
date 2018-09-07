const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes");
const mongoose = require("mongoose");

var app = express();

app.use(bodyParser.urlencoded({

	extended: true
}));
// console.log(__dirname + "/public");
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.use("/", routes);

app.listen(3000, () => console.log("Listening to port 3000"));

// module.exports = app;