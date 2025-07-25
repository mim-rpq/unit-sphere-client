
import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { AuthContext } from '../Provider/AuthContext';
import Swal from 'sweetalert2';
import useRole from '../hooks/useRole';

const ApartmentCard = ({ apartment }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosInstance = useAxiosPublic();
      const { role } = useRole();

    const handleAgreement = async () => {
        if (!user) {
            navigate('/auth/login');
            return;
        }

        const agreementData = {
            userName: user.displayName,
            userEmail: user.email,
            floorNo: apartment.floorNo,
            blockName: apartment.blockName,
            apartmentNo: apartment.apartmentNo,
            rent: apartment.rent,
            status: 'pending',
            requestedDate: new Date().toISOString(),
        };

        try {
            const res = await axiosInstance.post('/agreements', agreementData);
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Agreement submitted successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (err) {
            console.error('Agreement Error:', err);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "You have already applied for an apartment.",
                showConfirmButton: false,
                timer: 1500
            });
        }

    };

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <img
                src={apartment.image}
                alt="Apartment"
                className="w-full h-52 object-cover"
            />
            <div className="p-5 space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-white bg-indigo-500 px-3 py-1 rounded-full">
                        Block {apartment.blockName}
                    </span>
                    <span className="text-sm font-semibold text-gray-500">
                        Floor {apartment.floorNo}
                    </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-800">
                    Apt. No: {apartment.apartmentNo}
                </h3>

                <p className="text-lg  font-bold">
                    Rent:
                    <span className='text-green-600'>${apartment.rent}</span>
                </p>

                <button
                    onClick={handleAgreement}
                    disabled={role === "admin"}
                    className={`w-full py-2 rounded-lg font-semibold transition duration-200 ${role === "admin"
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                        }`}
                >
                    Request Agreement
                </button>

            </div>
        </div>
    );
};

export default ApartmentCard;
