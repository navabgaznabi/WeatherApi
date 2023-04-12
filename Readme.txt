Steps to run this API:
    1. clone the repo.
    2. run > npm install

    Make a .env file at root containing

    Add these variables.
    CLIENT_SECRET -- obtained from google credentail tab
    CLIENT_ID -- obtained from google credentail tab
    CALL_BACK_URL -- that is added in google redirect links
    SESSION_SECRET -- any secret key you wish to keep.
    API_KEY --- obtained from openweathermap. free plan.

Endpoints:- (Note you would not be able to access any route if you are not authanticated)
1. authentication:   /auth/google

2. For getting current weater data: 
        
        By city name                /api/v1/currentWeatherData?location=Ludhiana
        By ZipCode                  /api/v1/currentWeatherData?location=141007&units=metric
        By coordinates              /api/v1/currentWeatherData?lat=10.25&lon=10.99&units=metric

        response:  
        {
                "coord": {
                    "lon": 75.85,
                    "lat": 30.9
                },
                "weather": [
                    {
                        "id": 802,
                        "main": "Clouds",
                        "description": "scattered clouds",
                        "icon": "03d"
                    }
                ],
                "base": "stations",
                "main": {
                    "temp": 309.31,
                    "feels_like": 308.84,
                    "temp_min": 304.74,
                    "temp_max": 309.31,
                    "pressure": 984,
                    "humidity": 27
                },
                "visibility": 10000,
                "wind": {
                    "speed": 3.75,
                    "deg": 311,
                    "gust": 4.55
                },
                "clouds": {
                    "all": 37
                },
                "dt": 1681277618,
                "sys": {
                    "type": 2,
                    "id": 2036316,
                    "country": "IN",
                    "sunrise": 1681259573,
                    "sunset": 1681305706
                },
                "timezone": 19800,
                "id": 1264728,
                "name": "Ludhiana",
                "cod": 200
            }

3. For forcast: 

        By city name                /api/v1/forcast?ocation=Ludhiana&cnt=10
        By ZipCode                  /api/v1/forcastlLocation=141007&units=metric&cnt=10
        By coordinates              /api/v1/forcast?lat=10.25&lon=10.99&units=metric&cnt=8

        Response:
{
    "cod": "200",
    "message": 0,
    "cnt": 40,
    "list": [
        {
            "dt": 1681279200,
            "main": {
                "temp": 36.16,
                "feels_like": 35.69,
                "temp_min": 35.42,
                "temp_max": 36.16,
                "pressure": 984,
                "sea_level": 984,
                "grnd_level": 984,
                "humidity": 27,
                "temp_kf": 0.74
            },
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03d"
                }
            ],
            "clouds": {
                "all": 37
            },
            "wind": {
                "speed": 3.75,
                "deg": 311,
                "gust": 4.55
            },
            "visibility": 10000,
            "pop": 0,
            "sys": {
                "pod": "d"
            },
            "dt_txt": "2023-04-12 06:00:00"
        },
        .....
        .....
    ],
    "city": {
        "id": 1264728,
        "name": "Ludhiana",
        "coord": {
            "lat": 30.9,
            "lon": 75.85
        },
        "country": "IN",
        "population": 15000,
        "timezone": 19800,
        "sunrise": 1681259573,
        "sunset": 1681305706
    }
}

4. Endpoint for geocoding reverse (cordinates to city)

    /api/v1/geo/reverse?lat=30.90&lon=75.851

5. Endpoint for geocoding (city to cordinates)
    
    /api/v1/geo/city?location=Ludhiana

