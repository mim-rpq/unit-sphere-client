import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import banner1 from '../../assets/images/banner_1.png'
import banner2 from '../../assets/images/banner_2.png'
import banner3 from '../../assets/images/banner_3.png'


const Banner = () => {
    return (
        <div className=''>
            <Carousel autoPlay infiniteLoop showThumbs={false} interval={2000}>
                <div>
                    <img className='' src={banner1} />
                   
                </div>
                <div>
                    <img className='' src={banner2} />
                    
                </div>
                <div>
                    <img className='' src={banner3} />
                   
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;