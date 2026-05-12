# React Weather App
A web app that allows users to search for weather conditions of any city in the world. Displays current weather information and a 5-day forecast using the SheCodes Weather API.

# Features
- Users can search for weather conditions of any city in the world.
- The app displays the current weather conditions, including temperature and weather description.
- The app utilizes the SheCodes Weather API to fetch weather data.

# Technologies & Tools Used
- React.js
- HTML
- CSS
- JavaScript
- VS Code
- SheCodes Weather API

# Project Structure
```
src/
├── components/
│   ├── App.js              # Main component (weather search, state management)
│   ├── SearchEngine.js     # Search input component
│   └── Forecast.js         # 5-day forecast display component
├── constants.js            # API endpoints, months, days constants
├── styles.css              # Global styles
└── index.js                # React entry point

public/
├── index.html              # HTML template
└── manifest.json           # PWA manifest

.env                        # API key configuration (add this file)
.env.example                # Example env file template
```

# How It Works
1. **User searches for a city** → Enters city name in SearchEngine component
2. **App fetches current weather** → Calls SheCodes API with city query
3. **Weather data is received** → App updates state with temperature, humidity, conditions
4. **Forecast component loads** → Fetches 5-day forecast data
5. **Results display** → Shows current weather + 5-day forecast
6. **Error handling** → Shows helpful messages if API key is missing/invalid or city not found

# Technologies & Tools Used

# Installation and Usage
To use this app, you can follow these steps:

- Clone the repository or download the source code.
- Open the project in your preferred code editor.
- Run  `npm install` to install the necessary dependencies.
- Create a `.env` file in the project root and add:

	`REACT_APP_WEATHER_API_KEY=your_shecodes_api_key_here`

- Run `npm start` to start the development server.
- Open your browser and navigate to `http://localhost:3000` to use the app.

Important: If you change the `.env` file while the development server is running, restart `npm start` so React picks up the new value.

To use the app, simply type the name of the city you want to search for in the search bar and press Enter. The app will display the current weather conditions for the searched city.

# License
This project is licensed under the MIT license.
