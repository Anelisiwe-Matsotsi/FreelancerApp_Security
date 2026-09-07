# HustleHub+ System 🚀

## Overview 📋
HustleHub+ is a secure freelance marketplace that allows clients and freelancers to connect with each other. Clients can search through different services, choose what they need and book a freelancer. Freelancers can create, advertise and manage the services they offer on the platform.

The system is built using the MERN stack, which includes MongoDB, Express.js, React and Node.js (Medium, 2025). It has features such as user registration and login, JWT authentication, password hashing, input validation and role-based access control. Security is an important part of the system because HustleHub+ handles sensitive information such as user details, login credentials, bookings and financial transactions.

## Intended Users👥
HustleHub+ is designed for three main users:
- **Clients:** People who are looking for freelance services. They browse through the available services and book a service that suits their needs.
- **Freelancers:** People who offer services through the platform. They can advertise their services, manage their bookings and interact with clients.
- **Administrators:** People who manage and maintain the platform. They have extra access that allows them to manage users and monitor the overall system.

## System Architecture 🏗️
<img width="451" height="688" alt="Image" src="https://github.com/user-attachments/assets/cde4d856-0966-4bb6-9eb7-43b8d34b805d" />
<br>
<br>
The architecture shows how the different parts of the system communicate with each other. Clients, Freelancers and Administrators interact with the React frontend, which communicates securely with the Node.js and Express.js backend using HTTPS.The backend processes requests using routes, controllers, middleware and Mongoose models. It then communicates with MongoDB to store and retrieve information.The system boundary represents the components that are part of the HustleHub+ application, while the Client, Freelancer and Administrator are external users who interact with the system.
  
## How to run the App 💻
### Backend 🔙🔚
To run the backend application, follow the following steps:  

**Step 1:** In the 'backend' folder, create a new file called `.env`<br>
**Step 2:** Add your environment variables to `.env`:<br>
`CONN_STRING=your_mongodb_connection_string`<br>
`JWT_SECRET=your_jwt_secret_key`<br>
**Step 3:** Open a new terminal and navigate into the backend folder: `cd backend`<br>
**Step 4:** Install the required packages: `npm i`<br>
**Step 5:** Start the backend development server: `npm run dev` 

The backend server will run on `http://localhost:3000`

### Frontend 🚪
To successfully run the frontend application, perform the following steps:  

**Step 1:** Open a new terminal and navigate into the frontend folder: `cd frontend`<br>
**Step 2:** Install the required packages: `npm i`<br>
**Step 3:** Start the frontend development server: `npm run dev`

The frontend application server will run on `http://localhost:5173`

  
## Packages to install 📦

### Backend Packages 🔙🔚
**Step 1:** Open a new terminal and navigate into the backend folder: `cd backend`<br>
**Step 2:** Install the required packages: `npm i express mongoose dotenv cors bcryptjs jsonwebtoken nodemon` <br>

### Frontend Setup and Packages 🚪
**Step 1:** Create and setup the Vite React TypeScript frontend. Open a new terminal and type the following:<br> `npx create-vite@latest frontend --template react-ts`<br>
**Step 2:** Navigate into the frontend folder: `cd frontend`<br>
**Step 3:** Install the required packages: `npm i react-router-dom`<br>

## Reasoning for Required Packages 📦

### Backend 🔙🔚
|Package|Reason|
|:------|:-----|
| Express | Used for handling HTTP requests for the API routes and backend web server (Tamang, 2025) |
| Cors | Restricts malicious websites fromaccess sensitive data on our backend server and safe resource sharing between frontend and backend (GeeksforGeeks, 2024) |
| Nodeman | Tool that monitors our files and restarts our server automatically when it detects changes (Rangani, 2026) |
| Mongoose | System uses a MongoDB database to store data and defines models (Tamang, 2025) |
| JsonWebToken | Ensures secure user authentication and authorization by generating each user an unique token (Tamang, 2025) |
| DotEnv | Manages the environment variables stored in the `.env` file (Tamang, 2025) |
| BcryptJS | Asissts with hashing passwords before they get stored in the database (Tamang, 2025) |

