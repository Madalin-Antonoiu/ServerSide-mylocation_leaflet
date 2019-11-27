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

// 3. Parse incoming data as JSON and limit it to 1mb to avoid flooding
app.use(express.json({limit:'1mb'}));

// IV.2 Database define
const database = new Datastore({ filename: '.data/database.db', autoload: true });


//3 steps needed: Routing, JSON parsing, and GET request with fetch()
// III.1. POST method route - What i am really doing is creating an API! Next i need to POST data from client to here (step 2 is in client code)
app.post('/api', (request, response) => {
  console.log(request.body );
  console.log("--------------")
  //response.end(); to finish. or just send some data back like below
  //You see this in Client console :)
  
  // IV.3 Push data into the Database
  database.insert(request.body);
  
  response.json({
    status: "It worked!",
    //device: request.body.device,
    //latitude: request.body.lat,
    //longitude: request.body.lon,
    //dateTime: request.body.dateTime,
    //network: request.body.network,
    body: request.body
  }); 
});



