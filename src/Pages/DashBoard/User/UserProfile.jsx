import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Provider/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Spinner from '../../Shared/Spinner';
import { MdEmail, MdDateRange, MdHome } from 'react-icons/md';

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: userData, isLoading, isError } = useQuery({
    queryKey: ['my-profile'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users/me');
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <p className="text-red-600 text-center font-semibold mt-4">
        Failed to load profile
      </p>
    );

  return (
    <div className="m-7 max-w-3xl bg-purple-50 p-6 rounded-lg shadow-lg font-sans">
      {/* Profile Picture and Name */}
      <div className="flex flex-col items-center space-y-3">
        {userData?.photoURL ? (
          <img
            src={userData.photoURL}
            alt={`${userData.name} profile`}
            className="w-32 h-32 rounded-full object-cover shadow-md"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-4xl text-white shadow-md">
            ?
          </div>
        )}
        <h2 className="text-2xl font-bold text-primary">{userData?.name}</h2>
        <div className="flex items-center text-sm text-gray-600 space-x-1">
          <MdEmail className="text-primary" />
          <span>{userData?.email}</span>
        </div>
      </div>

      {/* Membership Details */}
      <div className="mt-6 border-t border-gray-300 pt-4">
        <h3 className="text-lg font-semibold text-secondary mb-2 flex items-center gap-2">
          <MdDateRange /> Membership Details
        </h3>
        <p>
          <span className="font-semibold">Start Date:</span>{' '}
          <span className="text-gray-400">None</span>
        </p>
      </div>

      {/* Apartment Details */}
      <div className="mt-6 border-t border-gray-300 pt-4">
        <h3 className="text-lg font-semibold text-secondary mb-2 flex items-center gap-2">
          <MdHome /> Apartment Details
        </h3>
        <p>
          <span className="font-semibold">Floor Number:</span>{' '}
          <span className="text-gray-400">None</span>
        </p>
        <p>
          <span className="font-semibold">Block Name:</span>{' '}
          <span className="text-gray-400">None</span>
        </p>
        <p>
          <span className="font-semibold">Apartment Number:</span>{' '}
          <span className="text-gray-400">None</span>
        </p>
        <p>
          <span className="font-semibold">Monthly Rent:</span>{' '}
          <span className="text-gray-400">None</span>
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
