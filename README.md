# HustleHub+ System 🚀
  
## How to run the App 💻
### Backend 🔙🔚
To run the backend application, follow the following steps:  

**Step 1:** In the 'backend' folder, craete a new file called `.env`<br>
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

## API Endpoints 🎯

### Auth Routes (`/api/auth`) 🔑
- `POST /api/auth/register`: Register a new user with username, email and password. The roles include freelancer, client and admin. This method returns the user's details and JWT token.
- `POST /api/auth/login`: Authenticates registered users that want to login by providing their email and password. This returns the users details and JWT token.

## Testing with Postman 📫
The `postman-collection` file has been included in the root folder that includes the tested authentication endpoints. Tests included successful registration and login requests and appropriate handling of invalid user input. Below are screenshots of the tests done in postman.

#### Register Client Request
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/c3948ebb-f4a0-4ed2-89c1-735b197d36bf" />
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/cf7341d9-3606-4e12-a835-a36d8d70d6fa" />
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/fb28e656-5367-4552-ac96-c965c9bc120b" />


#### Register Admin Request
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/17523ac5-4911-46d9-be4e-249b6e92006c" />
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/9f658ad7-73f6-4390-ae98-3de05f22503a" />
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/34713292-748b-47c8-aefc-a56f3cda8a44" />


#### Register Freelancer Request
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/d1bd8e19-63b1-43ae-bab1-5b3b957f1116" />
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/d718aa4f-4d55-4117-a6ab-89e248cd4d80" />
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/f87ab8e4-9402-4e46-ba98-6f2ec2105159" />


#### Login Client Request
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/acc9aaf7-05fe-4839-8345-c90e431ce0b4" />
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/bc2457db-c801-45fb-81a8-8a5d709a6495" />
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/f5262eb0-9db3-4b66-9563-cb25b4b49887" />
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/fe4bbcd1-336d-4418-abae-a45c470efbf7" />


#### Login Admin Request
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/6a1638ef-fe59-43bf-873c-bec85b0803e8" />
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/b244e0f4-28a3-4b34-bc77-72b52eace06d" />
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/e4f130f5-fd7f-4a0a-b4a6-480e03c43b63" />
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/1ada0540-0eea-4cef-be8f-a601d51144fc" />

#### Login Freelancer Request
<img width="1108" height="705" alt="Image" src="https://github.com/user-attachments/assets/e594880c-5090-4920-9a2c-64dc8e91c728" />
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/095aefa6-3cd5-4ac3-a8f5-d0584899d45a" />
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/3cebebcf-8384-4d94-aef2-ec2b8e26be3b" />
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/239979c8-c625-40d9-ac7e-989ffc5b8f2d" />


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
Aravind, 2024. How to use env file in backend db. [online] Available at: < https://medium.com/engineeringcreativity/how-to-use-env-file-in-backend-db-e20d5480986f > [Accessed 29 August 2026] <br>
Dissanayake, 2026. React Router vs. React Router DOM: understanding the differences. [online] Available at: < https://www.syncfusion.com/blogs/post/react-router-vs-react-router-dom > [Accessed 29 August 2026] <br>
Draw.io, 2026. Security-first diagramming for teams. [online] Available at: < https://www.drawio.com/ > [Accessed 5 September 2026] <br>
Edmonds, T., 2025. Best Practices for React.js with Vite and TypeScript: What I use and why. [online] Available at: < https://medium.com/@taedmonds/best-practices-for-react-js-with-vite-and-typescript-what-i-use-and-why-f4482558ed89 > [Accessed 29 August 2026] <br>
GeeksforGeeks, 2025. React JS ReactDOM. [online] Available at: < https://www.geeksforgeeks.org/reactjs/reactjs-reactdom/ > [Accessed 29 August 2026] <br>
GeeksforGeeks, 2024. Use of CORS in Node.js. [online] Available at: < https://www.geeksforgeeks.org/node-js/use-of-cors-in-node-js/ > [Accessed 29 August 2026] <br>
Raj, 2026. Where to store JWT Secret Keys Safely (Do's and Dont's). [online] Available at: < https://jwtsecretkeygenerator.com/blog/where-to-store-jwt-secret-keys > [Accessed 29 August 2026] <br>
Rangani, T., 2026. Why do we use npm install --save-dev nodemon in Node.js?. [online] Available at: < https://medium.com/@uyanhewagetr/why-do-we-use-npm-install-save-dev-nodemon-in-node-js-c0a1480df03f > [Accessed 29 August 2026] <br>
Tamang, R., 2025. How to implement Role-Based Access Control (RBAC) in Node.js Applications. [online] Available at: < https://dev.to/rabindratamang/how-to-implement-role-based-access-control-rbac-in-nodejs-applications-1ed2 > [Accessed 29 August 2026] <br>
