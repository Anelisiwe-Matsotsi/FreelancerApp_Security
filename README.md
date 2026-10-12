# HustleHub+ System 🚀

## Overview 📋
HustleHub+ is a secure freelance marketplace that allows clients and freelancers to connect with each other. Clients can search through different services, choose what they need and book a freelancer. Freelancers can create, advertise and manage the services they offer on the platform.

The system is built using the MERN stack, which includes MongoDB, Express.js, React and Node.js (Medium, 2025). It has features such as user registration and login, JWT authentication, password hashing, input validation and role-based access control. Security is an important part of the system because HustleHub+ handles sensitive information such as user details, login credentials, bookings and financial transactions.

**Part 2 Update:** The part 1 backend has been updated into a full-stack application. A frontend built with React and TypeScript using Vite has been added and connected to the API. The application now allows freelancers to create and list their gigs, while clients can browse available services and make bookings. Each booking generates a transaction record, which is used to track the income earned by each freelancer.

## Application Features
The application provides different features depending on the user's role (client, freelancer, or admin).
### Client Features
- Register and log in to the application.
- Browse available gigs.
- Book gigs using a simulated payment process.
- View their own bookings.
- Cancel their own bookings.
- View their own transaction records.
  
### Freelancer Features
- Register and log in to the application.
- Browse available gigs.
- Create new gigs and advertise their services.
- Update or deactivate their own gigs.
- View bookings made for their gigs.
- Cancel bookings associated with their gigs.
- Confirm and complete bookings.
- View their own transaction records.
- View an income summary based on their transactions.
  
### Admin Features
- Register and log in to the application.
- Browse available gigs.
- Update or deactivate any gig on the platform.
- View all bookings.
- View all transaction records.
- Access an overview of the platform.
- Moderate gigs to help manage the marketplace.
  
## Intended Users👥
HustleHub+ is designed for three main users:
- **Clients:** People who are looking for freelance services. They browse through the available services and book a service that suits their needs.
- **Freelancers:** People who offer services through the platform. They can advertise their services, manage their bookings and interact with clients.
- **Administrators:** People who manage and maintain the platform. They have extra access that allows them to manage users and monitor the overall system.

## System Architecture 🏗️

<img width="451" height="688" alt="Image" src="https://github.com/user-attachments/assets/cde4d856-0966-4bb6-9eb7-43b8d34b805d" />
<br>
(Draw.io,2026a)
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

The backend server will run on `https://localhost:3000`

### Frontend ➡️➡️

  
## Packages to install 📦

### Backend Packages 🔙🔚
**Step 1:** Open a new terminal and navigate into the backend folder: `cd backend`<br>
**Step 2:** Install the required packages: `npm i express mongoose dotenv cors bcryptjs jsonwebtoken nodemon` <br>

### Frontend Packages ➡️➡️
**Step 1:** Open a new terminal and navigate into the frontend folder: `cd frontend`<br>
**Step 2:** Install the required packages: `npm i (installs react, react-dom and react-router-dom, plus the Vite, TypeScript and ESLint development tools listed in frontend/package.json)`<br>

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
 ### Frontend ➡️➡️
 |Package|Reason|
|:------|:-----|
| React | React is widely used because it makes it easier for developers to build interactive applications with multiple features and functionality (GeeksforGeeks, 2025a). |
| React Router DOM  | Manages navigation between different pages. It builds on react-router and provides components and hooks that help developers handle routing within web applications (Boda, 2025).|
| Vite | Its design allows it to adapt as web technologies develop, giving developers a flexible foundation that can be used to build and maintain applications over time (VITE, 2026). |
| TypeScript | TypeScript improves a project by providing type checking, helping developers identify errors early, and making the code easier to maintain and expand. It is a useful tool for developing reliable React applications that can grow and adapt to future changes (GeeksforGeeks, 2025b). |
| ESLint | ESLint helps improve code quality by identifying errors early and encouraging good coding practices. It makes code easier to read, maintain, and understand, especially when working in a team. By automatically checking code, it reduces debugging time and allows developers to focus on building features. ESLint can also be used with Prettier to maintain consistent formatting and coding standards (Lucas, 2025). |

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

<img width="190" height="331" alt="image" src="https://github.com/user-attachments/assets/0fb76198-b1ea-4836-aa0c-e836db53fdee" />




 The routes folder contains the API endpoints and decides which controller should handle a particular request. For example authRoutes.js contains the registration and login routes. Express Router allows related routes to be grouped into seperate modules and then connected to the main application using app.use() (MDN,2026).

