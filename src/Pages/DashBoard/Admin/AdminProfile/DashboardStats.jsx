import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Spinner from '../../../Shared/Spinner';
import StatCard from './StatCard';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';


const DashboardStats = () => {
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

  // Pie chart data for rooms
  const roomsChartData = [
    { name: 'Available', value: availableRooms },
    { name: 'Unavailable', value: unavailableRooms },
  ];
  const COLORS = ['#4ade80', '#f87171']; // green, red

  // Bar chart data for users & members
  const userMemberData = [
    { name: 'Users', count: usersCount },
    { name: 'Members', count: membersCount },
  ];

  return (
    <div className="md:max-w-5xl my-5 mx-auto p-8 grid grid-cols-1 gap-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Rooms" value={totalRooms} type="total" />
        <StatCard title="Available Rooms" value={`${availablePercent}%`} type="available" />
        <StatCard title="Unavailable Rooms" value={`${unavailablePercent}%`} type="unavailable" />
        <StatCard title="Users" value={usersCount} type="users" />
        <StatCard title="Members" value={membersCount} type="members" />
      </div>

      {/* Pie Chart for Rooms */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">Rooms Status</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={roomsChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {roomsChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart for Users & Members */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">Users & Members</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={userMemberData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardStats;
