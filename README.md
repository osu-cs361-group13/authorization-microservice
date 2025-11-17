# Authorization Microservice
Responsible for creating email and password combinations with unique email addresses, authenticating user logins, creating a persistent login through use of a server-side session and cookies, and handling logout.

## Getting Started
All backend service files are saved in the "backend_service" folder. To run the service on your local machine, download the files and run "npm install" in the terminal window to download necessary dependencies. Once the dependencies are installed, you can run the service by running "npm run start". By default, the service will listen on port 3001; however, this value can be changed in the .env file to resolve port conflicts if necessary.

The "frontend_components" folder contains five sample React components that can be used in React frontend pages for registering an account, login, logout, deleting an account, and protecting pages that require authentication. The CreateAccount.jsx and Login.jsx files contain html forms for entering in user data, including email and password information; The Logout.jsx and DeleteUser.jsx files simply contains a "Logout" link and "Delete Account" link respectively; the RouteAuthenticator returns the page component passed in as a parameter if the user is authenticated or navigates to "/login" if not. All files contain the necessary API calls to interact with the Authorization service given the html elements provided. If desired, the components can be downloaded and modified to interact with both the User service and the Authorization service. NOTE: Forms and other html elements will need to be styled.

How this service is used will depend on developer needs:
- If a "loggedIn" state variable is defined at the App.jsx level (with a call to the GET /login-status endpoint to change its value), that variable or its state setting function can be passed down to pages where the above components are included. Several of the above components can take this optional state variable (or its state setting function) and change it to affect client side operations (such as changing a button's navigation based on authentication). This might be necessary if an app does not need authentication for general access but allows the user to access certain features.
- Otherwise, you can simply protect each page component with the RouteAuthenticator component to enforce general app access.

The Authorization microservice ensures persistent login via the creation of server-side sessions and generation of cookies. Therefore, in the event the app reloads or you leave the page, login status will be retained.

Final note: The database is a simple Object used to retain key-value pairs. In the event the service shuts down or restarts, its value will be reset.

## Communication Contract
The service has individual APIs to register a user, log a user in, check a user's login status, log out a user, and delete a user. Instructions on how to request and receive data using each endpoint is below:

### How to Request and Receive Data
#### Registering a New User:
To register a new user email and password, the POST /register endpoint must be called (the full URL to the endpoint is "http://localhost:3001/auth/register"). The backend database ONLY stores email addresses and passwords as key-value pairs. Therefore, a call made to register a user should only include this information. An example of a call is below. If included in a handler function, it can be applied to the onClick property of a button to handle submission (see CreateAccount.jsx). The response received is either a 201 status, indicating the email/password was successfully added, or a 400 error code which indicates the email entered already exists.

const newUser = {email, password};
const response = await fetch(
    "http://localhost:3001/auth/register", {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(newUser)
    }
)

#### Login:
To Login a user, a call must be made to the POST /login endpoint (the full URL is "http://localhost:3001/auth/login"). An example of a call is below. If included in a handler function, it can be applied to the onClick property of a button to handle submission (see Login.jsx). The response received is either a 200 status, indicating the login was validated, or a 400 error code which indicates the email or password was incorrect. On the server side, a user-specific session will be created and a cookie will be created and sent back to the user. The "credentials: 'include'" property is necessary to ensure the credentials are sent.

const credentials = {email, password};
const response = await fetch(
    "http://localhost:3001/auth/login", {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(credentials)
    }
)

#### Login Status:
To check the login status of a user, a call must be made to the GET /login-status endpoint (the full URL is "http://localhost:3001/auth/login-status"). Email/password information are not needed to check login status as login state is maintained server-side and validated by the cookie that is generated upon login. Therefore, the "credentials: 'include'" property is necessary to ensure the credentials are sent with the API call. The server will check to see if a session has been created for that specific user, and a 200 status code will be sent back if logged in, or a 401 status code will be sent back if not logged in.

const response = await fetch("http://localhost:3001/auth/login-status", {
    method: 'GET',  
    credentials: "include"
});

#### Logout:
To logout, a call must be made to the POST /logout endpoint (the full URL is "http://localhost:3001/auth/logout"). Like the Login Status endpoint, email/password information is not sent. The credentials: 'include' property tells the call to include the cookie credentials. On the server side, the session is destroyed and the cookie is deleted. A 500 status is returned if there is an error destroying the session. Otherwise, a 200 status returned indicating successful logout.

const response = await fetch(
    "http://localhost:3001/auth/logout", {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-type': 'application/json'}
    }
)

#### Delete User:
To delete a user, a call must be made to the DELETE /users/myaccount endpoint (the full URL is "http://localhost:3001/auth/users/myaccount"). No username or password information is sent. The cookie credentials are sent back to the server (credentials: 'include' must be included in the call) where that user is deleted from the database and subsequently signed out according to the same procedures above. A 200 status is returned  if the account is successfully deleted and the user is signed out; a 500 status is returned if there is an error deleting the session; or a 400 status error is returned if there is an error deleting the username and password.

const response = await fetch(
    "http://localhost:3001/auth/users/myaccount", {
        method: 'DELETE',
        credentials: 'include'
    }
)

### UML Diagram
