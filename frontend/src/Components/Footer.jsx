import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-secondary text-text py-10">
            <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
                {/* Company Info Column */}
                <div>
                    <h4 className="text-primary text-xl font-bold mb-4">RealEstate AI</h4>
                    <p className="text-highlight text-sm">
                        Empowering real estate decisions through cutting-edge AI technology and data-driven insights.
                    </p>
                </div>

                {/* Quick Links Column */}
                <div>
                    <h4 className="text-primary text-lg font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        {[
                            { name: "Home", path: "/" },
                            { name: "Property Valuation", path: "/valuation" },
                            { name: "Listings", path: "/listings" },
                            { name: "About Us", path: "/about" }
                        ].map((link) => (
                            <li key={link.name}>
                                <Link 
                                    to={link.path} 
                                    className="text-highlight hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Services Column */}
                <div>
                    <h4 className="text-primary text-lg font-semibold mb-4">Our Services</h4>
                    <ul className="space-y-2">
                        {[
                            "AI Property Valuation",
                            "Market Analysis",
                            "Investment Consulting",
                            "Property Insights"
                        ].map((service) => (
                            <li 
                                key={service} 
                                className="text-highlight"
                            >
                                {service}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Column */}
                <div>
                    <h4 className="text-primary text-lg font-semibold mb-4">Contact Us</h4>
                    <div className="space-y-2 text-highlight">
                        <p>123 Real Estate Avenue</p>
                        <p>Tech City, Innovation District</p>
                        <p>Email: support@realestate-ai.com</p>
                        <p>Phone: (555) 123-4567</p>
                    </div>
                </div>
            </div>

            {/* Social Media Icons */}
            <div className="container mx-auto px-4 mt-8 flex justify-center space-x-6">
                {[
                    { name: "Facebook", icon: "fab fa-facebook" },
                    { name: "Twitter", icon: "fab fa-twitter" },
                    { name: "LinkedIn", icon: "fab fa-linkedin" },
                    { name: "Instagram", icon: "fab fa-instagram" }
                ].map((social) => (
                    <a 
                        key={social.name}
                        href="#" 
                        className="text-primary hover:text-highlight text-2xl transition-colors"
                    >
                        <i className={social.icon}></i>
                    </a>
                ))}
            </div>

            {/* Copyright */}
            <div className="text-center mt-8 pt-4 border-t border-primary">
                <p className="text-highlight text-sm">
                    © {currentYear} RealEstate AI. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;