import { NavLink, Link } from "react-router";
import { use, useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaClipboardList,
  FaHome,
  FaRegSave,
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

  // logout user
  const handleLogOut = () => {
    Swal.fire({
      icon: "success",
      title: "Log Out Seccess",
      showConfirmButton: false,
      timer: 1500,
    });
    logOutUser()
      .then(() => {})
      .then((error) => {
        console.log(error);
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
    <nav className="bg-base-200 shadow-sm border-b-1 border-base-300">
      <div className="max-w-7xl mx-auto py-2 px-4 md:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" className="w-12 h-12 object-cover" />
          <span className="text-2xl -ml-1 font-bold text-orange-600">
            T.Recipe
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-5 font-semibold text-[#1a1a1a]">
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
            <NavLink to="/add-recipe" className={linksClass}>
              <MdLibraryAdd />
              Add Recipe
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-recipes" className={linksClass}>
              <FaClipboardList />
              My Recipes
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink to="/wishlist" className={linksClass}>
                <FaRegSave />
                Wishlist
              </NavLink>
            </li>
          )}
        </ul>

        {/* Login / Avatar */}
        <div className="hidden space-x-2 md:flex items-center">
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
                className={`absolute right-0 mt-2 w-40 bg-base-100 border border-orange-600 rounded-md shadow-lg transition-opacity duration-200 ${
                  showDropdown ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <p className="px-4 py-2 text-sm font-medium text-orange-600">
                  {user?.displayName}
                </p>
                <hr className="text-orange-600" />
                <button
                  onClick={handleLogOut}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-orange-600 w-full text-left cursor-pointer"
                >
                  <FaSignOutAlt /> Logout
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
        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggleMenu} aria-label={isOpen ? 'Close menu' : 'Open menu'}>
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed left-0 right-0 top-[72px] z-40 transition-all duration-300 ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-8 pointer-events-none'
        }`}
        style={{ minHeight: isOpen ? 'calc(100vh - 72px)' : 0 }}
        aria-hidden={!isOpen}
      >
        <div className="px-4 pb-4 bg-base-100 border-b border-base-300 shadow-lg rounded-b-xl">
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
                to="/add-recipe"
                onClick={toggleMenu}
                className={linksClass}
              >
                <MdLibraryAdd />
                Add Recipe
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-recipes"
                onClick={toggleMenu}
                className={linksClass}
              >
                <FaClipboardList />
                My Recipes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/wishlist"
                onClick={toggleMenu}
                className={linksClass}
              >
                <FaRegSave />
                Wishlist
              </NavLink>
            </li>
            <li className="space-x-2">
              {user ? (
                <div className="flex gap-4 items-center">
                  <img
                    src={user?.photoURL ? user?.photoURL : ""}
                    alt="profile"
                    className="w-9 h-9 rounded-full border border-orange-400"
                  />
                  <div>
                    <p className="text-sm text-orange-600 font-medium">
                      {user?.displayName}
                    </p>
                    <button
                      onClick={handleLogOut}
                      className="flex items-center gap-2 text-sm text-orange-600 w-full"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Link to="/signin" onClick={toggleMenu}>
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link to="/signup" onClick={toggleMenu}>
                    <Button>Sign Up</Button>
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
