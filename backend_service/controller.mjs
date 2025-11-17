/**
 * Developers: Brice Jenkins, Alexandra Meyers, Meredith Baker
 * Copyright 2025
 * 
 * Description: Defines APIs for client-side use of the authorization
 * service. Allows client to register new username and password, get login
 * validation, check login status, and logout.
 */

import express from 'express';
import * as database from './database.mjs';
import asyncHandler from 'express-async-handler';

const router = express.Router();
router.use(express.json());

/* Register API */
router.post('/register', asyncHandler(async (req, res) => {
    const userAdded = await database.addUser(req.body.email, req.body.password);
    if (userAdded) {
        res.status(201).json({message: "User successfully added"});
    } else {
        res.status(400).json({message: "Error: Email already exists"});
    }
}));

/* Login API */
router.post('/login', asyncHandler(async (req, res) => {
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

/* Login Check API */
router.get('/login-status', asyncHandler(async (req, res) => {
    if (req.session.user) {
        res.status(200).json({message: "User logged in"})
    } else {
        res.status(401).json({message: "User not logged in"})
    }
}))

/* Logout API */
router.post('/logout', asyncHandler(async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: "Logout error" });
        }
        res.clearCookie('connect.sid', { path: '/'});
        res.status(200).json({message: 'Logout successful'})
    }) 
}));

/* Delete API */
router.delete('/users/myaccount', asyncHandler(async (req, res) => {
    const isDeleted = database.deleteUser(req.session.user.email);
    if (isDeleted) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ error: "Logout error" });
            }
            res.clearCookie('connect.sid', { path: '/'});
            res.status(200).json({message: 'Logout successful'})
        }) 
    } else {
        res.status(400).json({message: 'Error deleting username and password'})
    }
}));

export default router;