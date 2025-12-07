import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="w-full shadow-lg" style={{ backgroundColor: "#393E46" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                style={{ backgroundColor: "#DFD0B8" }}
              >
                🐾
              </div>
              <span
                className="text-xl font-bold hidden sm:block"
                style={{ color: "#DFD0B8" }}
              >
                PetCure
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links - Center */}
          <div className="hidden md:flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">


            {isAuthenticated && (
              <>
                <Link
                  to="/"
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-white hover:bg-opacity-10"
                  style={{ color: "#DFD0B8" }}
                >
                  Home
                </Link>
                <Link
                  to="/deboard"
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-white hover:bg-opacity-10"
                  style={{ color: "#DFD0B8" }}
                >
                  Deboard
                </Link>
                <Link
                  to="/history"
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-white hover:bg-opacity-10"
                  style={{ color: "#DFD0B8" }}
                >
                  Pet Master
                </Link>
                <Link
                  to="/inventoryList"
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-white hover:bg-opacity-10"
                  style={{ color: "#DFD0B8" }}
                >
                  Inventory
                </Link>
                <Link
                  to="/saleshistory"
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-white hover:bg-opacity-10"
                  style={{ color: "#DFD0B8" }}
                >
                  Sales
                </Link>
                <Link
                  to="/reminders"
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-white hover:bg-opacity-10"
                  style={{ color: "#DFD0B8" }}
                >
                  Reminders
                </Link>
              </>
            )}
          </div>

          {/* Profile/Auth Section - Right */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="p-2 rounded-full transition-all duration-200 hover:bg-white hover:bg-opacity-10"
                  style={{ backgroundColor: "#948979" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    style={{ color: "white" }}
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="currentColor"
                      d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"
                    />
                  </svg>
                </button>
                {open && (
                  <div
                    className="absolute z-50 right-0 mt-2 w-48 rounded-lg shadow-lg border"
                    style={{
                      backgroundColor: "white",
                      borderColor: "#948979"
                    }}
                    onClick={() => setOpen(!open)}
                  >
                    <button
                      onClick={() => navigate("/dashboard")}
                      className="flex items-center w-full px-4 py-3 text-left transition-colors duration-200 rounded-t-lg"
                      style={{ color: "#222831" }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#DFD0B8";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "transparent";
                      }}
                    >
                      <LayoutDashboard className="w-4 h-4 mr-3" />
                      Dashboard
                    </button>
                    <hr style={{ borderColor: "#DFD0B8" }} />
                    <button
                      className="flex items-center w-full px-4 py-3 text-left transition-colors duration-200 rounded-b-lg"
                      style={{ color: "#222831" }}
                      onClick={handleLogout}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#DFD0B8";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "transparent";
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/"
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-white hover:bg-opacity-10"
                  style={{ color: "#DFD0B8" }}
                >
                  Home
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-white hover:bg-opacity-10"
                  style={{ color: "#DFD0B8" }}
                >
                  Sign up
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg font-medium text-white transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: "#222831" }}
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg transition-all duration-200 hover:bg-white hover:bg-opacity-10"
              style={{ color: "#DFD0B8" }}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden border-t"
          style={{
            backgroundColor: "#222831",
            borderColor: "#948979"
          }}
          onClick={toggleMenu}
        >
          {isAuthenticated ? (
            <div className="px-4 py-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                style={{ color: "#DFD0B8" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#393E46";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                Home
              </Link>
              <Link
                to="/deboard"
                className="block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                style={{ color: "#DFD0B8" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#393E46";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                Deboard
              </Link>
              <Link
                to="/history"
                className="block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                style={{ color: "#DFD0B8" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#393E46";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                Pet Master
              </Link>
              <Link
                to="/inventoryList"
                className="block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                style={{ color: "#DFD0B8" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#393E46";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                Inventory
              </Link>
              <Link
                to="/saleshistory"
                className="block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                style={{ color: "#DFD0B8" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#393E46";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                Sales
              </Link>
              <Link
                to="/reminders"
                className="block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                style={{ color: "#DFD0B8" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#393E46";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                Reminders
              </Link>
              <Link
                to="/dashboard"
                className="block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                style={{ color: "#DFD0B8" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#393E46";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                Dashboard
              </Link>
              <button
                className="flex items-center w-full px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                style={{ color: "#DFD0B8" }}
                onClick={handleLogout}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#393E46";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </button>
            </div>
          ) : (
            <div className="px-4 py-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                style={{ color: "#DFD0B8" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#393E46";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                Home
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                style={{ color: "#DFD0B8" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#393E46";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                style={{ color: "#DFD0B8" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#393E46";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;