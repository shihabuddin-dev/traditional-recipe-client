import { NavLink, Link } from "react-router";
import { use, useState } from "react";
import {
  FaBars,
  FaClipboardList,
  FaHome,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import Button from "../ui/Button";
import logo from "../../assets/logo.png";
import { FirebaseAuthContext } from "../../provider/FirebaseAuthContext";
import Swal from "sweetalert2";
import { SiIfood } from "react-icons/si";
import { MdLibraryAdd } from "react-icons/md";

const Navbar = () => {
  const { user, logOutUser } = use(FirebaseAuthContext);
  const [isOpen, setIsOpen] = useState(false);

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

  const linksClass = "hover:text-orange-600 flex items-center gap-1";

  return (
    <nav className="bg-[#fdf6ee] shadow-sm">
      <div className="max-w-7xl mx-auto py-2 px-4 md:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" className="w-12 h-12 object-cover" />
          <span className="text-2xl -ml-1 font-bold text-orange-600">
            Recipe
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 font-semibold text-[#1a1a1a]">
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
        </ul>

        {/* Login / Avatar */}
        <div className="hidden md:block space-x-2">
          {user ? (
            <div className="relative group cursor-pointer z-10">
              <img
                src={user?.photoURL ? user?.photoURL : ""}
                alt="profile"
                className="w-9 h-9 rounded-full border border-secondary"
              />
              <div className="absolute right-0 mt-2 w-40 bg-base-100 border border-orange-600 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
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
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
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
            <li className="space-x-2">
              {user ? (
                <div className="flex gap-4 items-center">
                  <img
                    src={user?.photoURL ? user?.photoURL : ""}
                    alt="profile"
                    className="w-9 h-9 rounded-full border border-secondary"
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
      )}
    </nav>
  );
};

export default Navbar;
