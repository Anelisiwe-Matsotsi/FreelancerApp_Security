import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type {
User,
LoginCredentials,
RegisterCredentials,
} from "../models/user.ts";
import {
loginUser,
registerUser,
getCurrentUser,
getAuthToken,
setAuthToken,
removeAuthToken,
} from "../services/api.ts";

interface AuthProviderProps {
children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
const [token, setToken] = useState<string | null>(getAuthToken());
const [user, setUser] = useState<User | null>(null);
const [isLoading, setIsLoading] = useState<boolean>(
() => Boolean(getAuthToken()),
);

// Restore the user when the app loads
useEffect(() => {
const restoreUser = async () => {
const savedToken = getAuthToken();

  if (!savedToken) {
    setIsLoading(false);
    return;
  }

  try {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  } catch {
    removeAuthToken();
    setToken(null);
    setUser(null);
  } finally {
    setIsLoading(false);
  }
};

void restoreUser();

}, []);

// Log in an existing user
const login = async (credentials: LoginCredentials): Promise<void> => {
const response = await loginUser(credentials);

setAuthToken(response.token);
setToken(response.token);

setUser({
  _id: response._id,
  username: response.username,
  email: response.email,
  role: response.role,
});

};

// Register a new user
const register = async (credentials: RegisterCredentials): Promise<void> => {
const response = await registerUser(credentials);

setAuthToken(response.token);
setToken(response.token);

setUser({
  _id: response._id,
  username: response.username,
  email: response.email,
  role: response.role,
});

};

// Log out the user
const logout = (): void => {
removeAuthToken();
setToken(null);
setUser(null);
};

return (
<AuthContext.Provider
value={{
user,
token,
isAuthenticated: Boolean(token) && user !== null,
isLoading,
login,
register,
logout,
}}
>
{children}
</AuthContext.Provider>
);
}
/*Reference List:
Kimtai Developer 2024. REACT TYPESCRIPT AUTHENTICATION GUIDE USING CONTEXT API. (Version 1.0) [Source Code]. Available at:< https://medium.com/@kimtai.developer/react-typescript-authentication-guide-using-context-api-5c82f2530eb1 > [Accessed 10 October 2026].
rudderz243. 2026. insy7314-library.(Version 1.0) [Source Code] Available at: <https://github.com/rudderz243/insy7314-library/blob/master/backend/routes/authRoutes.js> [Accessed 2 September 2026]. 
TechStack, S. 2022. React context API using TypeScript. (Version 1.0) [Source Code] . Available at: < https://dev.to/tndungu/react-context-api-using-typescript-5h40 > [Accessed 10 October 2026].
*/