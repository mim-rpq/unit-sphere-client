import React from 'react';
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to='/'>
            <div className='flex items-center gap-1'>
                <img src={logo} alt="" />
                <h1 className="text-3xl font-bold">Unit<span className='text-5xl font-black text-primary'>S</span>phere</h1>

            </div>
        </Link>
    );
};

export default Logo;