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
        <div className="lg:max-w-7xl m-6 p-4 bg-white rounded-md shadow-md mt-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">Payment History</h2>
            {payments.length === 0 ? (
                <p className="text-center text-gray-500">No payment history found.</p>
            ) : (
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100 text-center">
                            <th className="border border-gray-300 px-4 py-2">Your Email</th>


                            <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
                            <th className="border border-gray-300 px-4 py-2">Month</th>

                            <th className="border border-gray-300 px-4 py-2">Rent Amount</th>
                            <th className="border border-gray-300 px-4 py-2">Coupon Code</th>
                            <th className="border border-gray-300 px-4 py-2">Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment) => (
                            <tr key={payment._id} className="text-center hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{payment.userEmail}</td>
                                <td className="border border-gray-300 px-4 py-2">{payment.transactionId}</td>
                                <td className="border border-gray-300 px-4 py-2">{payment.month}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    ${payment.rentAmount?.toFixed(2)}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{payment.couponCode || '-'}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {new Date(payment.paymentDate).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PaymentHistory;
