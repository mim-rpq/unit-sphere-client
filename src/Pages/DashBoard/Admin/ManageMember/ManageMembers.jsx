
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const ManageMembers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    if (isLoading) return <p>Loading members...</p>;
    if (isError) return <p>Failed to load members.</p>;

    //  Filter only members
    const members = users.filter(user => user.role === 'member');

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

            {members.length === 0 ? (
                <p>No members found.</p>
            ) : (
                <ManageMembers members={members} refetch={refetch} />
            )}
        </div>
    );
};

export default ManageMembers;



