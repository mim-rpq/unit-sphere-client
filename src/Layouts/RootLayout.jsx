import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import Navbar from '../Pages/Shared/Navbar';
import Footer from '../Pages/Shared/Footer';
import Spinner from '../Pages/Shared/Spinner';

const RootLayout = () => {
    const navigation = useNavigation();

    return (
        <div>
            <header>
                <Navbar></Navbar>
            </header>
            <main className='min-h-[calc(100vh-470px)] mt-[80px] '>
                <section>
                    {
                        navigation.state==='loading'?(
                            <Spinner></Spinner>
                        ):(
                            <Outlet></Outlet>
                        )
                    }
                </section>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default RootLayout;