import React from 'react';


import Spinner from '../Pages/Shared/Spinner';
import Navbar from '../Pages/Shared/Navbar';
import Footer from '../Pages/Shared/Footer';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            <header>
               <Navbar></Navbar>
            </header>
            <main className='min-h-[calc(100vh-380px)] '>
                <div>
                    {
                        navigation.state === 'loading' ? (
                           <Spinner></Spinner>
                        ) : (
                            <Outlet></Outlet>
                        )
                    }
                </div>
            </main>

            <footer>
                    <Footer></Footer>
            </footer>
        </div>
    );
};

export default AuthLayout;