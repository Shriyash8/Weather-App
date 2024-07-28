document.getElementById("location-input").addEventListener('change', async () => {
    const location = document.getElementById("location-input").value;
    if (location) {
        try {
            const weatherData = await getWeatherData(location);
            displayWeatherData(weatherData);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            displayWeatherData({}); // Display a message or handle the error gracefully
        }
    }
});

const getWeatherData = async (location) => {
    if (!location) {
        return {};
    }

    const apiKey = '33a4691be06f477c73a8e46eb0732118';
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return {};
    }
};

function getBackgroundColour(temperature) {
    if (temperature < 0) {
        return 'lightblue';
    } else if (temperature < 10) {
        return 'lightgreen';
    } else if (temperature < 20) {
        return 'lightyellow';
    } else if (temperature < 30) {
        return 'lightsalmon';
    } else {
        return 'lightcoral';
    }
}

const displayWeatherData = (data) => {
    const weatherDataElement = document.getElementById("Weather-data");
    if (Object.keys(data).length === 0) {
        weatherDataElement.innerHTML = "Please enter a location to see the weather";
        weatherDataElement.style.backgroundColor = 'transparent'; // Reset background color
    } else if (data.cod !== 200) {
        weatherDataElement.innerHTML = "Error fetching weather data: " + data.message;
        weatherDataElement.style.backgroundColor = 'transparent'; // Reset background color
    } else {
        const temperatureCelsius = Math.floor(data.main.temp - 273.15);
        const backgroundColour = getBackgroundColour(temperatureCelsius);
        weatherDataElement.style.backgroundColor = backgroundColour;

        weatherDataElement.innerHTML = `<h3>${data.name}</h3>
                                        <p>Temperature: ${temperatureCelsius}°C</p>
                                        <p>Humidity: ${data.main.humidity}%</p>
                                        <p>Wind Speed: ${data.wind.speed} m/s</p>`;
    }
};

window.onload = () => {
    
    document.getElementById("location-input").value = defaultLocation;
    getWeatherData(defaultLocation).then(displayWeatherData).catch(error => {
        console.error("Error during window.onload:", error);
    });
};
