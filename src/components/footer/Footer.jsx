import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Button from "../ui/Button";

const Footer = () => {
  return (
    <footer className="bg-[#fff7ed] text-gray-800 py-12 border-t border-orange-200">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-orange-600 mb-3">
            Traditional Recipe
          </h2>
          <p className="text-sm text-gray-600">
            Your daily dose of delicious. Discover, share, and enjoy
            mouth-watering recipes anytime.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <a href="/" className="hover:text-orange-500">
                Home
              </a>
            </li>
            <li>
              <a href="/recipes" className="hover:text-orange-500">
                All Recipes
              </a>
            </li>
            <li>
              <a href="/add-recipe" className="hover:text-orange-500">
                Add Recipe
              </a>
            </li>
            <li>
              <a href="/my-recipes" className="hover:text-orange-500">
                My Recipes
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-orange-500">
                Contact
              </a>
            </li>
          </ul>
        </div>
        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <FaEnvelope /> info@recipebook.com
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> +880 1234-567890
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt /> Dhaka, Bangladesh
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Subscribe</h3>
          <p className="text-sm text-gray-600 mb-3">
            Get the best recipes every week!
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded-md border border-orange-300 focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm w-full"
            />
            <Button type="submit">Subscribe</Button>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-8 border-t border-orange-200 pt-6 text-center text-sm text-gray-600">
        <p>
          &copy; {new Date().getFullYear()} Traditional Recipe All rights
          reserved.
        </p>
        <div className="flex justify-center mt-3 space-x-4 text-orange-500">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF size={18} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={18} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
