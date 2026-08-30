# HustleHub+ System 🚀

## How to run the App 💻
### Backend 🔙🔚
To run the backend application, follow the following steps:  

**Step 1:** In the 'backend' folder, craete a new file called `.env`<br>
**Step 2:** Add your environment variables to '.env':<br>
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
**Step 1:** Open a new terminal and navigate into the backend folder: 'cd backend'<br>
**Step 2:** Install the required packages: 'npm i express mongoose dotenv cors bcryptjs jsonwebtoken nodemon' <br>

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
|React-DOM | Package offers DOM-specific methods to interact with the Document Object Model (DOM) for effectie management of web page elements (GeeksforGeeks, 2025) |
|React-Router-Dom | Library that mitigates the gap between developers defining routes, linking components to URLs and seamless user experience (Dissanayake, 2026) |
|Vite | Best tool for fast bundling and cleaner imports (Edmonds, 2025) |
|TypeScript | Offers type safety and syntax support for code uniformity (Edmonds, 2025) |

## Environment Variables 🔐
The backend need a `.env` file created in the backend folder with the following keys added:  
- `CONN_STRING`: MongoDB database connection string is stored here (Aravind, 2024)
- `JWT_SECRET`: The secret key variable is stored to sign and verify authentication tokens (Raj, 2026)

The `.env` must be added to the `.gitignore` file so that the secret keys are not publicly exposed (Raj, 2026)

## API Endpoints 🎯

### Auth Routes (`/api/auth`) 🔑
- `POST /api/auth/register`: Register a new user with username, email and password. The roles include freelancer, client and admin. This method returns the user's details and JWT token.
- `POST /api/auth/login`: Authenticates registered users that want to login by providing their email and password. This returns the users details and JWT token.

## Testing with Postman 📫
The `postman-collection` file has been included in the root folder that includes the tested authentication endpoints. Tests included successful registration and login requests and appropriate hanling of invalid user input.


## References 📖
Aravind, 2024. How to use env file in backend db. [online] Available at: < https://medium.com/engineeringcreativity/how-to-use-env-file-in-backend-db-e20d5480986f > [Accessed 29 August 2026] <br>
Dissanayake, 2026. React Router vs. React Router DOM: understanding the differences. [online] Available at: < https://www.syncfusion.com/blogs/post/react-router-vs-react-router-dom > [Accessed 29 August 2026] <br>
Edmonds, T., 2025. Best Practices for React.js with Vite and TypeScript: What I use and why. [online] Available at: < https://medium.com/@taedmonds/best-practices-for-react-js-with-vite-and-typescript-what-i-use-and-why-f4482558ed89 > [Accessed 29 August 2026] <br>
GeeksforGeeks, 2025. React JS ReactDOM. [online] Available at: < https://www.geeksforgeeks.org/reactjs/reactjs-reactdom/ > [Accessed 29 August 2026] <br>
GeeksforGeeks, 2024. Use of CORS in Node.js. [online] Available at: < https://www.geeksforgeeks.org/node-js/use-of-cors-in-node-js/ > [Accessed 29 August 2026] <br>
Raj, 2026. Where to store JWT Secret Keys Safely (Do's and Dont's). [online] Available at: < https://jwtsecretkeygenerator.com/blog/where-to-store-jwt-secret-keys > [Accessed 29 August 2026] <br>
Rangani, T., 2026. Why do we use npm install --save-dev nodemon in Node.js?. [online] Available at: < https://medium.com/@uyanhewagetr/why-do-we-use-npm-install-save-dev-nodemon-in-node-js-c0a1480df03f > [Accessed 29 August 2026] <br>
Tamang, R., 2025. How to implement Role-Based Access Control (RBAC) in Node.js Applications. [online] Available at: < https://dev.to/rabindratamang/how-to-implement-role-based-access-control-rbac-in-nodejs-applications-1ed2 > [Accessed 29 August 2026] <br>
