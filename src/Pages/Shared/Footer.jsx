
import { FaFacebookF, FaTwitter, FaGithub, FaLinkedinIn, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo & Tagline */}
        <div className="flex flex-col items-center md:items-start">
          <Logo />
          <p className="mt-4 text-gray-400 text-center md:text-left">
            Smart Living Starts Here
          </p>
          <div className="flex gap-4 mt-4 text-xl text-gray-200">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition"><FaTwitter /></a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition"><FaGithub /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-100">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-indigo-500 transition">Home</a></li>
            <li><a href="/apartments" className="hover:text-indigo-500 transition">Apartments</a></li>
            <li><a href="/about" className="hover:text-indigo-500 transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-indigo-500 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-100">Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2"><FaEnvelope className="text-indigo-500"/> info@unitsphere.com</li>
            <li className="flex items-center gap-2"><FaPhoneAlt className="text-indigo-500"/> +880 1234 567890</li>
            <li className="flex items-center gap-2"><FaMapMarkerAlt className="text-indigo-500"/> Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Newsletter / CTA */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-100">Subscribe</h3>
          <p className="text-gray-400 mb-4">Get latest updates about apartments and offers.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-2 rounded-l-md outline-none bg-gray-800 text-gray-200 placeholder-gray-400"
            />
            <button className="bg-primary text-white px-4 rounded-r-md hover:bg-indigo-500 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} UnitSphere. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
