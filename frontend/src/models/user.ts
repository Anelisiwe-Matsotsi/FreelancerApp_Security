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