The controllers contain the application logic for processing requests. For example, authController.js contains the registration and login logic. Seperating the controllers from routes means that the route is responsible for directing the request while the controller is responsible for managing what should happen to the request. This keeps the routing logic and request-processing logic organised (MDN,2026).

The models define the structure of the information stired in the MongoDB. The userModel.js file for example defines the username, email, password and role fiels. Mongoose schemas provide  structure and validation rules for documents stored in MongoDB (Alamin,2026).

The middleware folder contains functions that run during the request and response process. The authMiddleware.js for example checks if a user has provided a valid JWT before allowing access to protected routes. Middleware can also be used for authentication, authorization and validation before the request reaches the controller (Alamin,2026)

The app.js file acts as the main application file. It loads Express, middleware and routes, connects the application to MongoDB and starts the HTTPS server.

For part 2 the following was added to the backend: <br>

**Models:** gigModel.js (title, description, category, price, delivery days, owner and active flag), bookingModel.js (gig, client, freelancer, price and status) and transactionModel.js (reference, booking, gig, client, freelancer, amount, currency and status). <br>

**Controllers and routes:** gigController.js, bookingController.js and transactionController.js with their matching route files, mapped in app.js under /api/gig, /api/booking and /api/transaction.<br>

**Middleware:** securityMiddleware.js (Helmet, CORS, NoSQL sanitisation and rate limiting), plus a request logger (loggerMiddleware.js and utils/logger.js) that writes to the logs folder.


## Security Decisions 🔏
For HustleHubs authentication and user management functionality the following security decisions were implemented: </br>
- Password hashing
- Token-based authentication
- Input validation
- Role based access control
- HTTPS
- Rate Limiting

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
  
The certificate files are being used for the project's local develepment enviroment. A self-signed certificate can be useful when developing and testing HTTPS locally, although it is not automatically trusted by web browsers in the same way as a certificate issued by a recognises certificate authority (W3Schools,2026).</br>

## Rate-Limiting
Rate limiting is a security technique that restricts the number of requests a user can make to a system within a specific period. We chose rate limiting for HustleHub+ to reduce the risk of brute-force attacks, excessive requests and denial-of-service (DoS) attacks, which could affect the availability and performance of the application. Our implementation uses a general limit of 150 requests per 15 minutes and a stricter limit of 10 requests per 15 minutes for authentication routes, helping protect login and registration endpoints from repeated attempts while allowing normal users to access the system (GeeksforGeeks, 2026b).
<img width="1548" height="919" alt="WhatsApp Image 2026-10-12 at 21 39 49" src="https://github.com/user-attachments/assets/2e2f8ca4-b36a-4026-8c0b-6ae72e239c18" />


## API Endpoints 🎯

### Auth Routes (`/api/auth`) 🔑
- `POST /api/auth/register`: Register a new user with username, email and password. The roles include freelancer, client and admin. This method returns the user's details and JWT token.
- `POST /api/auth/login`: Authenticates registered users that want to login by providing their email and password. This returns the users details and JWT token.

### Gig Routes (`/api/gig`) 🖌️
- `GET /api/gig`: List all active gigs.
- `GET /api/gig/mine`: List the logged-in freelancer's own gigs (freelancer only).
- `GET /api/gig/:id`: Get one gig.
- `POST /api/gig`: Create a gig with title, description, category, price and deliveryDays (freelancer only).
- `PUT /api/gig/:id`: Update a gig (freelancer or admin).
- `DELETE /api/gig/:id`: Deactivate a gig (freelancer or admin).

 ### Booking Routes(`/api/booking`) 📆
