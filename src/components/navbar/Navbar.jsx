import { useState } from "react";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { FaUser, FaUserPlus } from "react-icons/fa";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-recipes"
          className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
        >
          All Recipes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-recipe"
          className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
        >
          Add Recipe
        </NavLink>
      </li>
    </>
  );

  const buttons = (
    <>
      <Link
        to="/signin"
        className="flex items-center justify-center text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium border border-gray-300"
      >
        <FaUser className="mr-2" />
        Sign In
      </Link>
      <Link
        to="/signup"
        className="flex items-center justify-center text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium"
      >
        <FaUserPlus className="mr-2" />
        Sign Up
      </Link>
    </>
  );

  

  return (
    <nav className="bg-white shadow-sm rounded-lg max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <span className="text-xl font-bold text-gray-900">Recipe</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-4">{links}</ul>
        </div>
        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          {buttons} <input type="checkbox" value="synthwave" className="toggle theme-controller" />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <ul className="md:hidden flex justify-center flex-col items-center pb-3 space-y-2">
          {links}
          <div className="px-3 pt-2 space-y-2">{buttons}</div>
         <input type="checkbox" value="synthwave" className="toggle theme-controller" />
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
