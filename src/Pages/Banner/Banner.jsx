import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from '../../assets/images/apar.jpg'
import banner3 from '../../assets/images/trust.jpg'
import banner4 from '../../assets/images/111.jpg'
import banner5 from '../../assets/images/444.jpg'
import banner6 from '../../assets/images/333.jpg'
import { Link } from 'react-router';


const Banner = () => {
    return (
        <div className=''>
            <Carousel autoPlay infiniteLoop showThumbs={false} interval={3000}>
                <div
                    className="h-[500px] md:h-[600px] lg:h-[700px] bg-cover bg-center flex items-center justify-center text-white relative"
                    style={{ backgroundImage: `url(${banner1})` }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/60 bg-opacity-50"></div>

                    {/* Content */}
                    <div
                        className="relative z-10 text-center px-4">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to Unit Sphere</h1>
                        <p className="text-lg md:text-xl mb-6">Discover your dream home in just a few clicks. Explore modern, luxury, and affordable apartments all in one place — tailored to match your lifestyle and budget.</p>
                        <Link to='/apartments'>
                            <button className="bg-gradient-to-r from-secondary to-primary cursor-pointer  text-white hover:bg-secondary px-6 py-2 rounded-md font-medium transition">Get Started</button>
                        </Link>
                    </div>
                </div>



                {/* Middle Slide (Grid with Overlay and Text) */}
                <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
                    {/* Image Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-full">
                        <div
                            className="bg-cover bg-center"
                            style={{ backgroundImage: `url(${banner6})` }}
                        ></div>
                        <div
                            className="bg-cover bg-center row-span-2"
                            style={{ backgroundImage: `url(${banner4})` }}
                        ></div>
                        <div
                            className="bg-cover bg-center"
                            style={{ backgroundImage: `url(${banner5})` }}
                        ></div>
                    </div>

                    {/* Overlay and Text */}
                    <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center px-4">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Explore Stunning Interiors</h2>
                        <p className="text-lg md:text-xl">Step into elegance and comfort with our beautifully designed apartments. From cozy corners to modern finishes, your ideal home awaits.</p>
                    </div>
                </div>



                <div
                    className="h-[500px] md:h-[600px] lg:h-[700px] bg-cover bg-center flex items-center justify-center text-white relative"
                    style={{ backgroundImage: `url(${banner3})` }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/60 bg-opacity-50"></div>

                    {/* Content */}
                    <div className="relative z-10 text-center px-4">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to Unit Sphere</h1>
                        <p className="text-lg md:text-xl mb-6">Find your perfect apartment with us</p>
                        <Link to='/apartments'>
                            <button className="bg-gradient-to-r cursor-pointer from-secondary to-primary  text-white hover:bg-secondary px-6 py-2 rounded-md font-medium transition">Get Started</button>
                        </Link>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;