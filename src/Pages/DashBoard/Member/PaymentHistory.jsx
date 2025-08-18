import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../Shared/Spinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading, isError, error } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments');
            return res.data;
        },
    });

    console.log(payments);

    if (isLoading) return <Spinner />;
    if (isError) return <div>Error loading payments: {error.message}</div>;

    return (
        <div className="lg:max-w-7xl m-6 p-4  rounded-md shadow-md mt-8 bg-transparent">
            <h2 className="text-2xl font-semibold mb-6 text-center text-white">Payment History</h2>
            {payments.length === 0 ? (
                <p className="text-center text-white">No payment history found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] table-auto border-collapse border border-secondary">
                        <thead>
                            <tr className="bg-primary text-center">
                                <th className="border text-white  border-gray-300 px-4 py-2">Your Email</th>
                                <th className="border text-white border-gray-300 px-4 py-2">Transaction ID</th>
                                <th className="border text-white border-gray-300 px-4 py-2">Month</th>
                                <th className="border text-white border-gray-300 px-4 py-2">Rent Amount</th>
                                <th className="border text-white border-gray-300 px-4 py-2">Coupon Code</th>
                                <th className="border text-white border-gray-300 px-4 py-2">Payment Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment._id} className="text-center hover:bg-gray-50">
                                    <td className="border text-white  border-gray-300 px-4 py-2">{payment.userEmail}</td>
                                    <td className="border text-white border-gray-300 px-4 py-2">{payment.transactionId}</td>
                                    <td className="border text-white border-gray-300 px-4 py-2">{payment.month}</td>
                                    <td className="border text-white border-gray-300 px-4 py-2">
                                        ${payment.rentAmount?.toFixed(2)}
                                    </td>
                                    <td className="border border-gray-300 text-white  px-4 py-2">{payment.couponCode || '-'}</td>
                                    <td className="border border-gray-300 text-white px-4 py-2">
                                        {new Date(payment.paymentDate).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;
