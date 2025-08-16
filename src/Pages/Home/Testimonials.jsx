import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import Marquee from "react-fast-marquee";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Testimonials = () => {
  const axiosSecure = useAxiosSecure();

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await axiosSecure.get("/testimonials");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading testimonials...</p>;

  return (
    <section className="my-12 py-12 bg-blue-50">
      {/* Section background color added via bg-blue-50 */}
      <h2 className="text-3xl font-bold text-center mb-6">Residents’ Feedback</h2>
      <div className="max-w-7xl mx-auto">
        <Marquee pauseOnHover speed={60} gradient={false}>
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow-lg m-3 w-80 h-72 flex flex-col justify-between"
          >
            {/* Set fixed width w-80 and height h-72 */}
            <div className="flex items-center space-x-4">
              <img
                src={item.photo}
                alt={item.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <div className="flex text-yellow-500">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-600 italic flex-grow">
              “{item.feedback}”
            </p>
          </div>
        ))}
      </Marquee>
      </div>
    </section>
  );
};

export default Testimonials;
