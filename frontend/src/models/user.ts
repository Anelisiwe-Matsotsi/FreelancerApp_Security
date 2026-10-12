// Set the enum for what a user's role can be
export type UserRole = "client" | "freelancer" | "admin";

export interface User {
  _id: string;
  username: string;
  email: string;
  role: UserRole;
}

// When authenticating, a token becomes part of the response
export interface AuthResponse extends User {
  token: string;
}

// DTO for logging in
export interface LoginCredentials {
  email: string;
  password: string;
}

// DTO for registering
export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  role?: UserRole;
}

/*Reference List:
Kimtai Developer 2024. REACT TYPESCRIPT AUTHENTICATION GUIDE USING CONTEXT API. (Version 1.0) [Source Code]. Available at:< https://medium.com/@kimtai.developer/react-typescript-authentication-guide-using-context-api-5c82f2530eb1 > [Accessed 10 October 2026].
rudderz243. 2026. insy7314-library.(Version 1.0) [Source Code] Available at: <https://github.com/rudderz243/insy7314-library/blob/master/backend/routes/authRoutes.js> [Accessed 2 September 2026]. 
TechStack, S. 2022. React context API using TypeScript. (Version 1.0) [Source Code] . Available at: < https://dev.to/tndungu/react-context-api-using-typescript-5h40 > [Accessed 10 October 2026].
*/