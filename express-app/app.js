var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var User = require("./models/user");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var authRoutes = require("./routes/auth_routes");
var facultyRoutes = require("./routes/faculty_routes");
var studentRoutes = require("./routes/student_routes");
var keys = require("./config/keys");

mongoose.connect(keys.mongodb.dbURI, {

	useNewUrlParser: true
}, () => console.log("Connected to MongoDB"));

var app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({

	entended: true
}));

app.use(require("express-session") ({

	secret: "This is supposed to be a secret",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

app.use(function(req, res, next) {

	res.locals.currentUser = req.user;
	next();
});

app.use(authRoutes);
app.use(facultyRoutes);
app.use(studentRoutes);

app.listen(3000, () => console.log("Listening to port 3000"));

// module.exports = app;