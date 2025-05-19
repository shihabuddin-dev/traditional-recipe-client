import { NavLink, Link } from "react-router";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Button from "../ui/Button";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
            <NavLink to="/" className="hover:text-orange-600">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/recipes" className="hover:text-orange-600">
              All Recipes
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-recipe" className="hover:text-orange-600">
              Add Recipe
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-recipes" className="hover:text-orange-600">
              My Recipes
            </NavLink>
          </li>
        </ul>

        {/* Login / Avatar */}
        <div className="hidden md:block space-x-2">
          <Link to="/signin">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
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
              <NavLink to="/" onClick={toggleMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/recipes" onClick={toggleMenu}>
                All Recipes
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-recipe" onClick={toggleMenu}>
                Add Recipe
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-recipes" onClick={toggleMenu}>
                My Recipes
              </NavLink>
            </li>
            <li className="space-x-2">
              <Link to="/signin" onClick={toggleMenu}>
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/signup" onClick={toggleMenu}>
                <Button>Sign Up</Button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
