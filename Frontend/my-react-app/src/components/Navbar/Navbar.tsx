import { Link, useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { logout } from "../../features/auth/authSlice";
import { useState, useRef, useEffect } from "react";

export const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setShowDropdown((prev) => !prev)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800">{user.name}</span>
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white shadow-md border rounded-md w-40 z-10">
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
            )}
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
