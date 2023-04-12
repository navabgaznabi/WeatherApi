const HelperFunction = require("./HelperFunction");

const {
	getCurrentWeatherDataHelper,
	getFiveDayForecast,
	geoCodingDirectHelper,
	geoCodingReveseHelper,
} = HelperFunction;

exports.getCurrentWeatherData = async (req, res) => {
	try {
		const weatherData = await getCurrentWeatherDataHelper(req.query);
		res.json(weatherData);
	} catch (err) {
		console.log(err);
		res.status(400).send({
			status: "Bad Request",
			message: err.message,
		});
	}
};

exports.getForcastData = async (req, res) => {
	try {
		const forecastData = await getFiveDayForecast(req.query);
		res.json(forecastData);
	} catch (err) {
		console.log(err);
		res.status(400).send({
			status: "Bad Request",
			message: err.message,
		});
	}
};
exports.geoCodingReverse = async (req, res) => {
	try {
		const geoCodedReverse = await geoCodingReveseHelper(req.query);
		res.status(200).json(geoCodedReverse);
	} catch (err) {
		console.log(err);
		res.status(400).send({
			status: "Bad Request",
			message: err.message,
		});
	}
};
exports.geoCoding = async (req, res) => {
	try {
		const geocodedData = await geoCodingDirectHelper(req.query);
		res.status(200).json(geocodedData);
	} catch (err) {
		console.log(err);
		res.status(400).send({
			status: "Bad Request",
			message: err.message,
		});
	}
};
