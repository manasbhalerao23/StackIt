import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { LogOut, User } from "lucide-react";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      {/* Brand */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        StackIt
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-6">
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>
        <Link to="/ask" className="text-gray-700 hover:text-blue-600">
          Ask
        </Link>

        {/* Authenticated User */}
        {user ? (
          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800">{user.name}</span>
            </div>

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 hidden group-hover:block bg-white shadow-md border rounded-md w-40 z-10">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100 text-sm"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
              >
                <LogOut className="inline w-4 h-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        ) : (
          // Guest
          <div className="flex gap-3">
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link to="/signup" className="text-blue-600 font-medium">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
