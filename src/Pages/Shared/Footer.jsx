import { FaFacebookF, FaTwitter, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center py-10 mt-16">
      <div className='flex justify-center mb-6'>
        <Logo></Logo>
      </div>
      <p className="text-gray-500 mb-6">Smart Living Starts Here</p>
      
      <div className="flex justify-center gap-6 text-gray-600 text-xl mb-6">
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition"><FaFacebookF /></a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition"><FaTwitter /></a>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition"><FaGithub /></a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition"><FaLinkedinIn /></a>
      </div>

      <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} UnitSphere. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
