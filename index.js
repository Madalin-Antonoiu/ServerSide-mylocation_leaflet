//Server-only code

//Create express app
const express = require("express"); //I import this in order to be able to create an app
const app = express(); // the whole library comes in as a function that i can execute

//Start listening  - (port, callback)
app.listen(3000, () => console.log("Listening at Port: 3000.")); //This will be displayed in bash

//So when i run this and open localhost:3000 in the browser, i want to see index.html
//The way i do that is by telling express to host my static files!

//you can also give it just a file, but better to put in a folder
app.use(express.static("public"));
