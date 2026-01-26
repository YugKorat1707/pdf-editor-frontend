import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, FileText, User, LogOut } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("userName");
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-black">
          ALLINONEPDF
        </Link>

        {/* CENTER LINKS */}
        <div className="hidden md:flex items-center space-x-6 text-xs font-bold uppercase text-gray-600">
          <Link to="/" className="hover:text-red-500">Home</Link>
          <Link to="/merge" className="hover:text-red-500">Merge PDF</Link>
          <Link to="/split" className="hover:text-red-500">Split PDF</Link>

          <Link to="/privacy-policy" className="flex items-center gap-1 hover:text-red-500">
            <Shield size={14} /> Privacy Policy
          </Link>

          <Link to="/terms" className="flex items-center gap-1 hover:text-red-500">
            <FileText size={14} /> Terms
          </Link>

          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* AUTH BUTTONS */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-black text-gray-800 flex items-center gap-1">
                <User size={16} className="text-red-500" /> {user}
              </span>
              <button onClick={handleLogout} className="text-gray-400 hover:text-red-500">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-bold hover:text-red-500">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-red-500 text-white px-5 py-2 rounded-md font-black text-sm hover:bg-red-600 shadow-md"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
