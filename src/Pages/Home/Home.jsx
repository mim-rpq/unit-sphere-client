import React from 'react';
import Banner from '../Banner/Banner';
import AboutTheBuilding from './AboutTheBuilding';
import ApartmentLocation from './ApartmentLocation';
import ShowCoupons from './ShowCoupons';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import FeaturedApartments from '../../Components/FeaturedApartments';
import Testimonials from './Testimonials';

const Home = () => {

    const axiosSecure = useAxiosSecure();
    const { data: apartments = [], isLoading } = useQuery({
    queryKey: ["featuredApartments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/apartments/featured");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <Banner></Banner>
            <div className='max-w-7xl mx-auto'>
                <FeaturedApartments apartments={apartments}></FeaturedApartments>

            </div>
            <ShowCoupons></ShowCoupons>
            <AboutTheBuilding></AboutTheBuilding>
            <Testimonials></Testimonials>
            <ApartmentLocation></ApartmentLocation>
            
        </div>
    );
};

export default Home;