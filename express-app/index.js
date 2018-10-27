var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var User = require("./user");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var keys = require("./config/keys");

mongoose.connect(keys.mongodb.dbURI, {

	useNewUrlParser: true
}, () => console.log("Connected to MongoDB"));

var app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.use(require("express-session") ({

	secret: "secret",
	resave: false,
	saveUninitialized: false
}));

app.use(bodyParser.urlencoded({

	extended: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy({

	usernameField: "username"
}, User.authenticate()));

// ROUTES
app.get("/", function(req, res) {

	res.render("index");
});

// REGISTER
app.post("/auth/register", function(req, res) {

	User.register(new User({

		username: req.body.user.username
	}), req.body.user.password, function(err, newUser) {

		if (err) {

			console.log(err);
			return res.redirect("/");
		}

		passport.authenticate("local")(req, res, function() {

			res.redirect("/faculty");
		});
	});
});

app.listen(3000, () => console.log("Listening to port 3000"));