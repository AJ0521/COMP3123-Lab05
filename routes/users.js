const express = require('express');
const fs = require('fs');
const path = require('path');
const routerUser = express.Router();

/*
- Return all details from user.json file to client as JSON format
*/
routerUser.get('/profile', (req,res) => {
  try {
    const userDataPath = path.join(__dirname, '..', 'user.json');
    const userData = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));
    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read user data' });
  }
});



/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
routerUser.post('/login', (req,res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({
        status: false,
        message: "Username and password are required"
      });
    }
    
    const userDataPath = path.join(__dirname, '..', 'user.json');
    const userData = JSON.parse(fs.readFileSync(userDataPath, 'utf8'));
    
    if (userData.username !== username) {
      return res.json({
        status: false,
        message: "User Name is invalid"
      });
    }
    
    if (userData.password !== password) {
      return res.json({
        status: false,
        message: "Password is invalid"
      });
    }
    
    res.json({
      status: true,
      message: "User Is valid"
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
routerUser.get('/logout', (req,res) => {
  const { username } = req.query;
  
  if (!username) {
    return res.status(400).send('<b>Username parameter is required</b>');
  }
  
  res.send(`<b>${username} successfully logged out.</b>`);
});

module.exports = routerUser;