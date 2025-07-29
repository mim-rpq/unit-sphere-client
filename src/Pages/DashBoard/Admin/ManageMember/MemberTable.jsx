import React from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { MdDeleteForever } from 'react-icons/md';

const MemberTable = ({ members, refetch }) => {
    const axiosSecure = useAxiosSecure();

    const handleRemoveMember = async (id) => {
        try {
            const res = await axiosSecure.patch(`/users/remove-member/${id}`);
            if (res.data.modifiedCount > 0) {
                Swal.fire('Removed!', 'The member has been downgraded to user.', 'success');
                refetch();
            }
        } catch (err) {
            console.log(err);
            Swal.fire('Error', 'Could not remove member role.', 'error');
        }
    };

    return (
        <div className='mt-12'>
            <div>
                <h3 className="text-2xl font-semibold mb-1 text-secondary">Manage All Members</h3>
                <p className="text-sm text-gray-300 mb-4">
                    Remove or update members roles as needed.
                </p>
            </div>
            {members.length === 0 ? (
                <p>No members found.</p>
            ) : (
                <table className="table-auto w-full border text-secondary border-secondary">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th className="border border-secondary p-2">#</th>
                            <th className="border border-secondary p-2">Name</th>
                            <th className="border border-secondary p-2">Email</th>
                            <th className="border border-secondary p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member, index) => (
                            <tr key={member._id}>
                                <td className="border border-secondary text-white p-2 text-center">{index + 1}</td>
                                <td className="border border-secondary  text-white p-2">{member.name}</td>
                                <td className="border border-secondary  text-white p-2">{member.email}</td>
                                <td className="border border-secondary  text-white p-2 text-center">
                                    <button
                                        onClick={() => handleRemoveMember(member._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white p-1 rounded"
                                    >
                                        <MdDeleteForever className='text-2xl' />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MemberTable;