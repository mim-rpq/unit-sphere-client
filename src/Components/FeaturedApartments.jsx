import React from "react";
import ApartmentCard from "./ApartmentCard";

const FeaturedApartments = ({ apartments }) => {
  return (
    <section className="pt-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        Featured Apartments
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {apartments.map((apt) => (
          <ApartmentCard key={apt._id} apartment={apt} />
        ))}
      </div>
      <div className="flex justify-center my-9">
        <button className="bg-primary text-white btn">View All Apartment</button>
      </div>
    </section>
  );
};

export default FeaturedApartments;
