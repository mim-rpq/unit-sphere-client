import React from "react";
import { FaUsers, FaHome, FaHandshake } from "react-icons/fa";

const AboutUs = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-4xl font-bold  mb-6">About Us</h2>
        <p className=" max-w-2xl mx-auto mb-12">
          Welcome to <span className="font-semibold">UnitSphere</span> – 
          your trusted platform to find modern apartments and reliable roommates. 
          We make the process of house-hunting easier, faster, and stress-free.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
            <FaHome className="text-4xl text-secondary mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-black mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To simplify apartment searching and create a safe, connected community 
              for renters and homeowners.
            </p>
          </div>

          {/* Team */}
          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
            <FaUsers className="text-4xl text-secondary mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-black mb-2">Our Team</h3>
            <p className="text-gray-600">
              A passionate group of developers, designers, and real estate 
              enthusiasts working together to improve rental experiences.
            </p>
          </div>

          {/* Vision */}
          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
            <FaHandshake className="text-4xl text-secondary mb-4 mx-auto" />
            <h3 className="text-xl text-black font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To become the leading platform where people can find their ideal home 
              and build meaningful roommate connections worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
