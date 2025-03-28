import React, { useState, useRef } from "react";
import { 
    Home as HomeIcon, 
    Search, 
    MapPin, 
    Trophy, 
    Star, 
    ShieldCheck,
    X 
} from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Home = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const propertyFilters = ["All", "Luxury", "Residential", "Commercial"];

    // Create refs for different sections
    const featuredPropertiesRef = useRef(null);
    const servicesRef = useRef(null);

    const featuredProperties = [
        {
            title: "Oceanfront Villa",
            price: "$4,500,000",
            location: "Malibu, California",
            bedrooms: 5,
            bathrooms: 4,
            area: "6,500 sq ft"
        },
        {
            title: "Modern Downtown Loft",
            price: "$1,750,000",
            location: "New York City, NY",
            bedrooms: 3,
            bathrooms: 2,
            area: "3,200 sq ft"
        },
        {
            title: "Mountain Retreat",
            price: "$2,300,000",
            location: "Aspen, Colorado",
            bedrooms: 4,
            bathrooms: 3,
            area: "4,800 sq ft"
        }
    ];

    // Scroll to section function
    const scrollToSection = (elementRef) => {
        elementRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Handle property view details
    const handleViewDetails = (property) => {
        setSelectedProperty(property);
        setIsModalOpen(true);
    };

    // Handle modal close
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProperty(null);
    };

    return (
        <div className="bg-secondary text-white">
            <Navbar/>
            
            {/* Hero Section */}
            <section
                className="relative h-screen flex items-center justify-center text-center bg-cover bg-center"
                style={{ 
                    backgroundImage: "url('/public/images/background.png')",
                }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 px-6 max-w-2xl">
                    <h1 className="text-5xl md:text-7xl font-bold text-primary drop-shadow-lg">
                        EstateVista
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-text">
                        Experience Luxury Living Like Never Before
                    </p>
                    <div className="mt-6 flex justify-center space-x-4">
                        <button 
                            onClick={() => scrollToSection(featuredPropertiesRef)}
                            className="px-8 py-3 bg-primary text-secondary font-semibold rounded-lg shadow-lg hover:bg-opacity-80 transition"
                        >
                            Explore Now
                        </button>
                        <button 
                            onClick={() => scrollToSection(servicesRef)}
                            className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-secondary transition"
                        >
                            Our Services
                        </button>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section ref={servicesRef} className="py-20 px-6 text-center bg-black">
                <h2 className="text-4xl font-semibold text-primary">Why Choose EstateVista?</h2>
                <div className="grid md:grid-cols-3 gap-12 mt-12">
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg transform transition hover:scale-105">
                        <ShieldCheck className="mx-auto text-primary" size={48}/>
                        <h3 className="text-2xl text-primary font-semibold mt-4">Exclusive Properties</h3>
                        <p className="mt-4 text-text">Only the most luxurious homes, handpicked for you.</p>
                    </div>
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg transform transition hover:scale-105">
                        <Trophy className="mx-auto text-primary" size={48}/>
                        <h3 className="text-2xl text-primary font-semibold mt-4">Personalized Service</h3>
                        <p className="mt-4 text-text">A bespoke experience tailored to your needs.</p>
                    </div>
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg transform transition hover:scale-105">
                        <MapPin className="mx-auto text-primary" size={48}/>
                        <h3 className="text-2xl text-primary font-semibold mt-4">Global Reach</h3>
                        <p className="mt-4 text-text">Find your dream property anywhere in the world.</p>
                    </div>
                </div>
            </section>

            {/* Featured Properties */}
            <section ref={featuredPropertiesRef} className="py-20 px-6 bg-secondary">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-semibold text-primary">Featured Properties</h2>
                    <div className="flex justify-center mt-6 space-x-4">
                        {propertyFilters.map((filter) => (
                            <button
                                key={filter}
                                className={`px-4 py-2 rounded-lg transition ${
                                    activeFilter === filter 
                                    ? 'bg-primary text-secondary' 
                                    : 'text-text hover:bg-gray-700'
                                }`}
                                onClick={() => setActiveFilter(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {featuredProperties.map((property, index) => (
                        <div 
                            key={index} 
                            className="bg-black rounded-lg overflow-hidden shadow-lg transform transition hover:scale-105"
                        >
                            <div className="p-6">
                                <h3 className="text-2xl text-primary font-semibold">{property.title}</h3>
                                <div className="mt-4 text-text">
                                    <p className="font-bold text-xl">{property.price}</p>
                                    <p className="mt-2">{property.location}</p>
                                    <div className="mt-4 flex justify-between">
                                        <span>🛏️ {property.bedrooms} Beds</span>
                                        <span>🚿 {property.bathrooms} Baths</span>
                                        <span>📏 {property.area}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleViewDetails(property)}
                                    className="mt-6 w-full py-3 bg-primary text-secondary rounded-lg hover:bg-opacity-80"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Custom Modal for Property Details */}
            {isModalOpen && selectedProperty && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-secondary rounded-lg shadow-xl max-w-md w-full p-6 relative">
                        <button 
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-primary hover:text-opacity-80"
                        >
                            <X size={24} />
                        </button>
                        <h2 className="text-2xl text-primary font-semibold mb-4">Property Details</h2>
                        <p className="text-text mb-2">To view full details, please log in or sign up.</p>
                        
                        <div className="mt-4 text-center">
                            <h3 className="text-xl text-primary font-semibold">{selectedProperty.title}</h3>
                            <p className="text-text mt-2">{selectedProperty.location}</p>
                            <p className="text-text mt-2">Price: {selectedProperty.price}</p>
                        </div>
                        
                        <div className="flex justify-center mt-6 space-x-4">
                            <button 
                                onClick={() => window.location.href = '/login'}
                                className="px-6 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-secondary transition"
                            >
                                Login
                            </button>
                            <button 
                                onClick={() => window.location.href = '/signup'}
                                className="px-6 py-2 bg-primary text-secondary rounded-lg hover:bg-opacity-80 transition"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Testimonials */}
<section className="py-20 bg-black text-center">
<h2 className="text-4xl font-semibold text-primary">What Our Clients Say</h2>
<div className="mt-12 flex flex-wrap justify-center gap-8">
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 transform transition hover:scale-105">
        <Star className="mx-auto text-primary mb-4" size={36}/>
        <p className="italic text-text">"EstateVista made my luxury home buying experience effortless!"</p>
        <h4 className="mt-4 text-primary font-semibold">- Emily Carter</h4>
    </div>
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 transform transition hover:scale-105">
        <Star className="mx-auto text-primary mb-4" size={36}/>
        <p className="italic text-text">"Top-tier service and breathtaking properties!"</p>
        <h4 className="mt-4 text-primary font-semibold">- Michael Smith</h4>
    </div>
</div>
</section>

{/* Footer */}
{/* <footer className="py-6 text-center bg-secondary">
<div className="container mx-auto px-4">
    <p className="text-text">© 2025 EstateVista. All Rights Reserved.</p>
    <div className="mt-4 flex justify-center space-x-6">
        <a href="#" className="text-text hover:text-primary">Privacy Policy</a>
        <a href="#" className="text-text hover:text-primary">Terms of Service</a>
        <a href="#" className="text-text hover:text-primary">Contact Us</a>
    </div>
</div>
</footer> */}
<Footer/>
        </div>
    );
};

export default Home;

