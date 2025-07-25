import React from 'react';
import Banner from '../Banner/Banner';
import AboutTheBuilding from './AboutTheBuilding';
import ApartmentLocation from './ApartmentLocation';
import ShowCoupons from './ShowCoupons';

const Home = () => {

    return (
        <div>
            <Banner></Banner>
            <ShowCoupons></ShowCoupons>
            <AboutTheBuilding></AboutTheBuilding>
            <ApartmentLocation></ApartmentLocation>
            
        </div>
    );
};

export default Home;