/**
 * Developers: Brice Jenkins, Alexandra Meyers, Meredith Baker
 * Copyright 2025
 * 
 * Description: Defines APIs for client-side use of the authorization
 * service. Allows client to register new username and password, get login
 * validation, check login status, logout a user, and delete an email/
 * password.
 */

import express from 'express';
import * as database from './database.mjs';
import asyncHandler from 'express-async-handler';

const router = express.Router();
router.use(express.json());


router.post('/register', asyncHandler(async (req, res) => {
    console.log("request to register user")
    const userAdded = await database.addUser(req.body.email, req.body.password);
    if (userAdded) {
        res.status(201).json({message: "User successfully added"});
    } else {
        res.status(400).json({message: "Error: Email already exists"});
    }
}));

router.post('/login', asyncHandler(async (req, res) => {
    console.log("request for user login")
    const email = req.body.email;
    const password = req.body.password;
    const isValid = await database.validateUser(email, password);
    if (isValid) {
        req.session.user = {email};
        res.status(200).json({message: "Login successful"})
    } else {
        res.status(400).json({message: "Error: Email or password incorrect"});
    }
}));

router.get('/login-status', asyncHandler(async (req, res) => {
    if (req.session.user) {
        res.status(200).json({email: req.session.user.email, message: "User logged in"})
    } else {
        res.status(401).json({message: "User not logged in"})
    }
}))

router.post('/logout', asyncHandler(async (req, res) => {
    console.log("request to logout user")
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: "Logout error" });
        }
        res.clearCookie('authService_session', { path: '/'});
        res.status(200).json({message: 'Logout successful'})
    }) 
}));

router.delete('/users/myaccount', asyncHandler(async (req, res) => {
    const isDeleted = database.deleteUser(req.session.user.email);
    if (isDeleted) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ error: "Logout error" });
            }
            res.clearCookie('authService_session', { path: '/'});
            res.status(200).json({message: 'Logout successful'})
        }) 
    } else {
        res.status(400).json({message: 'Error deleting username and password'})
    }
}));


export default router;