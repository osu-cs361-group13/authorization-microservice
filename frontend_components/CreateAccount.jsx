/**
 * Developers: Brice Jenkins, Alexandra Meyers, Meredith Baker
 * Copyright 2025
 * 
 * Description: A React component that returns a simple Create Account
 * form, including input fields for first name, last name, email, and
 * password. Includes handler function that is called when form information
 * is submitted. Handler function calls the /register endpoint in the
 * authorization microservice. 
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateAccount() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Calls /register endpoint in authorization microservice.
    const handleRegister = async(e) => {
        e.preventDefault();
        const newUser = {email, password};
        const response = await fetch(
            "http://localhost:3001/auth/register", {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newUser)
            }
        )
        if(response.status === 201) {
            alert("User account successfully added");
            navigate('/login');
        } else {
            alert("Email already exists");
        }
    }

    return (
        <div className="login-block">
            <form className="login-form">
                <div className="login-input-block">
                    <div><label className="login-label">First Name</label></div>
                    <div>
                        <input 
                            className="login-input"
                            placeholder="Enter your first name"
                            required>
                        </input>
                    </div>
                </div>
                <div className="login-input-block">
                    <div><label className="login-label">Last Name</label></div>
                    <div>
                        <input 
                            className="login-input"
                            placeholder="Enter your last name"
                            required>
                        </input>
                    </div>
                </div>
                <div className="login-input-block">
                    <div><label className="login-label">Email</label></div>
                    <div>
                        <input 
                            className="login-input"
                            placeholder="Enter your email"
                            required
                            onChange={f => setEmail(f.target.value)}>
                        </input>
                    </div>
                </div>
                <div className="login-input-block">
                    <div><label className="login-label">Password</label></div>
                    <div>
                        <input
                            className="login-input"
                            placeholder="Enter your password"
                            type="password" 
                            required
                            onChange={f => setPassword(f.target.value)}>
                        </input>
                    </div>
                </div>
                <button type="submit" onClick={handleRegister}>Register</button>
            </form>
        </div>
    );
}

export default CreateAccount;