- `POST /api/booking`: Book a gig with "gigId"(client only). Creates the booking and its transaction record.
- `GET /api/booking`: List the caller's bookings, optionally filtered with ?status=pending|confirmed|completed|cancelled.
- `GET /api/booking/:id`: Get one booking (client or freelancer on that booking).
- `PATCH /api/booking/:id`: Change the status with "status". Clients may only set cancelled, freelancers may set confirmed, completed or cancelled.
- `DELETE /api/booking/:id`: Delete a booking (the booking's own client, not once completed).
  
### Transaction Routes (`/api/transaction`) 💰
- `GET /api/transaction`: List the caller's transactions (admins receive all of them).
- `GET /api/transaction/:id`: Get one transaction (involved users or admin).
- `GET /api/transaction/income`: Income summary for the logged-in freelancer: totalIncome, totalTransactions and a per-gig breakdown, in ZAR (freelancer only).

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

<img width="1600" height="946" alt="image" src="https://github.com/user-attachments/assets/2620f9a9-b132-44ef-83e6-6e81d2af11a3" />



#### Login Freelancer Request
<img width="1108" height="705" alt="Image" src="https://github.com/user-attachments/assets/e594880c-5090-4920-9a2c-64dc8e91c728" /><br>
Tests shows how successfully log in is handled by the system. <br><br>

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/3cebebcf-8384-4d94-aef2-ec2b8e26be3b" /><br>
Freelancer enters the wrong password thus the system does not allow them to enter. <br><br>

<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/239979c8-c625-40d9-ac7e-989ffc5b8f2d" /><br>
Test proves that the user needs to provide all details to successfully log in the freelancer. <br><br>

<img width="1600" height="980" alt="image" src="https://github.com/user-attachments/assets/a81f8b82-c2c0-4726-8fcf-b525e230f02f" />


## Create A Gig Request
<img width="1600" height="1148" alt="image" src="https://github.com/user-attachments/assets/a3e45313-c64c-4c0a-bd37-75c8cba14e62" />
Tests show how succesfully creating a gig is handled. <br><br>

<img width="1600" height="998" alt="image" src="https://github.com/user-attachments/assets/adfc3c00-e588-4525-bfde-3cd73427cb48" />
Freelancer does not enter a number of delivery days or writes a number 0 and below, creating a gig fails. <br><br>

<img width="1600" height="1008" alt="image" src="https://github.com/user-attachments/assets/45149e5a-1c7a-4c2d-87cb-f2d35caaca88" />
Freelancer does not enter a number for the price input or enters a number less than 1, creating a gig fails. <br><br>

## All gigs Request
<img width="1600" height="994" alt="image" src="https://github.com/user-attachments/assets/c42496ae-b7b8-4fb8-90f6-aefd98096207" />
This shows the get request for all clients gigs <br> <br>

<img width="1600" height="1092" alt="image" src="https://github.com/user-attachments/assets/7f28c25b-e590-4f59-9399-aaea1f83c5ed" />
This shows the get request for all freelancer gigs <br> <br>

<img width="1347" height="958" alt="image" src="https://github.com/user-attachments/assets/b3ae0d67-c689-4fe0-8e0c-ffe65befa3d3" />
This shows the get request for all gigs admins see <br> <br>

## Get gig By ID Request
<img width="1546" height="1179" alt="image" src="https://github.com/user-attachments/assets/33b85269-cb61-4661-b117-c906c6891f47" />

## Update Gig Request
<img width="1600" height="1156" alt="image" src="https://github.com/user-attachments/assets/fd741f60-da89-4dd9-9f64-e2d586bf2651" />
Shows freelancer can update gigs <br> <br>

<img width="1215" height="1179" alt="image" src="https://github.com/user-attachments/assets/429be2f6-400e-4c21-aef0-96abd418efb5" />
Shows client cannot update gigs <br> <br>



## Newman Tests
<img width="1142" height="387" alt="image" src="https://github.com/user-attachments/assets/0c1d2832-80f1-4085-a8f4-588a9cb84739" />








## Application Screenshots 🖼️

### Authentication
<img width="1555" height="723" alt="Image" src="https://github.com/user-attachments/assets/5cd857d1-a659-4383-a8d1-96b91d7073ad" /><br>
The login page. Users enter their email and password. The signup tab goes to registration.<br><br>

<img width="1551" height="831" alt="Image" src="https://github.com/user-attachments/assets/1d5fd19b-eb5d-4ebd-a725-3d3281780231" /><br>Registration page. The user chooses whether they want to shop and browse for gigs (client) or sell and manage their gigs (freelancer). The password is hidden while typing.<br><br>

### Freelancer: creating and managing gigs
<img width="1546" height="909" alt="Image" src="https://github.com/user-attachments/assets/6bbe3a69-e42c-42ae-adcc-6e088a7602cb" /><br> A freelancer creates a gig by entering a title, description, category, price and delivery days. <br><br>
<img width="1563" height="913" alt="Image" src="https://github.com/user-attachments/assets/9d2c06f0-5b47-46fa-86af-c42fb39da24f" /><br> The freelancer's "My gigs" page after a gig is created. It shows the freelancer's own gigs only, with Edit and Deactivate actions and live/total gig counts. <br><br>

### Client: browsing and booking gigs
<img width="1528" height="903" alt="Image" src="https://github.com/user-attachments/assets/8543ee29-f72f-4a0b-8da3-99d711a16736" /><br> The client home page, showing how many gigs are currently available. <br><br>
<img width="1549" height="924" alt="Image" src="https://github.com/user-attachments/assets/3b34bd9a-5dc2-48b7-9317-5fb1f1d18d0b" /><br> Clients browse the active gigs. <br><br>
<img width="1543" height="907" alt="Image" src="https://github.com/user-attachments/assets/96595d0c-a14b-40ac-b70b-b290ab316720" /><br> A gig shows its description, price, delivery time and freelancer, with a button to book it. <br><br>
<img width="1564" height="916" alt="Image" src="https://github.com/user-attachments/assets/9f0c7f6f-3bdc-4348-a0ab-a2c08f0c4deb" /><br> The booking confirmation. The booking summary shows the freelancer, category, delivery time and total. Payment is simulated, so confirming the booking creates the booking and its transaction record. <br><br>

### Bookings
<img width="1530" height="915" alt="Image" src="https://github.com/user-attachments/assets/9bb7a71d-db97-49fc-b1af-6f58e10e27d5" /><br> The client's "My bookings" page lists only the bookings they made, can be filtered by status, and lets the client cancel a booking. <br><br>
<img width="1564" height="901" alt="Image" src="https://github.com/user-attachments/assets/506ab1c3-15ee-4290-be2e-13616a9c42f6" /><br> The freelancer sees the bookings made on their own gigs, and can mark them complete or decline them. <br><br>

### Transactions and income
<img width="1552" height="910" alt="Image" src="https://github.com/user-attachments/assets/b5a7c065-420d-44c9-b10b-de5f434b5d6c" /><br> Every booking creates a transaction record with a unique reference, the gig, the freelancer, the amount and a status. The client sees the total spent and the number of transactions. <br><br>
<img width="1531" height="864" alt="Image" src="https://github.com/user-attachments/assets/23eca24f-2ef8-446a-812d-1a9c16726896" /><br> Another client's transactions page. Each client only sees their own transactions. <br><br>
<img width="1560" height="898" alt="Image" src="https://github.com/user-attachments/assets/85d842e2-c305-45ab-bea9-142e3d052ec3" /><br> The freelancer's income page shows total income, the number of transactions and income per gig, calculated from the freelancer's own completed transactions. <br><br>

### Admin
<img width="1525" height="924" alt="Image" src="https://github.com/user-attachments/assets/7f0ebb52-77c3-4429-8faa-c9bdb476a2d2" /><br> The admin overview shows active gigs, bookings, transactions and total volume, with a Deactivate button for moderating gigs. <br><br>
<img width="1552" height="903" alt="Image" src="https://github.com/user-attachments/assets/e139fa5a-22a6-43e8-9936-58e90f7d296b" /><br> The admin can also see recent bookings from all users and their statuses. <br><br>

## YouTube Video Link

**Part 1 demonstration:** https://youtu.be/cdZXZ4eMTco
**Part 2 demonstration:** https://youtu.be/DjksF9ZcifM

## Request Flow
We have made request flow diagram through draw.io that explain the how the registration and login works. Here is the draw.io link: <br> https://advtechonline-my.sharepoint.com/:u:/g/personal/st10450661_myemeris_edu_za/IQBOT_ttlNjxRZcm__xfRiPzASp9BhzVXXjbveV-9cxir8k?e=0teh5K <br>
The link can only be opended by My group members and Mr Glynn Rudman- I entered your AdvTech emails to authorize access to those emails. The link directs you to a window that says you should download the filevto view it. Click the blue download button to view it successfully. 
<br>

### Registration Request Flow
<img width="334" height="461" alt="Image" src="https://github.com/user-attachments/assets/7debcc96-6475-462f-b654-043c43a9d843" /> 
<br>
The above diagram explains how the registration logic flows with details on how the system handles user error and data handling for successfull registration.<br>

### Login Request Flow
<img width="339" height="458" alt="Image" src="https://github.com/user-attachments/assets/4d4d1a45-bfe2-43d9-8a01-b517cc8f4e6c" />
<br>
The above diagram explains how the login logic flows with details on how the system handles user error and data handling for successfull login.<br>

## References 📖
Alamin, 2026. Building a Scalable E-Commerce Backend: The Complete Guide to Node.js, Express & MongoDB. [online] Available at: <https://medium.com/@md.alamin.coding/building-a-scalable-e-commerce-backend-the-complete-guide-to-node-js-express-mongodb-7134e9da049b>[Accessed 6 September 2026].<br>
Aravind, 2024. How to use env file in backend db. [online] Available at: < https://medium.com/engineeringcreativity/how-to-use-env-file-in-backend-db-e20d5480986f > [Accessed 29 August 2026] <br>
Boda, P. 2025. React Router vs. React Router DOM: Key Differences Explained. [online]. Available at:<https://dev.to/pramod_boda/what-is-the-difference-between-react-router-and-react-router-dom-2da6> [Accessed 10 October 2026]. <br>
Devinda, 2026. Password Hashing Explained: How to Secure Passwords with bcrypt in Node.js. [online] Available at: < https://medium.com/@rusirud49/password-hashing-explained-how-to-secure-passwords-with-bcrypt-in-node-js-7ac49d2c41d9 > [Accessed 5 September 2026] <br>
Draw.io, 2026a. System Architecture. [online] Available at:<https://drive.google.com/file/d/1LSyYCuEcQzpAkHAzH4uZHbpoJ3T8QGhv/view?usp=sharing> [Accessed 6 September 2026]. <br>
Draw.io, 2026b. Security-first diagramming for teams. [online] Available at: < https://www.drawio.com/ > [Accessed 5 September 2026] <br>
GeeksforGeeks, 2024. Use of CORS in Node.js. [online] Available at: < https://www.geeksforgeeks.org/node-js/use-of-cors-in-node-js/ > [Accessed 29 August 2026] <br>
GeeksforGeeks. 2025. Why Choose React For Web Development in 2025a. [online]. Available at:<https://www.geeksforgeeks.org/blogs/why-choose-react-for-web-development/> [Accessed 10 October 2026]. <br>
GeeksforGeeks. 2025b. 10 Compelling Reasons to Use TypeScript with React in 2025: A Developer's Guide. [onlibe]. Available at:<https://www.geeksforgeeks.org/typescript/compelling-reasons-to-use-typescript-with-react-a-developers-guide/> [Accessed 10 October 2026].<br>
Lucas, J. 2025. Why Use ESLint in Your Project? [online]. Available at:<https://dev.to/jean_lucas/why-use-eslint-in-your-project-3p83> [Accessed 10 October 2026].<br>
GeeksforGeeks, 2026b. Rate Limiting in System Design. Available at: < https://www.geeksforgeeks.org/system-design/rate-limiting-in-system-design/ > [Accessed 12 October 2026].
MDN, 2026. Express Tutorial Part 4: Routes and controllers. [online] Available at: < https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/routes> [Accessed 5 September 2026]. <br>
Medium. 2025. MERN Stack Architecture. [online] Available at: < https://medium.com/readers-club/mern-stack-architecture-6b7b5be94f78 > [Accessed 6 September 2026] <br> 
Postman, 2026.How to create a REST API with Node.js and Express. [online].Available at: <https://blog.postman.com/how-to-create-a-rest-api-with-node-js-and-express/ >  [Accessed 6 September 2026] <br> 
Raj, 2026. Where to store JWT Secret Keys Safely (Do's and Dont's). [online] Available at: < https://jwtsecretkeygenerator.com/blog/where-to-store-jwt-secret-keys > [Accessed 29 August 2026] <br>
Rangani, T., 2026. Why do we use npm install --save-dev nodemon in Node.js?. [online] Available at: < https://medium.com/@uyanhewagetr/why-do-we-use-npm-install-save-dev-nodemon-in-node-js-c0a1480df03f > [Accessed 29 August 2026] <br>
Tamang, R., 2025. How to implement Role-Based Access Control (RBAC) in Node.js Applications. [online] Available at: < https://dev.to/rabindratamang/how-to-implement-role-based-access-control-rbac-in-nodejs-applications-1ed2 > [Accessed 29 August 2026] <br>
Thavachelvan, S., 2026. Implementing JWT-Based Authentication Using Node.js and MongoDB. [online] Available at: < https://medium.com/@saruatwork/implementing-jwt-based-authentication-using-node-js-and-mongodb-2d6994e8811d > [Accessed 6 September 2026]. <br>
VITE. 2026. Why Vite. [online]. Available at:<https://vite.dev/guide/why> [Accessed 10 October 2026].<br>
W3Schools, 2026. Node.js HTTPS Module (Version 1.0) [Source Code] Available at: < https://www.w3schools.com/nodejs/nodejs_https.asp > [Accessed 29 August 2026]
