import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { BookPage } from "./pages/BookPage";
import { HealthCheckPage } from "./pages/HealthCheckPage";
import { LoginPage } from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthProvider";
import { ProtectedRoute } from "./context/ProtectedRoute";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />

        <main className="app-container">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/health" element={<HealthCheckPage />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<BookPage />} />
            </Route>

            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;