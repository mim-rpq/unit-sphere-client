import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../Provider/AuthContext';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Spinner from '../../../Shared/Spinner';


const MakePaymentForm = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: agreement, isLoading, isError } = useQuery({
        queryKey: ['myAgreement'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/agreements/my`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        navigate('/dashboard/payment-page', {
            state: {
                agreement,
                month: data.month,
            },
        });
    };

    if (isLoading) return <Spinner />;
    if (isError) return <p className="text-red-500 text-center">Failed to load agreement data</p>;

    return (
        <div className="m-7 max-w-3xl bg-white p-6 rounded-xl shadow-md mt-10">
            <h2 className="text-3xl font-bold text-center mb-6 text-primary">Make Payment</h2>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="font-semibold">Member Email</label>
                    <input
                        type="text"
                        value={agreement.emailAddress}
                        readOnly
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="font-semibold">Floor</label>
                    <input
                        type="text"
                        value={agreement.floorNumber}
                        readOnly
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="font-semibold">Block Name</label>
                    <input
                        type="text"
                        value={agreement.blockName}
                        readOnly
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="font-semibold">Apartment No</label>
                    <input
                        type="text"
                        value={agreement.apartmentNumber}
                        readOnly
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="font-semibold">Rent</label>
                    <input
                        type="text"
                        value={agreement.monthlyRent}
                        readOnly
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <label className="font-semibold">Month</label>
                    <input
                        type="month"
                        {...register('month', { required: true })}
                        className="input input-bordered w-full"
                    />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                    Pay Now
                </button>
            </form>
        </div>
    );
};

export default MakePaymentForm;
