import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  User,
  LayoutDashboard,
  CalendarDays,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Phone,
} from "lucide-react";

const API_URL = "http://localhost:4000/api/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] =
    useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const res = await axios.get(
        `${API_URL}/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data.user || res.data);
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  const firstName =
    user?.name?.split(" ")[0] || "";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                ID
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  <span className="text-slate-900">
                    Interior
                  </span>
                  <span className="text-amber-600">
                    Design
                  </span>
                </h1>

                <p className="text-xs text-slate-500">
                  Dream Interior Solutions
                </p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              <Link
                to="/"
                className="font-medium text-slate-700 hover:text-amber-600 transition"
              >
                Home
              </Link>

              <Link
                to="/services"
                className="font-medium text-slate-700 hover:text-amber-600 transition"
              >
                Services
              </Link>

              <Link
                to="#"
                className="font-medium text-slate-700 hover:text-amber-600 transition"
              >
                About Us
              </Link>

              <Link
                to="#"
                className="font-medium text-slate-700 hover:text-amber-600 transition"
              >
                Contact
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-4 px-4 py-2">
              

              {!loading &&
                (user ? (
                  <div
                    className="relative"
                    onMouseEnter={() =>
                      setDropdownOpen(
                        true
                      )
                    }
                    onMouseLeave={() =>
                      setDropdownOpen(
                        false
                      )
                    }
                  >
                    <button className="flex items-center gap-3 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white flex items-center justify-center font-semibold">
                        {firstName
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>

                      <span className="font-medium">
                        {firstName}
                      </span>

                      <ChevronDown
                        size={18}
                      />
                    </button>

                    {dropdownOpen && (
                      <div className="absolute right-0 mt-1 w-72 px-2 bg-white border border-slate-200 rounded-md shadow-2xl overflow-hidden">
                        <div className="py-2 border-b">
                          <h4 className="font-semibold text-slate-900 text-lg">
                            {user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)}
                          </h4>
                        </div>

                        <Link
                          to="#"
                          className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50"
                        >
                          <LayoutDashboard size={18} />
                          Dashboard
                        </Link>

                        <Link
                          to="#"
                          className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50"
                        >
                          <User size={18} />
                          Profile
                        </Link>

                        <Link
                          to="#"
                          className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50"
                        >
                          <CalendarDays size={18} />
                          My Bookings
                        </Link>

                        <button
                          onClick={
                            handleLogout
                          }
                          className="w-full flex items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50"
                        >
                          <LogOut size={18} />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-5 py-2.5 border border-slate-300 rounded-xl font-medium hover:bg-slate-100"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      className="px-5 py-2.5 bg-black text-white rounded-xl font-medium hover:bg-slate-800"
                    >
                      Register
                    </Link>
                  </>
                ))}
            </div>

            <button
              onClick={() =>
                setMobileMenuOpen(
                  true
                )
              }
              className="lg:hidden"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() =>
              setMobileMenuOpen(
                false
              )
            }
          />

          <div className="fixed top-2 right-0 h-screen w-80 bg-white z-50 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b m-2">
              <h2 className="font-bold text-xl px-5">
                Menu
              </h2>

              <button
                onClick={() =>
                  setMobileMenuOpen(
                    false
                  )
                }
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-5 flex flex-col gap-4">
              <Link to="/">
                Home
              </Link>

              <Link to="#">
                Services
              </Link>

              <Link to="#">
                About Us
              </Link>

              <Link to="#">
                Contact
              </Link>


              {user ? (
                <>
                  <div className="border-t pt-4">
                    <p className="font-semibold">
                      {user.name}
                    </p>

                  </div>

                  <Link to="#">
                    Dashboard
                  </Link>

                  <Link to="#">
                    Profile
                  </Link>

                  <Link to="#">
                    My Bookings
                  </Link>

                  <button
                    onClick={
                      handleLogout
                    }
                    className="flex items-center gap-2 text-red-600"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="border rounded-xl py-3 text-center"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="bg-black text-white rounded-xl py-3 text-center"
                  >
                    Register
                  </Link>
                </>
              )}

              <div className="border-t pt-5 mt-3">
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone size={18} />
                  +91 98765 43210
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;