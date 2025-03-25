import React from "react";
import Navbar from "../Components/Navbar";

const Home = () => {
  return (
    <div className="bg-secondary text-white">
        <Navbar/>
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/public/images/background.png')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 px-6 max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold text-gold drop-shadow-lg">
            EstateVista
          </h1>
          <p className="mt-4 text-lg md:text-xl text-text">
            Experience Luxury Living Like Never Before
          </p>
          <button className="mt-6 px-8 py-3 bg-gold text-black font-semibold rounded-lg shadow-lg hover:bg-gold/80 transition">
            Explore Now
          </button>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 text-center bg-black">
        <h2 className="text-4xl font-semibold text-gold">Why Choose EstateVista?</h2>
        <div className="grid md:grid-cols-3 gap-12 mt-12">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl text-gold font-semibold">Exclusive Properties</h3>
            <p className="mt-4 text-text">Only the most luxurious homes, handpicked for you.</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl text-gold font-semibold">Personalized Service</h3>
            <p className="mt-4 text-text">A bespoke experience tailored to your needs.</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl text-gold font-semibold">Global Reach</h3>
            <p className="mt-4 text-text">Find your dream property anywhere in the world.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-900 text-center">
        <h2 className="text-4xl font-semibold text-gold">What Our Clients Say</h2>
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <p className="italic text-text">"EstateVista made my luxury home buying experience effortless!"</p>
            <h4 className="mt-4 text-gold font-semibold">- Emily Carter</h4>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <p className="italic text-text">"Top-tier service and breathtaking properties!"</p>
            <h4 className="mt-4 text-gold font-semibold">- Michael Smith</h4>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center bg-black">
        <p className="text-text">© 2025 EstateVista. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;