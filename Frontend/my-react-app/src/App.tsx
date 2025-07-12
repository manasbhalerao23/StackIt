import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { Navbar } from "./components/Navbar/Navbar";
import { HomePage } from "./pages/Homepage";
import { AskPage } from "./pages/AskQuestion";
import { QuestionPage } from "./pages/QuestionPage";
import { LoginPage } from "./components/Auth/Login";
import { SignupPage } from "./components/Auth/Signup";
import { ProfilePage } from "./components/user/Profile";
import { AdminPage } from "./components/admin/AdminPage";

import type { JSX } from "react";
import { NotFoundPage } from "./pages/NotFound";
import { useSelector } from "react-redux";
import type { RootState } from "./store";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  return user?.role === "admin" ? children : <Navigate to="/" />;
};

function App () {
  return (
    <Router>
      <Navbar />
      <div className="mt-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ask" element={<AskPage />} />
          <Route path="/question/:id" element={<QuestionPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
