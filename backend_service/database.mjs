/**
 * Developers: Brice Jenkins, Alexandra Meyers, Meredith Baker
 * Copyright 2025
 * 
 * Description: Creates an local server-based database to hold email and
 * password information as key-value pairs. Includes model-layer functions
 * for simple database-related tasks such as: checking if the database has
 * a email recorded, adding a email-password key-value pair to the database,
 * or validating an email/password combo with stored credentials.
 */

import bcrypt from "bcrypt";

// Object used to store user emails and passwords as key-value pairs.
let users = {};

/**
 * Checks if an email is stored as a key in users.
 * @param {string} email A user's email address.
 * @returns true if the email address exists in users; false otherwise.
 */
const hasUser = (email) => {
    return email in users;
}

/**
 * Adds a user as an email-password key-value pair. Password is stored
 * as a hashed value.
 * @param {string} email A user's email address.
 * @param {string} password A user's password (plain text).
 * @returns true if the key-value pair was successfully added; false
 * otherwise.
 */
const addUser = async(email, password) => {
    if (!hasUser(email)) {
        // Password is stored as a hashed value.
        users[email] = await bcrypt.hash(password, 10);
        return true;
    } else {
        return false;
    }
}

/**
 * Takes an email and password as parameters. Checks if email exists in
 * users. If so, a hashed version of plain text password is compared to
 * the saved hashed password. Returns true if user email exists and
 * passwords match; false otherwise.
 * @param {string} email A user's email address.
 * @param {string} password A user's password (plain text).
 * @returns true if user email exists and passwords match; false otherwise.
 */
const validateUser = async(email, password) => {
    if (hasUser(email)) {
        const savedPW = users[email];
        // bcrypt.compare extracts salt from savedPW, rehashes password, and compares. 
        const isValid = await bcrypt.compare(password, savedPW);
        return isValid
    } else {
        return false;
    }
}

/**
 * Deletes a specified email (and its corresponding password) from the
 * users object.
 * @param {string} email A unique user email.
 * @returns true if the user's email/password was deleted; false othewise.
 */
const deleteUser = async(email) => {
    if (hasUser(email)) {
        delete users[email];
        return true;
    } else {
        return false;
    }
}


export { addUser, validateUser, deleteUser };