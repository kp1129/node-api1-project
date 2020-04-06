const express = require('express');
const shortid = require('shortid');
// set up server
const server = express();

// use middleware
server.use(express.json()); //parse JSON from the body

// users data used for our endpoints
const users = [
    {
        id: shortid.generate(),
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane"  // String, required
      },
      {
        id: shortid.generate(),
        name: "Dane Joe", // String, required
        bio: "No relation to Jane Doe"  // String, required
      }
]

// handle GET requests
server.get("/api/users", (req, res) => {
    try {
        // return array of users
        res.status(200).json(users);
    } catch(error) {
        // if can't retrieve users for some reason
        res.status(500).json({ errorMessage: "The users information could not be retrieved"})
    }
    
});

server.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    if(user){
        // if id's match, send user
        try {
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ errorMessage: "The user information could not be retrieved"})
        }        
    } else {
        // if no id match is found, send error status + message
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist"})
    }
});

// handle POST requests
server.post("/api/users", (req, res) => {
    const newUser = req.body;
    // if new user doesn't have a bio or name, send error and ask for more info
    if(!newUser.bio || !newUser.name){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user"})
    } else {
        users.push(newUser);
        // check to make sure new user got saved
        const userSaved = users.find(user => user.id === newUser.id);
        if(userSaved){
            // send success status, newly created user document
            res.status(201).json(newUser);
        } else {
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database"})
        }        
    }
    
});

//set up port
const port = 5000;

server.listen(5000, () => {
    console.log(`\n=== server is listening on port ${port} ===\n`);
});