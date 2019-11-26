// Server-only code

//I. Define a new express app (documentation)
const express = require("express"); 
const app = express(); 

// IV.1 Database require
const Datastore = require("nedb");

//II. Server starts listening for callbacks - (port, callback)
app.listen(3000, () => console.log("Listening at Port: 3000.")); 
 
// Serve static files through express
app.use(express.static("public"));

// Detect device information through npm package called express-useragent
const useragent = require('express-useragent');
app.use(useragent.express());

// 3. Parse incoming data as JSON and limit it to 1mb to avoid flooding
app.use(express.json({limit:'1mb'}));

// IV.2 Database define
const database = new Datastore({ filename: '.data/database.db', autoload: true });


//3 steps needed: Routing, JSON parsing, and GET request with fetch()
// III.1. POST method route - What i am really doing is creating an API! Next i need to POST data from client to here (step 2 is in client code)
app.post('/api', (request, response) => {
  console.log('I got a request from: ' + request.useragent.source);//line 8,9 - You see this in server console
  console.log(request.body );
  console.log("--------------")
  //response.end(); to finish. or just send some data back like below
  //You see this in Client console :)
  
  // IV.3 Push information into the DB.
  database.insert(request.body);
  
  response.json({
    status: "It worked!",
    latitude: request.body.lat,
    longitude: request.body.lon,
    device: request.useragent.source,
    dateTime: request.body.dateTime
  }); 
});



