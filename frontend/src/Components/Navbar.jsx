import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div>
          <Link to="/">
              <img src="public/images/logo-removebg-preview.png" alt="Logo" className="h-20" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-20">
            <Link to="/" className="hover:text-gray-400">Home</Link>
            <Link to="/login" className="hover:text-gray-400">Login</Link>
            <Link to="/signup" className="hover:text-gray-400">SingUp</Link>
            <Link to="/about" className="hover:text-gray-400">About</Link>
            <Link to="/contact" className="hover:text-gray-400">Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gray-800">
            <Link to="/" className="hover:text-gray-400">Home</Link>
            <Link to="/login" className="hover:text-gray-400">Login</Link>
            <Link to="/signup" className="hover:text-gray-400">SingUp</Link>
            <Link to="/about" className="hover:text-gray-400">About</Link>
            <Link to="/contact" className="hover:text-gray-400">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;