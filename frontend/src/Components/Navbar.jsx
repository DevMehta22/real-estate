import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, User, Info, Phone, LogIn } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Navigation links with icons
  const navLinks = [
    { to: "/", label: "Home", icon: <Home className="w-5 h-5 mr-2" /> },
    { to: "/login", label: "Login", icon: <LogIn className="w-5 h-5 mr-2" /> },
    { to: "/signup", label: "Sign Up", icon: <User className="w-5 h-5 mr-2" /> },
    { to: "/about", label: "About", icon: <Info className="w-5 h-5 mr-2" /> },
    // { to: "/contact", label: "Contact", icon: <Phone className="w-5 h-5 mr-2" /> }
  ];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close mobile menu when a link is clicked
  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="images/logo-removebg-preview.png" 
                alt="EstateVista Logo" 
                className="h-16 w-auto object-contain" 
              />
              <span className="ml-2 text-xl font-bold text-primary">EstateVista</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.to}
                to={link.to} 
                className="flex items-center text-text hover:text-primary transition-colors duration-300 group"
              >
                {link.icon}
                <span className="group-hover:text-primary">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-primary" />
              ) : (
                <Menu className="w-6 h-6 text-primary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-black/90 backdrop-blur-sm">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link 
                key={link.to}
                to={link.to} 
                onClick={closeMobileMenu}
                className="flex items-center w-full p-3 hover:bg-gray-800 rounded-lg transition-colors duration-300 text-text hover:text-primary"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;