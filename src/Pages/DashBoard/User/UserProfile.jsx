import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Provider/AuthContext';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Spinner from '../../Shared/Spinner';
import { FaUser, FaEnvelope, FaCalendarAlt, FaBuilding, FaThLarge, FaHashtag } from 'react-icons/fa';


const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: userData, isPending, isError } = useQuery({
        queryKey: ['my-profile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isPending) return <Spinner />;
    if (isError) return <p className="text-red-500 text-center mt-8">Failed to load profile data.</p>;

    return (
        <div className="max-w-4xl mx-auto mt-10 shadow-2xl bg-gray-50 rounded-3xl p-8 border border-gray-200">
            <h2 className="text-4xl font-extrabold text-center mb-10 tracking-wide">
                My Profile
            </h2>

            <div className="grid md:grid-cols-4 gap-8  items-center">
                {/* Profile Image */}
                <div className="flex justify-center">
                    {userData?.photoURL ? (
                        <img
                            src={userData.photoURL}
                            alt="Profile"
                            className="w-48 h-48 rounded-full border-4 border-primary shadow-lg object-cover transition-transform duration-300 hover:scale-105"
                        />
                    ) : (
                        <div className="w-36 h-36 rounded-full bg-gray-100 flex items-center justify-center text-3xl text-gray-500 border-4 border-gray-300 shadow-inner">
                            ?
                        </div>
                    )}
                </div>

                {/* User Info */}
                <div className="md:col-span-2 text-gray-800 space-y-4 text-lg">
                    <div className="flex items-center gap-2">
                        <FaUser className="text-primary" />
                        <span className="font-semibold text-primary">Name:</span> {userData?.name}
                    </div>
                    <div className="flex items-center gap-2">
                        <FaEnvelope className="text-primary" />
                        <span className="font-semibold text-primary">Email:</span> {userData?.email}
                    </div>
                    <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-primary" />
                        <span className="font-semibold text-primary">Accept Date:</span>{" "}
                        <span className='text-gray-400'> {userData?.acceptDate
                            ? new Date(userData.acceptDate).toLocaleDateString()
                            : "None"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaBuilding className="text-primary" />
                        <span className="font-semibold text-primary">Floor No:</span>{" "}
                        <span className='text-gray-400'>{userData?.apartmentInfo?.floorNo || "None"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaThLarge className="text-primary" />
                        <span className="font-semibold text-primary">Block Name:</span>{" "}
                        <span className='text-gray-400'> {userData?.apartmentInfo?.blockName || "None"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaHashtag className="text-primary" />
                        <span className="font-semibold text-primary">Apartment No:</span>{" "}
                        <span className='text-gray-400'>{userData?.apartmentInfo?.apartmentNo || "None"}</span>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default UserProfile;
