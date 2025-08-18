
// AdminProfile.jsx
import React, { useContext } from 'react';

import { FaCircleCheck,   FaEnvelope, FaPhone } from 'react-icons/fa6';
import { FaMapMarker } from 'react-icons/fa';
import { AuthContext } from '../../../../Provider/AuthContext';

const AdminProfile = () => {
  const { user } = useContext(AuthContext);

  // Dummy data for address and phone since database doesn't have them
  const address = 'Toronto, Canada';
  const phone = '+1 416-123-4567';

  return (
    <div className="max-w-4xl mx-auto bg-transparent mt-8 p-10 border shadow-2xl rounded-3xl border-l-4 border-secondary text-white">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="w-28 h-28 border-4 border-secondary rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold">{user.displayName}</h2>
            <FaCircleCheck className="text-secondary text-xl" />
          </div>
          <p className="flex items-center gap-2 text-gray-200 mt-2">
            <FaEnvelope className="text-primary" /> {user.email}
          </p>
          <p className="flex items-center gap-2 text-gray-200 mt-1">
            <FaPhone className="text-primary" /> {phone}
          </p>
          <p className="flex items-center gap-2 text-gray-200 mt-1">
            <FaMapMarker className="text-primary" /> {address}
          </p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className=" bg-transparent text-white border-r-4 border-l-0 border-[#BD00DD] rounded-xl shadow-md p-5 border hover:shadow-lg transition-all">
          <h3 className="text-lg text-gray-300">Role</h3>
          <p className="text-xl font-bold mt-2">Admin</p>
        </div>
        <div className="b bg-transparent text-white border-r-4 border-l-0 border-[#BD00DD] rounded-xl shadow-md p-5 border hover:shadow-lg transition-all">
          <h3 className="text-lg text-gray-300">Location</h3>
          <p className="text-xl font-bold mt-2">{address}</p>
        </div>
        <div className=" bg-transparent text-white border-r-4 border-l-0 border-[#BD00DD] rounded-xl shadow-md p-5 border hover:shadow-lg transition-all">
          <h3 className="text-lg text-gray-300">Contact</h3>
          <p className="text-xl font-bold mt-2">{phone}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
