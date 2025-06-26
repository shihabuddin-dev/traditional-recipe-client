import { NavLink, Link } from "react-router";
import { use, useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaClipboardList,
  FaHome,
  FaRegSave,
  FaRegUserCircle,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import Button from "../ui/Button";
import logo from "../../assets/logo.png";
import { FirebaseAuthContext } from "../../provider/FirebaseAuthContext";
import Swal from "sweetalert2";
import { SiIfood } from "react-icons/si";
import { MdLibraryAdd } from "react-icons/md";
import userLogo from "../../assets/user-logo.png";
import ThemeToggle from "../ui/ThemeToggle";

const Navbar = () => {
  const { user, logOutUser } = use(FirebaseAuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const toggleMenu = () => setIsOpen(!isOpen);

  // sign out user
  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOutUser();
        Swal.fire({
          title: "Logged out!",
          text: "You have been logged out.",
          icon: "success",
        })
          .then(() => { })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              title: "Error!",
              text: "Logout failed.",
              icon: "error",
            });
          });
      }
    });
  };

  const linksClass =
    "hover:text-orange-600 text-base-content flex items-center gap-1";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <nav className="bg-base-200 shadow-sm border-b-1 border-base-300 fixed top-0 left-0 right-0 z-50 w-full">
      <div className="max-w-7xl mx-auto py-2 px-4 md:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" className="w-12 h-12 object-cover" />
          <span className="text-2xl -ml-1 font-bold text-orange-600">
            T.Recipe
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-5 font-semibold text-[#1a1a1a]">
          <li>
            <NavLink to="/" className={linksClass}>
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/all-recipes" className={linksClass}>
              <SiIfood />
              All Recipes
            </NavLink>
          </li>
          <li>
            <NavLink to="/about-us" className={linksClass}>
              <FaClipboardList />
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact-us" className={linksClass}>
              <FaClipboardList />
              Contact Us
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink to="/dashboard" className={linksClass}>
                <FaRegUserCircle />
                Dashboard
              </NavLink>
            </li>
          )}
        </ul>

        {/* Login / Avatar */}
        <div className="hidden space-x-2 lg:flex items-center">
          {user ? (
            <div
              className="relative cursor-pointer z-10"
              onClick={() => setShowDropdown(!showDropdown)}
              ref={dropdownRef}
            >
              <img
                src={user?.photoURL ? user?.photoURL : userLogo}
                alt="profile"
                title={user?.displayName}
                className="w-9 h-9 rounded-full border border-orange-400"
              />
              <div
                className={`absolute right-0 mt-2 w-40 bg-base-100 border border-orange-600 rounded-md shadow-lg transition-opacity duration-200 ${showDropdown ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
              >
                <p className="px-4 py-2 text-sm font-medium text-orange-600">
                  {user?.displayName}
                </p>
                <hr className="text-orange-600" />
                <Link to="/my-profile">
                  <p className="px-4 text-sm font-medium text-orange-600 py-2">
                    My Profile
                  </p>
                </Link>
                <hr className="text-orange-600" />
                <button
                  onClick={handleLogOut}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-orange-600 w-full text-left cursor-pointer"
                >
                  <FaSignOutAlt /> Log Out
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
          <ThemeToggle />
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed left-0 right-0 top-[64px] z-40 transition-all duration-300 ${isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-8 pointer-events-none"
          }`}
        style={{ minHeight: isOpen ? "calc(100vh - 72px)" : 0 }}
        aria-hidden={!isOpen}
      >
        <div className="px-4 pt-2 pb-4 bg-base-100 border-b border-base-300 shadow-lg rounded-b-xl">
          <ul className="flex flex-col gap-4 font-semibold text-[#1a1a1a]">
            <li>
              <NavLink to="/" onClick={toggleMenu} className={linksClass}>
                <FaHome />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-recipes"
                onClick={toggleMenu}
                className={linksClass}
              >
                <SiIfood />
                All Recipes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about-us"
                onClick={toggleMenu}
                className={linksClass}
              >
                <FaClipboardList />
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact-us"
                onClick={toggleMenu}
                className={linksClass}
              >
                <FaClipboardList />
                Contact Us
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink
                  to="/dashboard"
                  onClick={toggleMenu}
                  className={linksClass}
                >
                  <FaRegUserCircle />
                  Dashboard
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
