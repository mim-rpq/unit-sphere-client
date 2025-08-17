
import React from 'react';
import Banner from '../Banner/Banner';
import AboutTheBuilding from './AboutTheBuilding';
import ApartmentLocation from './ApartmentLocation';
import ShowCoupons from './ShowCoupons';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import FeaturedApartments from '../../Components/FeaturedApartments';
import Testimonials from './Testimonials';
import apartmentBg3 from '../../assets/images/Ap.jpg';
import Amenities from './Amenities';
import HowItWorks from './HowItWorks';
import Spinner from '../Shared/Spinner';

const Home = () => {
  const axiosSecure = useAxiosSecure();
  const { data: apartments = [], isLoading } = useQuery({
    queryKey: ["featuredApartments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/apartments/featured");
      return res.data;
    },
  });

  if (isLoading) return <Spinner></Spinner>;

  return (
    <div
      className="bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${apartmentBg3})` }}
    >
      <Banner />
      <div className=" bg-base-200 py-9 mb-24">
        <div className='max-w-7xl mx-auto'>
          <FeaturedApartments apartments={apartments} />
        </div>
      </div>
      <HowItWorks></HowItWorks>
      <ShowCoupons />
      <AboutTheBuilding />
      <Amenities></Amenities>
      <Testimonials />
      <ApartmentLocation />
    </div>
  );
};

export default Home;
