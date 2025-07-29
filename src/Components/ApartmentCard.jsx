
import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
import Swal from 'sweetalert2';
import useRole from '../hooks/useRole';
import useAxiosSecure from '../hooks/useAxiosSecure';

const ApartmentCard = ({ apartment }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { role } = useRole();

    const handleAgreement = async () => {
        if (!user) {
            navigate('/auth/login');
            return;
        }

        const agreementData = {
            userName: user.displayName,
            photo: user.photoURL,
            userEmail: user.email,
            agreementId:apartment._id,
            floorNo: apartment.floorNo,
            blockName: apartment.blockName,
            apartmentNo: apartment.apartmentNo,
            rent: apartment.rent,
            status: 'pending',
            availability: apartment.availability,
            requestedDate: new Date().toISOString(),
        };

        // console.log(user.photoURL);

        try {
            const res = await axiosSecure.post('/agreements', agreementData);
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

                    <p className="text-md font-semibold">

                        <span
                            className={`text-white text-sm rounded-full  px-3 py-1 ml-1 
        ${apartment.availability === 'available' ? 'bg-green-500' : 'bg-red-500'}`}>
                            {apartment.availability}
                        </span>
                    </p>

                </div>



                <span className="text-sm font-semibold text-gray-500">
                    Floor {apartment.floorNo}
                </span>

                <div className='flex justify-between'>
                    <h3 className="text-xl font-semibold text-gray-800">
                        Apt. No: {apartment.apartmentNo}
                    </h3>
                    <p className="text-lg font-bold">
                        Rent:
                        <span className='text-green-600'>${apartment.rent}</span>
                    </p>
                </div>



                <button
                    onClick={handleAgreement}
                    disabled={role === "admin" || apartment.availability !== "available"}
                    className={`w-full py-2 rounded-lg font-semibold transition duration-200 ${role === "admin" || apartment.availability !== "available"
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                        }`}
                >
                    {role === "admin" ? "You can't send request" : (apartment.availability !== "available" ? "Unavailable" : "Request Agreement")}
                </button>


            </div>
        </div>
    );
};

export default ApartmentCard;
