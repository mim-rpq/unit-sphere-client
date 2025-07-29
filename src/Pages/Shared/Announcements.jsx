
import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { MdCampaign } from 'react-icons/md';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Spinner from './Spinner';

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
    <div className="max-w-5xl mx-auto px-4 sm:px-4 lg:px-8 py-10">
      <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-3 md:p-8 rounded-2xl shadow-lg border border-purple-200">
        <h2 className="text-4xl font-extrabold text-center text-primary mb-10 flex items-center justify-center gap-2">
          <MdCampaign className="text-4xl text-rose-500 animate-pulse" />
          Announcements
        </h2>

        {data?.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No announcements available.</p>
        ) : (
          <div className="space-y-6">
            {data.map(({ _id, title, description, createdAt, author }) => (
              <div
                key={_id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <MdCampaign className="text-2xl text-indigo-500" />
                  <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
                </div>
                <p className="text-gray-700 text-base mb-3">{description}</p>
                <div className="text-sm text-gray-500 italic flex flex-col md:flex-row justify-between">
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
