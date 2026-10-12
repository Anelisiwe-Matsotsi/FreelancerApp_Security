import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/useAuth";
import { CustomCursor } from "./components/CustomCursor";
import { NavBar } from "./components/NavBar";
import { ProtectedRoute, homePathFor } from "./context/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { GigsPage } from "./pages/GigsPage";
import { MyBookingsPage } from "./pages/MyBookingsPage";
import { TransactionsPage } from "./pages/TransactionsPage";
import { FreelancerPage } from "./pages/FreelancerPage";
import { AdminPage } from "./pages/AdminPage";

// "/" sends each side (client, freelancer, admin) to its own home page
const HomeRedirect: React.FC = () => {
  const { user } = useAuth();
  return <Navigate to={user ? homePathFor(user.role) : "/login"} replace />;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* your CSS hides the real mouse cursor, so this draws the teal one */}
        <CustomCursor />
        {/* the navbar hides itself until someone is logged in */}
        <NavBar />
        <Routes>
          <Route path='/login' element={<LoginPage />} />

          {/* everything below needs a login */}
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<HomeRedirect />} />
            <Route path='/gigs' element={<GigsPage />} />
            <Route path='/bookings' element={<MyBookingsPage />} />
            <Route path='/transactions' element={<TransactionsPage />} />

            {/* freelancer side */}
            <Route element={<ProtectedRoute allow={["freelancer"]} />}>
              <Route path='/freelancer' element={<FreelancerPage />} />
            </Route>

            {/* admin side */}
            <Route element={<ProtectedRoute allow={["admin"]} />}>
              <Route path='/admin' element={<AdminPage />} />
            </Route>
          </Route>

          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
export default App;