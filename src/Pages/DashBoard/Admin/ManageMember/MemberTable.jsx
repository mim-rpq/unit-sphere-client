import React from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

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
        <div>
            <h3 className="text-xl font-semibold mb-4">Manage All Members</h3>
            {members.length === 0 ? (
                <p>No members found.</p>
            ) : (
                <table className="table-auto w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border p-2">#</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map((member, index) => (
                            <tr key={member._id}>
                                <td className="border p-2 text-center">{index + 1}</td>
                                <td className="border p-2">{member.name}</td>
                                <td className="border p-2">{member.email}</td>
                                <td className="border p-2 text-center">
                                    <button
                                        onClick={() => handleRemoveMember(member._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Remove
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