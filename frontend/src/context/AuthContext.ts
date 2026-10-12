//rudderz243,2026
import { createContext, useContext } from "react";
import type {
  User,
  LoginCredentials,
  RegisterCredentials,
} from "../models/user.ts";

export interface AuthContextType {
  // variables
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  // methods
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
/*Reference List:
rudderz243. 2026. api.ts.(Version 1.0) [Source Code] Available at: <https://github.com/rudderz243/insy7314-library/blob/master/backend/routes/authRoutes.js> [Accessed 2 September 2026]. 
TechStack, S. (2022). React context API using TypeScript. (Version 1.0) [Source Code] DEV Community. Available at: < https://dev.to/tndungu/react-context-api-using-typescript-5h40 > [Accessed 12 Oct. 2026].
*/