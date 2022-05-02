// * Initialise npm
// npm init
// * Install express
// npm install express

// ===================================

// ! Older, CommonJS syntax
// const express = require("express");

// Import the express framework using ES6 "import" syntax
// This is the more modern method, and allows you to use ES6 modules in both your front- and backend
import express from "express";

// Create an instance of "express" called "app"
// We can use this to register middleware for our server
const app = express();

// ? If we want to handle a HTTP "GET" request on a route...
// ? We can use the .get() method provided by express
// * We will focus on making GET requests today!

// The first argument of the get() method is the path the request was sent to (e.g. "/", "/users")
// The route will have a "handler" middleware function, which has access to req, res and next
// ? When the server receives a request to the route, the middleware function is executed to hande that request!

// * Route 1

// (1) HTTP method
// (2) Path
// (3) "Handler" middleware function

//  (1) (2)  (3)
app.get("/", (req, res, next) => {

    // Send back a response using the send() method of the response object
    // This combines res.write() and res.end()
    // It also sends a header with the response, to confirm the content-type (in this case, "text/html")
    res.send("<h1>Hello world!</h1>");
});

// * Route 2

app.get("/test", (req, res, next) => {
    res.send("<h1>This is the /test route!</h1>");
})

// * Route 3: dynamic route

app.get("/hello/:name", (req, res, next) => {
    res.send(`<h1>Hello ${req.params.name}</h1>`);
})

// "app" also has a "listen" method
// Note: there was no need to call "app.createServer()", unlike with the "http" module
app.listen(3000, () => {
    console.log("Server started on port 3000!");
})