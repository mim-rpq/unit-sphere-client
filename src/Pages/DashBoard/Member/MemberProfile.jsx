import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Spinner from '../../Shared/Spinner';
import { MdEmail, MdDateRange, MdHome } from 'react-icons/md';


const MemberProfile = () => {
    const axiosSecure = useAxiosSecure();



    const { data: profile, isLoading, error } = useQuery({
        queryKey: ['memberProfile'],
        queryFn: () => axiosSecure.get('/agreements/my').then(res => res.data),
    });

    if (isLoading) return <Spinner />;
    if (error)
        return (
            <p className="text-red-600 text-center font-semibold mt-4">
                Failed to load profile
            </p>
        );

    return (
        <div

            className="m-7 max-w-3xl   bg-transparent text-white border-r-4 border-l-0 border-[#BD00DD] rounded-xl shadow-md p-5 border hover:shadow-lg transition-all"
        >
            <div>
                {/* Profile Picture and Name */}
                <div className="flex flex-col items-center space-y-3">
                    <img
                        src={profile.profilePicture}
                        alt={`${profile.fullName} profile`}
                        className="w-32 h-32 rounded-full object-cover shadow-md"
                    />
                    <h2 className="text-2xl font-bold text-primary">{profile.fullName}</h2>
                    <div className="flex items-center text-sm text-gray-600 space-x-1">
                        <MdEmail className="text-primary" />
                        <span className='text-white'>{profile.emailAddress}</span>
                    </div>
                </div>

                {/* Membership Details */}
                <div className="mt-6 border-t border-gray-300 pt-4">
                    <h3 className="text-lg font-semibold text-secondary mb-2 flex items-center gap-2">
                        <MdDateRange /> Membership Details
                    </h3>
                    <p>
                        <span className="font-semibold">Start Date:</span>{' '}
                        {new Date(profile.membershipStartDate).toLocaleDateString()}
                    </p>
                </div>

                {/* Apartment Details */}
                <div className="mt-6 border-t border-gray-300 pt-4">
                    <h3 className="text-lg font-semibold text-secondary mb-2 flex items-center gap-2">
                        <MdHome /> Apartment Details
                    </h3>
                    <p>
                        <span className="font-semibold">Floor Number:</span> {profile.floorNumber}
                    </p>
                    <p>
                        <span className="font-semibold">Block Name:</span> {profile.blockName}
                    </p>
                    <p>
                        <span className="font-semibold">Apartment Number:</span> {profile.apartmentNumber}
                    </p>
                    <p>
                        <span className="font-semibold">Monthly Rent:</span> ${profile.monthlyRent}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MemberProfile;

