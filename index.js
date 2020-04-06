const express = require('express');
const cors = require('cors');

// set up server
const server = express();

// use middleware
server.use(express.json()); //parse JSON from the body
server.use(cors());

// users data used for our endpoints
let users = [
    {
        id: 1,
        name: "Jackson Ogles", // String, required
        bio: "Dream team lead"  // String, required
      },
      {
        id: 2,
        name: "Christine Carpenter", // String, required
        bio: "Awesome section lead"  // String, required
      },
      {
        id: 3,
        name: "Sean Naleid", // String, required
        bio: "Another awesome section lead"  // String, required
      },


    {
        id: 4,
        name: "Alp Karavil", // String, required
        bio: "Fullstack web developer, 10/10 would work with him again."  // String, required
      },
      {
        id: 5,
        name: "Craig John Donaldson Jr", // String, required
        bio: "Fullstack web developer, 10/10 would work with him again."  // String, required
      },
      {
        id: 6,
        name: "David Shestopal", // String, required
        bio: "Fullstack web developer, 10/10 would work with him again."  // String, required
      },
      {
        id: 7,
        name: "Josiah Roa", // String, required
        bio: "Fullstack web developer, 10/10 would work with him again."  // String, required
      },
      {
        id: 8,
        name: "Justin Kuenzinger", // String, required
        bio: "Fullstack web developer, 10/10 would work with him again."  // String, required
      },
      {
        id: 9,
        name: "Katya Pavlopoulos", // String, required
        bio: "Fullstack web developer, obviously awesome because she built this directory."  // String, required
      },
      {
        id: 10,
        name: "Kenji Greene", // String, required
        bio: "Fullstack web developer, 10/10 would work with him again."  // String, required
      },
      {
        id: 11,
        name: "Key Bristol", // String, required
        bio: "Fullstack web developer, 10/10 would work with him again."  // String, required
      },
      {
        id: 12,
        name: "Natalia Beckstead", // String, required
        bio: "Fullstack web developer, 10/10 would work with her again."  // String, required
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
        const userSaved = users.find(user => user.name === newUser.name);
        if(userSaved){
            // send success status, newly created user document
            res.status(201).json(newUser);
        } else {
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database"})
        }        
    }    
});

// handle DELETE requests
server.delete("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const userToDelete = users.find(user => user.id === id);
    if(userToDelete){
        // update users / delete user with specified id
        const updatedUsers = users.filter(user => user.id !== id);
        users = updatedUsers;
        // check to make sure userToDelete was successfully removed from users
        // if all went well, 'deleted' should return undefined
        const deleted = users.find(user => user.id === id);
        if(!deleted){
            // if 'deleted' is falsey, send success status and deleted user
            res.status(200).json(userToDelete);
        } else {
            // send error status
            res.status(500).json({ errorMessage: "The user could not be removed"})
        }        
    } else {
        // send error status + message
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist"})
    }
});

// handle PUT requests
server.put("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const userToUpdate = users.find(user => user.id === id);
    if(userToUpdate){
        if(!req.body.name || !req.body.bio){
            // missing info, send error status + message
            res.status(400).json({ errorMessage: "Please provide name and bio for the user"});
        } else {
            const updatedUsers = users.map(user => {
                if(user.id === id){
                    return req.body;
                } else {
                    return user;
                }
            });
            users = updatedUsers;
            // checking to make sure user got updated successfully
            let updated = users.find(user => user.id === id);
            // if all went well, the expression below should evaluate to true
            updated = updated.id === req.body.id && updated.name === req.body.name && updated.bio === req.body.bio
            if(updated){
                // send success status + modified user
                res.status(200).json(req.body);
            } else {
                 // send error status + message
                res.status(500).json({ errorMessage: "The user information could not be modified"})
            }
        }
    } else {
        // no id match, send error status + message
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist"});
    }
});

//set up port
const port = 5000;

server.listen(5000, () => {
    console.log(`\n=== server is listening on port ${port} ===\n`);
});