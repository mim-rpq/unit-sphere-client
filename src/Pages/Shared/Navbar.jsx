import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Logo from './Logo';
import defaultUser from '../../assets/images/default_user.png';
import { AuthContext } from '../../Provider/AuthContext';
import { FaUser } from 'react-icons/fa';


const Navbar = () => {
    const { user, userLoading, logOut } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('You logged out successfully');
                navigate('/');
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const links = (
        <>
            <li className='mr-4'>
                <NavLink
                    className={({ isActive }) =>
                        `${isActive ? "text-secondary border-b-2 pb-2" : "text-primary hover:border-b-2 border-primary pb-2"}`
                    }
                    to='/'
                >
                    Home
                </NavLink>
            </li>
            <li className='mr-4'>
                <NavLink
                    className={({ isActive }) =>
                        `${isActive ? "text-secondary border-b-2 pb-2" : "text-primary hover:border-b-2 border-primary pb-2"}`
                    }
                    to='/apartments'
                >
                    Apartments
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm h-[80px] px-12">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Logo />
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="flex items-center gap-5 px-1">
                    {links}
                </ul>
            </div>

            <div className="navbar-end">
                {!userLoading && user ? (
                    <div className="relative">
                        <img
                            src={user?.photoURL || defaultUser}
                            alt="User"
                            className="w-10 h-10 rounded-full border-2 border-primary cursor-pointer"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        />
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-48 z-50">
                                <div className="px-4 py-2 font-semibold text-primary">{user?.displayName || 'User'}</div>
                                <Link to="/dashboard" className="block px-4 py-2 hover:bg-base-200 text-primary">
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogOut}
                                    className="w-full text-left px-4 py-2 hover:bg-base-200 text-red-600"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link to='/auth/login' className="">
                            <FaUser className='text-gray-600 text-2xl' />
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
