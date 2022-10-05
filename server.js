// Creat an object as an endpoint
projectData = {};

// Here we are requiring Express
const express = require("express");

// Creat the app
const app = express();

// Here we are requiring Cors to use it
const cors = require("cors");
app.use(cors());

// Including body parser
const bodyParser= require("body-parser");

// using the body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// My project (HTML, CSS and JS) folder
app.use(express.static("mySite"));

// The GET request
const getCurrentData = (req, res) => res.send(projectData);
app.get('/currentData', getCurrentData);

// The POST request
const postNewData = (req, res) => 
{
  projectData = req.body;
  console.log(projectData);
  res.send(projectData);
}
app.post('/putData', postNewData);


// setting the port number
const port = 8050;

// Show that the server is running successfully 
const showStatus = () =>
{
  console.log('The server is running');
  console.log(`The port number is: ${port}`);
}
app.listen(port, showStatus);

