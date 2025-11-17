/**
 * Developers: Brice Jenkins, Alexandra Meyers, Meredith Baker
 * Copyright 2025
 * 
 * Description: A React component that can be used to wrap any page with a
 * designated URL in App.jsx. Pages wrapped with this component can only be
 * accessed by an authenticated user.
 */

import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function RouteAuthenticator ({component}) {
    const [loggedIn, setLoggedIn] = useState(null);

    // Checks login status and changes state variable accordingly.
    useEffect(() => {
        const checkLogIn = async() => {
            const response = await fetch("http://localhost:3001/auth/login-status", {
                method: 'GET',  
                credentials: "include"
            });
            if (response.status === 200) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        }
        checkLogIn();
    }, []);

    // Returns wrapped page if user is authenticated.
    if(loggedIn === true) {
        return <>{component}</>;
    }

    // If not authenticated, the user is rerouted to the login page.
    if(loggedIn === false) {
        return <Navigate to="/login"/>;
    }
}

export default RouteAuthenticator;