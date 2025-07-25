
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import MemberTable from './MemberTable';

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

    console.log(members);

    return (
        <div className="p-4 ">
            {members.length === 0 ? (
                <p>No members found.</p>
            ) : <>
            
            <div className='lg:max-w-5xl mx-auto'>
                <MemberTable members={members} refetch={refetch} ></MemberTable>
            </div>
            </>}
        </div>
    );
};

export default ManageMembers;



