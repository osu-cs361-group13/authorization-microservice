/**
 * Developers: Brice Jenkins, Alexandra Meyers, Meredith Baker
 * Copyright 2025
 * 
 * Description: A React component that returns a simple link to
 * initiate logout procedures. Includes handler function that
 * is called when link is pressed. Handler function calls the
 * /logout endpoint in the authorization microservice. 
 */

import { useNavigate, Link } from 'react-router-dom';

function Logout({ setLoggedIn }) {
    const navigate = useNavigate();

    // Calls /logout endpoint in authorization microservice.
    const handleLogout = async() => {
        const response = await fetch(
            "http://localhost:3001/auth/logout", {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-type': 'application/json'}
            }
        )
        if(response.status === 200) {
            setLoggedIn(false);
            alert("Logout successful");
            navigate('/login');
        } else {
            alert("Logout error");
        }
    }

    return (
        <Link to='#' onClick={handleLogout}>Logout</Link>
    );
}

export default Logout;