/**
 * Developers: Brice Jenkins, Alexandra Meyers, Meredith Baker
 * Copyright 2025
 * 
 * Description: Establishes local server to host authorization service.
 * Applies session middleware globally to ensure stateful login and confirms
 * requests are coming from front end URL.  
 */

import 'dotenv/config';
import express from 'express';
import routes from './controller.mjs';
import session from "express-session";
import cors from 'cors';

const PORT = process.env.PORT;
const service = express();

service.use(express.json());
 
service.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    }
}));

service.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

service.use("/auth", routes);

// PORT can be specified in .env file.
service.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}...`);
});
