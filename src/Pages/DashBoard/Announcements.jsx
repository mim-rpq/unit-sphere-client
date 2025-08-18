
import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { MdCampaign } from 'react-icons/md';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Spinner from '../Shared/Spinner';


const Announcements = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/announcements');
      return res.data;
    },
  });

  if (isLoading) return <Spinner />;
  if (isError) return <div className="text-red-500 text-center">Error: {error.message}</div>;

  return (
    <div className="max-w-5xl  mx-auto px-4 sm:px-4 lg:px-8 py-10 ">
      <div className=" bg-transparent text-white border-r-4 border-l-2 border-[#BD00DD]   p-5  hover:shadow-lg transition-all   md:p-8 rounded-2xl shadow-lg border ">
        <h2 className="text-4xl font-extrabold text-white text-center  mb-10 flex items-center justify-center gap-2">
          <MdCampaign className="text-4xl text-white animate-pulse" />
          Announcements
        </h2>

        {data?.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No announcements available.</p>
        ) : (
          <div className="space-y-6">
            {data.map(({ _id, title, description, createdAt, author }) => (
              <div
                key={_id}
                className=" bg-transparent text-white border-l-4 border-r-0 border-[#BD00DD] rounded-xl shadow-md p-5 border hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <MdCampaign className="text-2xl text-indigo-500" />
                  <h3 className="text-2xl font-semibold text-white">{title}</h3>
                </div>
                <p className="text-white text-base mb-3">{description}</p>
                <div className="text-sm text-white italic flex flex-col md:flex-row justify-between">
                  <span>By: {author}</span>
                  <span>
                    {new Date(createdAt).toLocaleDateString()} 
                    {new Date(createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
