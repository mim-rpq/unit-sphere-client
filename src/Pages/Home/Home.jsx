import React from 'react';
import Banner from '../Banner/Banner';
import AboutTheBuilding from './AboutTheBuilding';
import ApartmentLocation from './ApartmentLocation';

const Home = () => {

    return (
        <div>
            <Banner></Banner>
            <AboutTheBuilding></AboutTheBuilding>
            <ApartmentLocation></ApartmentLocation>
        </div>
    );
};

export default Home;