### Frontend 🚪
|Package|Reason|
|:------|:-----|
|React | JavaScript UI framework for single page applications with dynamic updates (Dissanayake, 2026) |
|React-DOM | Package offers DOM-specific methods to interact with the Document Object Model (DOM) for effective management of web page elements (GeeksforGeeks, 2025) |
|React-Router-Dom | Library that mitigates the gap between developers defining routes, linking components to URLs and seamless user experience (Dissanayake, 2026) |
|Vite | Best tool for fast bundling and cleaner imports (Edmonds, 2025) |
|TypeScript | Offers type safety and syntax support for code uniformity (Edmonds, 2025) |

## Environment Variables 🔐
The backend need a `.env` file created in the backend folder with the following keys added:  
- `CONN_STRING`: MongoDB database connection string is stored here (Aravind, 2024)
- `JWT_SECRET`: The secret key variable is stored to sign and verify authentication tokens (Raj, 2026)

The `.env` must be added to the `.gitignore` file so that the secret keys are not publicly exposed (Raj, 2026)

## Backend Structure 🔙

HustleHub is developed using the MERN stack, which consits of MongoDB, Express.js, React and Node.js.</br>
The  backend uses: </br>
-Node.js: the runtime enviroment </br>
-Express.js:Used to create the API and handle HTTP requests. Express.js provides functionality for creating routes that respond to HTTP methods such as GET, POST, PUT, PATCH and DELETE (Postman, 2026).

The backend has been seperated into different folders to keep the application organised and to seperate different responsibilities. This approach makes the code easier to understand and maintain because routes, controllers, models and middleware have different purposes, especially when structuring a REST API (Postman, 2026).
The backend structure is: <br>
 (Medium,2026)

<img width="181" height="238" alt="image" src="https://github.com/user-attachments/assets/c093c40a-6bcb-4034-9fca-c3c7b46c876a" />


 The routes folder contains the API endpoints and decides which controller should handle a particular request. For example authRoutes.js contains the registration and login routes. Express Router allows related routes to be grouped into seperate modules and then connected to the main application using app.use() (MDN,2026).

The controllers contain the application logic for processing requests. For example, authController.js contains the registration and login logic. Seperating the controllers from routes means that the route is responsible for directing the request while the controller is responsible for managing what should happen to the request. This keeps the routing logic and request-processing logic organised (MDN,2026).

The models define the structure of the information stired in the MongoDB. The userModel.js file for example defines the username, email, password and role fiels. Mongoose schemas provide  structure and validation rules for documents stored in MongoDB (Alamin,2026).

The middleware folder contains functions that run during the request and response process. The authMiddleware.js for example checks if a user has provided a valid JWT before allowing access to protected routes. Middleware can also be used for authentication, authorization and validation before the request reaches the controller (Alamin,2026)

The app.js file acts as the main application file. It loads Express, middleware and routes, connects the application to MongoDB and starts the HTTPS server.

## Security Decisions 🔏
For HustleHubs authentication and user management functionality the following security decisions were implemented: </br>
- Password hashing
- Token-based authentication
- Input validation
- Role based access control
- HTTPS

