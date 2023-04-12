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
Note: to run this in postman you would have to first run /auth/google in web-browser where you can login via googleaccount and obtain the session cookie store in local storage.
then add that cookie in he postman header.

1. authentication:   /auth/google

2. For getting current weater Data: 
        
        By city name                /api/v1/currentWeatherData?location=Ludhiana
        By ZipCode                  /api/v1/currentWeatherData?location=141007&units=metric
        By coordinates              /api/v1/currentWeatherData?lat=10.25&lon=10.99&units=metric
        
        Optional inputs: units : metric - imperial  
        
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

3. For forecast: 

        By city name                /api/v1/forcast?ocation=Ludhiana&cnt=10
        By ZipCode                  /api/v1/forcastlLocation=141007&units=metric&cnt=10
        By coordinates              /api/v1/forcast?lat=10.25&lon=10.99&units=metric&cnt=8

        Optional inputs: units : metric - imperial 
                         cnt : (number) 1 < n <40 number of days forecast 

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

    Response:
    [
        {
            "name": "Ludhiana",
            "local_names": {
                "en": "Ludhiana",
                "pa": "ਲੁਧਿਆਣਾ",
                "ko": "루디아나",
                "ta": "லூதியானா",
                "he": "לודיאנה",
                "ur": "لدھیانہ",
                "hi": "लुधियाना",
                "kn": "ಲುಧಿಅನಾ",
                "es": "Ludhiana",
                "de": "Ludhiana",
                "zh": "卢迪亚纳",
                "fr": "Ludhiana",
                "te": "లూధియానా",
                "ja": "ルディヤーナー",
                "ml": "ലുധിയാന",
                "ru": "Лудхияна"
            },
            "lat": 30.9090157,
            "lon": 75.851601,
            "country": "IN",
            "state": "Punjab"
        }
    ]

5. Endpoint for geocoding (city to cordinates)
    
    /api/v1/geo/city?location=Ludhiana

    Response:
    [
        {
            "name": "Ludhiana",
            "local_names": {
                "ko": "루디아나",
                "ur": "لدھیانہ",
                "he": "לודיאנה",
                "zh": "卢迪亚纳",
                "kn": "ಲುಧಿಅನಾ",
                "de": "Ludhiana",
                "hi": "लुधियाना",
                "ru": "Лудхияна",
                "pa": "ਲੁਧਿਆਣਾ",
                "ml": "ലുധിയാന",
                "fr": "Ludhiana",
                "te": "లూధియానా",
                "en": "Ludhiana",
                "ja": "ルディヤーナー",
                "es": "Ludhiana",
                "ta": "லூதியானா"
            },
            "lat": 30.9090157,
            "lon": 75.851601,
            "country": "IN",
            "state": "Punjab"
        }
    ]

************** Testing *************************

In order to run the tests you have to comment the middleware function in app.js
which check authentication of user because authentication is done by google server.