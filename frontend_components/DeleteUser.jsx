/**
 * Developers: Brice Jenkins, Alexandra Meyers, Meredith Baker
 * Copyright 2025
 * 
 * Description: A React component that returns a simple link to
 * delete a user's email/password. Includes handler function that
 * is called when the link is pressed to delete the user's email/
 * password from the authorization database and log out the user.
 */

import { useNavigate, Link } from 'react-router-dom';


function DeleteUser({ setLoggedIn }) {
    const navigate = useNavigate();

    const handleDelete = async() => {
        const response = await fetch(
            "http://localhost:3001/auth/users/myaccount", {
                method: 'DELETE',
                credentials: 'include'
            }
        )
        if(response.status === 200) {
            setLoggedIn(false);
            alert("Account successfully deleted");
            navigate('/login');
        } else {
            alert("Error deleting account");
        }
    }

    return (
        <Link to='#' onClick={handleDelete}>Delete Account</Link>
    );
}


export default DeleteUser;