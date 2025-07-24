import React from 'react';
import { Link } from 'react-router';
import notFoundImage from '../../assets/images/error.jpg'
const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
            <img src={notFoundImage} alt="404 Not Found" className="w-72 mb-6" />
            <h1 className="text-4xl font-bold text-primary mb-4">404 - Page Not Found</h1>
            <p className="text-gray-600 mb-6">
                Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-primary text-white rounded hover:bg-blue-900 transition duration-300"
            >
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;