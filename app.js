const express = require("express");
const passport = require("passport");
const session = require("express-session");

require("./auth");

const geoWeatherController = require("./controllers/WeatherController");

const app = express();

app.use(express.json());

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true,
	})
);

app.use(passport.authenticate("session"));

// Use the Google OAuth2 authentication strategy with Passport middleware
app.get(
	"/auth/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
	})
);

// Callback URL after successful authentication
app.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		successRedirect: "/loggedIn",
		failureRedirect: "/auth/failed",
	})
);
// Middleware function to check if user is Logged In.
app.use((req, res, next) => {
	req.user ? next() : res.sendStatus(401);
});

app.get("/loggedIn", (req, res) => {
	res.status(200).json({ message: "Successfully Logged in" });
});

//failed route
app.get("/auth/failed", (req, res) => {
	res.status(401).json({
		message: "Somthing went wronggg while authantcating",
	});
});

// Retrive current weater data based on location zipcode or cordinates
app.route("/api/v1/currentWeatherData").get(
	geoWeatherController.getCurrentWeatherData
);

// Endpoint for retrieving 5-day weather forecast
app.route("/api/v1/forcast").get(geoWeatherController.getForcastData);

// Endpoint for geocoding reverse (cordinates to city)
app.route("/api/v1/geo/reverse").get(geoWeatherController.geoCodingReverse);

// Endpoint for geocoding (city to cordinates)
app.route("/api/v1/geo/city").get(geoWeatherController.geoCoding);

// For Rest of the Routes.
app.all("*", (req, res, next) => {
	res.status(404).json({
		status: "failed",
		message: `Can't Find ${req.originalUrl}, please ensure you are accessing correct route.`,
	});
});

module.exports = app;
