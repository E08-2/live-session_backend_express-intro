// * Create a server which makes a request to the NASA API for some data...
// And then uses that data to create the response:
//  IMAGE
//  DESCRIPTION

import express from "express";
import axios from "axios";

const app = express();

// Axios is promise-based, so we can handle the asychronous nature of the request
// Unlike with fetch(), we don't need to worry about "translating" the HTTP response using response.json()!
// ... instead, Axios can do this by itself, which saves us a bit of time/effort!
app.get("/", (req, res, next) => {
    axios.get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
    .then(response => {
        // Grab some data from the response sent by the NASA server
        const img = response.data.url;
        const description = response.data.explanation;

        const content = `
        <div>
            <img src=${img} />
            <p>${description}</p>
        </div>
        `

        // Send the content back to our client
        res.send(content);
    })
    // Axios also lets you use a catch block, so any errors can be handled there
    // Remember to ALWAYS send back a response to the client - don't assume there will never be an error!
    .catch(err => {
        console.log(err);
        res.send("Error!");
    })

    // try {
    //     const response = await axios.get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")

    //     const img = response.data.url;
    //     const description = response.data.explanation;

    //     const content = `
    //     <div>
    //         <img src=${img} />
    //         <p>${description}</p>
    //     </div>
    //     `

    //     // Send the content back to our client
    //     res.send(content);
    // } catch (err) {
    //     console.log(err)
    //     res.send("Error!");
    // }

});

app.listen(3000, () => {
    console.log("Space server has begun on port 3000!");
})