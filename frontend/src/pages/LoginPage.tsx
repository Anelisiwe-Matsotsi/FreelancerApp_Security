
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import type {
  LoginCredentials,
  RegisterCredentials,
} from "../models/user.ts";
import "../login.css";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, register, isAuthenticated, isLoading: isAuthLoading } = useAuth();

  // Form state
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"client" | "freelancer">("client");

  // Feedback state
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect an already logged-in user
React.useEffect(() => {
  if (!isAuthLoading && isAuthenticated) {
    navigate("/", { replace: true });
  }
}, [isAuthenticated, isAuthLoading, navigate]);

  // Handle login or registration
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      if (isLogin) {
        const credentials: LoginCredentials = {
          email,
          password,
        };

        await login(credentials);
      } else {
        const credentials: RegisterCredentials = {
          username,
          email,
          password,
          role,
        };

        await register(credentials);
      }

      navigate("/", { replace: true });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to authenticate. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Login and registration toggle */}
        <div className="login-toggle">
          <button
            type="button"
            className={isLogin ? "active" : ""}
            onClick={() => {
              setIsLogin(true);
              setError("");
            }}
          >
            Login
          </button>

          <button
            type="button"
            className={!isLogin ? "active" : ""}
            onClick={() => {
              setIsLogin(false);
              setError("");
            }}
          >
            Sign Up
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <h2>{isLogin ? "Welcome Back!" : "Create Account"}</h2>

          {/* Display authentication errors */}
          {error && <p className="login-error">{error}</p>}

          {/* Username is only needed when registering */}
          {!isLogin && (
            <div className="login-input">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                minLength={3}
                maxLength={50}
                required
              />
            </div>
          )}

          {/* Email input */}
          <div className="login-input">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          {/* Password input */}
          <div className="login-input">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={isLogin ? undefined : 8}
              required
            />
          </div>

          {/* Account role is only needed during registration */}
          {!isLogin && (
            <div className="login-input">
              <select
                value={role}
                onChange={(event) =>
                  setRole(event.target.value as "client" | "freelancer")
                }
              >
                <option value="client">I want to shop and browse for gigs</option>
                <option value="freelancer">I want to sell and manage my gigs</option>
              </select>
            </div>
          )}

          {/* Submit the form */}
          <button
            type="submit"
            className="login-submit"
            disabled={isLoading}
          >
            {isLoading
              ? "Please wait..."
              : isLogin
                ? "Login"
                : "Create Account"}
          </button>

          {isLogin && (
            <p className="login-footer">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  setError("");
                }}
              >
                Sign up
              </button>
            </p>
          )}

          {!isLogin && (
            <p className="login-footer">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  setError("");
                }}
              >
                Login
              </button>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
