const express = require('express');
const route = express.Router();

const { registerUser, loginUser
} = require('../controllers/userController');


// CRUD routes


// Auth routes
route.post('/signup', registerUser);
route.post('/login', loginUser);

module.exports = route;