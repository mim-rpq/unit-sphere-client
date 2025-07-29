import React from 'react';
import { FaBuilding } from 'react-icons/fa';
import AOS from 'aos';
import building from '../../assets/images/building.png';
import 'aos/dist/aos.css';

const AboutBuilding = () => {


  return (
    <section className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-10 md:flex  md:flex-col-reverse lg:flex-row md:items-center md:gap-16">
        {/* Left text content */}
        <div className="md:flex-1">
          <div className="flex items-center text-indigo-600 mb-4 text-5xl">
            <FaBuilding />
          </div>
          <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
            About Our Building
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-8"></div>

          <p className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
            Welcome to <span className="font-bold text-indigo-700">Unit Sphere</span> — a true symbol of sophistication and modern urban living.
            Nestled in the vibrant heart of Toronto, our building merges luxury, lifestyle, and convenience for a truly elevated experience.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
            Each apartment is a masterpiece of design, blending open-concept layouts with natural light and premium finishes. Whether you're a professional, a family, or a student, Unit Sphere provides a peaceful sanctuary while being moments away from the energy of city life.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
            With 24/7 security surveillance, high-speed elevators, eco-friendly waste management, rooftop gardens, and a state-of-the-art fitness center, every detail has been thoughtfully designed to elevate your daily living.
          </p>

          <p className="text-gray-600 italic border-l-4 border-pink-500 pl-4 mb-8">
            “Experience the comfort of home with the convenience of city living — where your peace of mind is our top priority.”
          </p>

          <p className="text-gray-700 text-lg leading-relaxed font-medium">
            Located within walking distance of top schools, hospitals, cafes, shopping centers, and transit lines, Unit Sphere puts everything you need right at your doorstep.
            Discover a friendly community, responsive management, and a place you’ll be proud to call home.
          </p>
        </div>

        {/* Right image */}
        <div
          data-aos=""
          className="md:block md:flex-1"
        >
          <img
            src={building}
            alt="Building Exterior"
            className="rounded-2xl shadow-lg object-cover w-full max-h-96"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutBuilding;