## Password Hashing 🔐
HustleHub does not store the users passwords as plain text. We used token- based authentication but simple hashing is not enough, hackers can use brute-force to gain unauthorized access. Instead the bcrypt.js package is used to hash passwords before they are stored as secure hashes in MongoDB that can be safely compared during authentication (Devinda,2026.</br>
Password hashing turn a plaintext password into a fixed length scrambled string, a hashed value (Devinda,2026). This means that the original password will not be recoverable from the stored hash. Bycrypt has been particularly designed for password security and uses salting and adjustable computational cost to make cracking passwords more difficult (Devinda, 2026).</br>

In the userModel.js, a Mongoose pre("save") function is used to hash the password before a user is saved:
- Retrieve the hashed password from the database using the users email. 
- Salt extraction and comparison are handled internally by brypt making verification simple and safe. According to Devinda (2026) "A randomly generated value added to the password before hashing". To make sure that even matching passwords produce different hashes every password recieves its own unique salt (Devinda, 2026).

Plain-text password ⇾ bycrypt.genSalt(10) ⇾ bcrypt.hash()⇾ Hashed password ⇾ Stored in MongoDB.

The password is only hashed when it has been modified. This prevents an already hashed password from being hashed again when other user information is changed.
During login, the password given by the user is compared to the stored password hash using btcrypt.compare(). Bycrypt does this comparison without the need of the original plaintext password to be stored in the database (Devinda,2026).</br>
This security decision decreases the risk of exposing HustleHubs users original passwords if an unauthirised person were to gain access to the database. 

## Token-Based Authentication 🎟️
HustleHub uses JSON Web Tokens (JWT) for token-based authentication. JWTs allow the backend to create a signed token after successfful authentication (Thavachelvan, 2026). The token can then be used by the client when making requests to protected API endpoints.

JSON Web Token is a package that can generate and verify JWTs for authentication (Postman,2026). In HustleHub a token is generated afer the user has successfully registered or loged in. The token has the user's ID and role and is signed using the JWT_SECRET stored in the .env file. When a user tries to access an endpoint that is protected, the authMiddleware.js middleware checks the Authorization header for a Bearer token. The token is extracted and verified using jwt.verify(token,process.env.JWT_SECRET). If the token is valid, the middleware retreives the user from MongoDB and stores the user information in req.user. 

The password is not included in the retrieved user information. If the token is missing, invalid or cannot be verified, the request is rejected with a 401 Unauthorized response. The validateRole() middleware compares the user's role with the roles that are allowed for the route. If the user is authenticated but does not have the required role, the system returns a 403 Forbidden response (Thavachelvan, 2026).  Thavachelvan (2026) uses a similar authentication process that is summarised as: </br>
User logs in ⇾ Email and password are checked ⇾ Password compared using bycrpt⇾ Credentials valid? ⇾ JWT generated ⇾  Client sends JWT with protected request ⇾ authMiddleware verifies JWT ⇾ User is identified ⇾ Request is allowed to proceed </br>

This security decision allows protected endpoints to identify the user making a request and checks what the authenticated user is allowed to do before providing access to resricted functionality.

## Role-Based Authentication 👥🔑
Authentication and authorisation are seperately handled in HustleHub. Authentication sees whether the user is a valid user in the HustleHub database, while autherisation sees to what the specific user is allowed to see and do on the system dependeding on their role. 

The validateRole() middleware checks the authenticated user's role against the roles permitted to access a route.The system currently supports the roles client, freelancer and admin. For example, a route can use validateAuth </br> validateRole("freelancer") </br> The first veriefirs that the user is authenticated, while the second checks whether the authenticated user has the required role.  </br> This means that successfully logging in does not automatically give user access to every endpoint. Access is instead restricted according to the user's role.

## Input Validation 🔣

HustleHub validates the information received from the users before processing it. During registeration, the backend checks that the username, email and password fields required have been provided. It also checks if an email address already exists before creating a new account, if it does the system returns a 400 "Please ensure all required information is present" response </br>

The user model provides additional validation rules that include required fields, username length restrictions and an allowed list of user roles. Mongoose-based validation helps ensure that invalid data does not get stored in the database (Alamin,2026). </br>

Validating incoming request data against defined rules is important because information received from a client should not be trusted automatically (Postman,2026). </br>

During login, the backend checks that both the email and password have been provided. Incorrect login credentials lead to a 401 Invalid email or password response. This avoids informing an attacker whether the email address entered exists or whether only the password was incorrect. 


## HTTPS 🔐
HustleHub uses HTTPS (Hypertext Transfer Protocol Secure) to protect information sent between a user and a backend server. This is an important security feature because the application will handle information such as usernames, passwords and authentication tokens.</br> At the moment, HTTPS is configured in app.js using Node.js's built in https module and the project's certificate files. The fs module is used to read the certificates files from the server's file system. These files are then placed into the sslOptions object: </br>

<img width="689" height="80" alt="image" src="https://github.com/user-attachments/assets/7c24589a-26a9-4bdd-bc4e-ef87cfa23280" /> </br>

The application then uses these settings when starting the server: </br>

 <img width="672" height="64" alt="image" src="https://github.com/user-attachments/assets/f2844b44-777a-4000-a99b-54d089a096ba" />
 
  </br>
  This means that HustleHubs backend is currently accessed through: </br>
  
  https://localhost:3000</br>
  
HTTPS is important because normal HTTP does not provide the same protection for information travelling between the client and server. HTTPS uses TLS/SSL to help encrypt this communication, authenticate the server and protect the information from being changed while it is being transferred. This is important for HustleHub because authentication information needs to be protected while users interact with the system (W3Schools,2026). </br>
  
The certificate files are being used for the project's local develepment enviroment. A self-signed certificate can be useful when developing and testing HTTPS locally, although it is not automatically trusted by web browsers in the same way as a certificate issued by a recognises certificate authority (W3Schools,2026).
  

## API Endpoints 🎯

### Auth Routes (`/api/auth`) 🔑
- `POST /api/auth/register`: Register a new user with username, email and password. The roles include freelancer, client and admin. This method returns the user's details and JWT token.
- `POST /api/auth/login`: Authenticates registered users that want to login by providing their email and password. This returns the users details and JWT token.

## Testing with Postman 📫
The `postman-collection` file has been included in the root folder that includes the tested authentication endpoints. Tests included successful registration and login requests and appropriate handling of invalid user input. Below are screenshots of the tests done in postman.

#### Register Client Request
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/c3948ebb-f4a0-4ed2-89c1-735b197d36bf" /> <br>
This test displays the error handling that happens when a user tries to regsiter with an email address that already exists in the database. User cannot regsiter if a duplicate email address was already registered with it. <br><br>

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/cf7341d9-3606-4e12-a835-a36d8d70d6fa" /> <br>
The error message displays when the user clicks the register button without providing a password. All fields need to be filles in for successfull registration. <br><br>

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/fb28e656-5367-4552-ac96-c965c9bc120b" /> <br>
A client is successfully registered when they provide their email address, password, username and role. The default role is client.<br><br>


#### Register Admin Request
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/17523ac5-4911-46d9-be4e-249b6e92006c" /><br>
When a user (admin) tries to register with an existing email address. <br><br>

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/9f658ad7-73f6-4390-ae98-3de05f22503a" /><br>
Error handling for when the user tries to register without providing an email address. <br><br>

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/34713292-748b-47c8-aefc-a56f3cda8a44" /> <br>
Status Code 200 for a successfully created admin. All successfull registered users get a unique generated token assigned to their account. <br><br>


#### Register Freelancer Request
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/d1bd8e19-63b1-43ae-bab1-5b3b957f1116" /> <br>
A successfully regsitered freelancer provides all the required details.<br><br>

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/d718aa4f-4d55-4117-a6ab-89e248cd4d80" /> <br>
If a freelancer tries to register with an existing email address the system informs them.<br><br>

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/f87ab8e4-9402-4e46-ba98-6f2ec2105159" /> <br>
Freelancer forgets to fill in their email then the system informs them that all details need to be provided to successfully register. <br><br>


#### Login Client Request
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/acc9aaf7-05fe-4839-8345-c90e431ce0b4" /> <br>
Client logs in successfully by providing a registered email and password.<br><br>

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/bc2457db-c801-45fb-81a8-8a5d709a6495" /><br>
Error message displays if client forget to enter their password.<br><br>

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/f5262eb0-9db3-4b66-9563-cb25b4b49887" /><br>
Clients that enter the wrong credentials are told that one of the two are wrong. The above example has the wrong password. Security is enhanced by not telling the user which one is wrong.<br><br>

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/fe4bbcd1-336d-4418-abae-a45c470efbf7" /><br>
Error message displays when a client provides the wrong credentials.<br><br>


#### Login Admin Request
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/6a1638ef-fe59-43bf-873c-bec85b0803e8" /><br>
Admin is successfully logged in. The system returns their role and token tied to their account. <br><br>

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/b244e0f4-28a3-4b34-bc77-72b52eace06d" /><br>
Admin forgot to provide their email address during logging in. <br><br>

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/e4f130f5-fd7f-4a0a-b4a6-480e03c43b63" /><br>
Testing what what happens when an admin provides the incorrect password. <br><br>

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/1ada0540-0eea-4cef-be8f-a601d51144fc" /> <br>
Testing what what happens when an admin provides the incorrect email address. <br><br>


#### Login Freelancer Request
<img width="1108" height="705" alt="Image" src="https://github.com/user-attachments/assets/e594880c-5090-4920-9a2c-64dc8e91c728" /><br>
Tests shows how successfully log in is handled by the system. <br><br>

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/3cebebcf-8384-4d94-aef2-ec2b8e26be3b" /><br>
Freelancer enters the wrong password thus the system does not allow them to enter. <br><br>

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/239979c8-c625-40d9-ac7e-989ffc5b8f2d" /><br>
Test proves that the user needs to provide all details to successfully log in the freelancer. <br><br>


## Request Flow
We have made request flow diagram through draw.io that explain the how the registration and login works. Here is the draw.io link: <br> https://advtechonline-my.sharepoint.com/:u:/g/personal/st10450661_myemeris_edu_za/IQBOT_ttlNjxRZcm__xfRiPzASp9BhzVXXjbveV-9cxir8k?e=0teh5K <br>
The link can only be opended by My group members and Mr Glynn Rudman- I entered your AdvTech emails to authorize access to those emails. The link directs you to a window that says you should download the filevto view it. Click the blue download button to view it successfully. 
<br>

### Registration Request Flow
<img width="334" height="461" alt="Image" src="https://github.com/user-attachments/assets/7debcc96-6475-462f-b654-043c43a9d843" /> 
<br>

### Login Request Flow
<img width="339" height="458" alt="Image" src="https://github.com/user-attachments/assets/4d4d1a45-bfe2-43d9-8a01-b517cc8f4e6c" />
<br>

## References 📖
Alamin, 2026. Building a Scalable E-Commerce Backend: The Complete Guide to Node.js, Express & MongoDB. [online] Available at: <https://medium.com/@md.alamin.coding/building-a-scalable-e-commerce-backend-the-complete-guide-to-node-js-express-mongodb-7134e9da049b>[Accessed 6 September 2026].<br>
Aravind, 2024. How to use env file in backend db. [online] Available at: < https://medium.com/engineeringcreativity/how-to-use-env-file-in-backend-db-e20d5480986f > [Accessed 29 August 2026] <br>
Devinda, 2026. Password Hashing Explained: How to Secure Passwords with bcrypt in Node.js. [online] Available at: < https://medium.com/@rusirud49/password-hashing-explained-how-to-secure-passwords-with-bcrypt-in-node-js-7ac49d2c41d9 > [Accessed 5 September 2026] <br>
Dissanayake, 2026. React Router vs. React Router DOM: understanding the differences. [online] Available at: < https://www.syncfusion.com/blogs/post/react-router-vs-react-router-dom > [Accessed 29 August 2026] <br>
Draw.io, 2026. Security-first diagramming for teams. [online] Available at: < https://www.drawio.com/ > [Accessed 5 September 2026] <br>
Edmonds, T., 2025. Best Practices for React.js with Vite and TypeScript: What I use and why. [online] Available at: < https://medium.com/@taedmonds/best-practices-for-react-js-with-vite-and-typescript-what-i-use-and-why-f4482558ed89 > [Accessed 29 August 2026] <br>
GeeksforGeeks, 2025. React JS ReactDOM. [online] Available at: < https://www.geeksforgeeks.org/reactjs/reactjs-reactdom/ > [Accessed 29 August 2026] <br>
GeeksforGeeks, 2024. Use of CORS in Node.js. [online] Available at: < https://www.geeksforgeeks.org/node-js/use-of-cors-in-node-js/ > [Accessed 29 August 2026] <br>
MDN, 2026. Express Tutorial Part 4: Routes and controllers. [online] Available at: < https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/routes> [Accessed 5 September 2026]. <br>
Medium. 2025. MERN Stack Architecture. [online] Available at: < https://medium.com/readers-club/mern-stack-architecture-6b7b5be94f78 > [Accessed 6 September 2026] <br> 
Postman, 2026.How to create a REST API with Node.js and Express. [online].Available at: <https://blog.postman.com/how-to-create-a-rest-api-with-node-js-and-express/ >  [Accessed 6 September 2026] <br> 
Raj, 2026. Where to store JWT Secret Keys Safely (Do's and Dont's). [online] Available at: < https://jwtsecretkeygenerator.com/blog/where-to-store-jwt-secret-keys > [Accessed 29 August 2026] <br>
Rangani, T., 2026. Why do we use npm install --save-dev nodemon in Node.js?. [online] Available at: < https://medium.com/@uyanhewagetr/why-do-we-use-npm-install-save-dev-nodemon-in-node-js-c0a1480df03f > [Accessed 29 August 2026] <br>
Tamang, R., 2025. How to implement Role-Based Access Control (RBAC) in Node.js Applications. [online] Available at: < https://dev.to/rabindratamang/how-to-implement-role-based-access-control-rbac-in-nodejs-applications-1ed2 > [Accessed 29 August 2026] <br>
Thavachelvan, S., 2026. Implementing JWT-Based Authentication Using Node.js and MongoDB. [online] Available at: < https://medium.com/@saruatwork/implementing-jwt-based-authentication-using-node-js-and-mongodb-2d6994e8811d > [Accessed 6 September 2026]. <br>
W3Schools, 2026. Node.js HTTPS Module (Version 1.0) [Source Code] Available at: < https://www.w3schools.com/nodejs/nodejs_https.asp > [Accessed 29 August 2026]
