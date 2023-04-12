const request = require("supertest");
require("dotenv").config();
const app = require("../app");

// Please Note that for faking a login in am comment the middleware that checks log in.

describe("GET /auth/google", () => {
	it("should redirect to Google authentication page", async () => {
		const res = await request(app).get("/auth/google");
		expect(res.statusCode).toEqual(302);
		expect(res.headers.location).toMatch(
			/^https:\/\/accounts\.google\.com\/o\/oauth2\/v2\/auth/
		);
	});
});

describe("GET /loggedIn", () => {
	it("should return a 200 status code and a success message when user is logged in", async () => {
		const agent = request.agent(app);
		await agent.get("/auth/google");
		const res = await agent.get("/loggedIn");
		expect(res.statusCode).toEqual(200);
		expect(res.body).toEqual({ message: "Successfully Logged in" });
	});
});

describe("GET /api/v1/currentWeatherData", () => {
	it("should return a 200 status code and weather data when valid zip code or city name is provided", async () => {
		const res = await request(app).get(
			"/api/v1/currentWeatherData?location=10001"
		);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("name");
		expect(res.body).toHaveProperty("weather");
	});

	it("should return a 200 status code and weather data when valid latitude and longitude are provided", async () => {
		const res = await request(app).get(
			"/api/v1/currentWeatherData?lat=40.7128&lon=-74.0060"
		);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("name");
		expect(res.body).toHaveProperty("weather");
	});

	it("should return a 400 status code when invalid  city name or zip code are provided", async () => {
		const res = await request(app).get(
			"/api/v1/currentWeatherData?location=invalid"
		);
		expect(res.statusCode).toEqual(400);
	});
	it("should return a 400 status code when invalid no city name zipcode or lat and lon is provided", async () => {
		const res = await request(app).get(
			"/api/v1/currentWeatherData?invalid=param"
		);
		expect(res.statusCode).toEqual(400);
	});
});

describe("GET /api/v1/forcast", () => {
	it("should return a 200 status code and weather data when valid zip code or city name is provided", async () => {
		const res = await request(app).get("/api/v1/forcast?location=10001");
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("city");
	});

	it("should return a 200 status code and weather data when valid latitude and longitude are provided", async () => {
		const res = await request(app).get(
			"/api/v1/forcast?lat=40.7128&lon=-74.0060"
		);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("city");
	});

	it("should return a 400 status code when invalid  city name or zip code are provided", async () => {
		const res = await request(app).get("/api/v1/forcast?location=invaalid");
		expect(res.statusCode).toEqual(400);
	});
	it("should return a 400 status code when invalid no city name zipcode or lat and lon is provided", async () => {
		const res = await request(app).get("/api/v1/forcast?invalid=param");
		expect(res.statusCode).toEqual(400);
	});
});

describe("GET /api/v1/geo/city", () => {
	it("should return a 200 status code and weather data when valid city name is provided", async () => {
		const res = await request(app).get(
			"/api/v1/geo/city?location=Ludhiana"
		);
		expect(res.statusCode).toEqual(200);
	});

	it("should return a 400 status code when invalid no city namee is provided", async () => {
		const res = await request(app).get("/api/v1/geo/city?invalid=param");
		expect(res.statusCode).toEqual(400);
	});
});

describe("GET /api/v1/geo/reverse", () => {
	it("should return a 200 status code and weather data when valid latitude and longitude are provided", async () => {
		const res = await request(app).get(
			"/api/v1/geo/reverse?lat=40.7128&lon=-74.0060"
		);
		expect(res.statusCode).toEqual(200);
	});

	it("should return a 400 status code when invalid no city name zipcode or lat and lon is provided", async () => {
		const res = await request(app).get("/api/v1/geo/reverse?invalid=param");
		expect(res.statusCode).toEqual(400);
	});
});

// Add more test cases for other endpoints as needed
