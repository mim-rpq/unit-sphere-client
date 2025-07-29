// src/Pages/DashBoard/Admin/AdminProfile.jsx

import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../../Provider/AuthContext';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Spinner from '../../../Shared/Spinner';
import StatCard from './StatCard';
import { FaCircleCheck } from 'react-icons/fa6';
// import { AuthContext } from '../../../../Provider/AuthContext';
// import useAxiosSecure from '../../../../hooks/useAxiosSecure';
// import Spinner from '../../../Shared/Spinner';
// import StatCard from '../../../components/StatCard'; 

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Fetch rooms stats
  const {
    data: roomsData,
    isLoading: roomsLoading,
    error: roomsError,
  } = useQuery({
    queryKey: ['roomsStats'],
    queryFn: () => axiosSecure.get('/rooms/stats').then(res => res.data),
  });

  // Fetch users count
  const {
    data: usersData,
    isLoading: usersLoading,
    error: usersError,
  } = useQuery({
    queryKey: ['usersCount'],
    queryFn: () => axiosSecure.get('/users/count').then(res => res.data),
  });

  // Fetch members count
  const {
    data: membersData,
    isLoading: membersLoading,
    error: membersError,
  } = useQuery({
    queryKey: ['membersCount'],
    queryFn: () => axiosSecure.get('/members/count').then(res => res.data),
  });

  if (roomsLoading || usersLoading || membersLoading) return <Spinner />;
  if (roomsError || usersError || membersError)
    return <p className="text-red-500">Error loading data</p>;

  const totalRooms = roomsData?.total || 0;
  const availableRooms = roomsData?.available || 0;
  const unavailableRooms = roomsData?.unavailable || 0;
  const usersCount = usersData?.count || 0;
  const membersCount = membersData?.count || 0;

  const availablePercent = totalRooms ? ((availableRooms / totalRooms) * 100).toFixed(1) : 0;
  const unavailablePercent = totalRooms ? ((unavailableRooms / totalRooms) * 100).toFixed(1) : 0;

  return (
    <div className="md:max-w-4xl my-5 mx-auto p-12 mt-7 bg-gradient-to-r from-black to-primary shadow rounded-2xl border-l-4 border-2 border-secondary border-r-0 text-white">
      <div className="flex items-center space-x-6">
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="w-24 h-24 border-2 p-1 border-secondary rounded-full object-cover"
        />
        <div>
          <div className='flex gap-3 items-center'>
            <h2 className="text-2xl font-semibold">{user.displayName} </h2>
            <FaCircleCheck className=' text-secondary' />
          </div>
          <p className="text-primary px-3 rounded-full bg-gray-200 ">{user.email}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Rooms" value={totalRooms} type="total" />
        <StatCard title="Available Rooms" value={`${availablePercent}%`} type="available" />
        <StatCard title="Agreement Rooms" value={`${unavailablePercent}%`} type="unavailable" />
        <StatCard title="Users" value={usersCount} type="users" />
        <StatCard title="Members" value={membersCount} type="members" />

      </div>
    </div>
  );
};

export default AdminProfile;
