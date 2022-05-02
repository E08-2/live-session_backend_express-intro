import express from "express";
import axios from "axios";

const app = express();

// Using a dynamic route to get weather info for a city
app.get("/:city", (req, res, next) => {

    // Find the city the user is interested in from the parameter
    const city = req.params.city;

    // Get lots of weather data about the city
    // Bonus: also make sure temperature is returned in celsius, not kelvin (using "units=metric")!
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ea04029f282ddcd7cac9f78d6e775c8c`)
    .then(response => {
        // Get the specific data you need from the API response
        const temp = response.data.main.temp;
        const city = response.data.name;
        const country = response.data.sys.country;
        const conditions = response.data.weather[0].description;

        // Use data to display weather info in browser
        const line1 = `It is now ${temp}°C in ${city}, ${country}`;
        const line2 = `The current weather conditions are: ${conditions}`

        const content = `
        <div>
            <h1>My Weather App</h1>
            <p>${line1}</p>
            <p>${line2}</p>
        </div>
        `

        // Send the response back to the client
        res.send(content);
    })
    // Error handling
    .catch(err => {
        console.log(err);

        // If there is an error, you still need to send a response back to the client!
        res.send(`Error 404: city not found!`);
    })
})

app.listen(3000, () => {
    console.log("Weather server started!");
})