const axios = require("axios");
const API_KEY = process.env.API_KEY;

//build query

const buildQuery = (url, query) => {
	const queryParams = Object.keys(query);

	if (queryParams.includes("location")) {
		url += `q=${query.location}`;
	} else if (queryParams.includes("zip")) {
		url += `zip=${query.zip}`;
	} else {
		if (queryParams.includes("lat") || queryParams.includes("lon")) {
			url += `lat=${query.lat}&lon=${query.lon}`;
		} else {
			throw new Error("Location or Cordinates is required");
		}
	}

	if (queryParams.includes("units")) {
		url += `&units=${query.units}`;
	}

	if (queryParams.includes("start")) {
		url += `&start=${query.start}`;
	}
	if (queryParams.includes("end")) {
		url += `&end=${query.end}`;
	}
	if (queryParams.includes("cnt")) {
		url += `&cnt=${query.cnt}`;
	}
	if (queryParams.includes("appid")) {
		url += `&appid=${query.appid}`;
	}
	url += `&appid=${API_KEY}`;
	return url;
};

exports.geoCodingDirectHelper = async (query) => {
	const url = buildQuery(
		"https://api.openweathermap.org/geo/1.0/direct?",
		query
	);
	const response = await axios.get(url);
	return response.data;
};

exports.geoCodingReveseHelper = async (query) => {
	const url = buildQuery(
		"https://api.openweathermap.org/geo/1.0/reverse?",
		query
	);
	const response = await axios.get(url);
	return response.data;
};

// Helper function for retrieving current weather data
exports.getCurrentWeatherDataHelper = async (query) => {
	const url = buildQuery(
		"https://api.openweathermap.org/data/2.5/weather?",
		query
	);
	const { data } = await axios.get(url);
	return data;
};

// Helper function for retrieving 5-day weather forecast
exports.getFiveDayForecast = async (query) => {
	const url = buildQuery(
		"https://api.openweathermap.org/data/2.5/forecast?",
		query
	);
	console.log(url);
	const { data } = await axios.get(url);
	return data;
};
