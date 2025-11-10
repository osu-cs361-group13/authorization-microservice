/**
 * Developers: Brice Jenkins, Alexandra Meyers, Meredith Baker
 * Copyright 2025
 * 
 * Description: A React component that returns a simple login form
 * including input fields for email and password. Includes handler
 * function that is called when form information is submitted.
 * Handler function calls the /login endpoint in the
 * authorization microservice. 
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Calls /login endpoint in authorization microservice.
    const handleLogin = async(e) => {
        e.preventDefault();
        const credentials = {email, password};
        const response = await fetch(
            "http://localhost:3001/auth/login", {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(credentials)
            }
        )
        if(response.status === 200) {
            setLoggedIn(true);
            alert("Login successful!");
            navigate('/');
        } else {
            alert("Email or password incorrect");
        }
    }

    return (
        <div className="login-block">
            <form className="login-form">
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
                            type="password" 
                            placeholder="Enter your password"
                            required
                            onChange={f => setPassword(f.target.value)}>
                        </input>
                    </div>
                </div>
                <button type="submit" onClick={handleLogin}>Submit</button>
            </form>
        </div>
    );
}

export default Login;