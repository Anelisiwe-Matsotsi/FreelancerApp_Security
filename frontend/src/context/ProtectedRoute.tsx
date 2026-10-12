import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import type { User } from "../models/user.ts";

// your user model has no named role type, so take it from the user
type UserRole = User["role"];

// the first page each side lands on after logging in
export function homePathFor(role: UserRole): string {
  if (role === "freelancer") return "/freelancer";
  if (role === "admin") return "/admin";
  return "/gigs";
}

interface ProtectedRouteProps {
  // leave empty to allow any logged-in user
  allow?: UserRole[];
}

// wraps routes that need a login (and optionally a specific role)
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allow }) => {
  const { user, isLoading } = useAuth();

  // still checking for a saved login, so don't redirect yet
  if (isLoading) return null;

  // not logged in: go to the login page
  if (!user) return <Navigate to='/login' replace />;

  // logged in but the wrong side: send them to their own home page
  if (allow && !allow.includes(user.role)) {
    return <Navigate to={homePathFor(user.role)} replace />;
  }

  return <Outlet />;
};