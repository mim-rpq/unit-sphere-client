import React from 'react';
import logo from '../../assets/images/L.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to='/'>
            <div className='flex items-center gap-1'>
                <img src={logo} className='h-16 w-16' alt="" />
                <h1 className="text-2xl text-primary  md:text-3xl font-black">UnitSphere</h1>

            </div>
        </Link>
    );
};

export default Logo;