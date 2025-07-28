
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const PaymentForm = ({ agreement, month }) => {
    console.log(agreement);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();

    const [couponCode, setCouponCode] = useState('');
    const [discountInfo, setDiscountInfo] = useState(null);
    const [error, setError] = useState('');
    const [rent, setRent] = useState(agreement.monthlyRent);
    const [applying, setApplying] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCouponApply = async () => {
        if (!couponCode) return;

        setApplying(true);
        try {
            const res = await axiosSecure.post('/validate-coupon', {
                code: couponCode,
                originalAmount: agreement.monthlyRent,
            });

            if (res.data.valid) {
                setDiscountInfo(res.data);
                setRent(res.data.finalAmount);
                setError('');
            } else {
                setError(res.data.message || 'Invalid coupon');
                setDiscountInfo(null);
                setRent(agreement.monthlyRent);
            }
        } catch (err) {
            setError('Server error while applying coupon');
            console.log(err);
        } finally {
            setApplying(false);
        }
    };

    const rentInCents = rent * 100;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        setLoading(true);
        setError('');

        const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
            billing_details: {
                name: agreement.fullName || 'Unknown User',
                email: agreement.emailAddress,
            },
        });

        if (stripeError) {
            setError(stripeError.message);
            setLoading(false);
            return;
        }

        try {
            const res = await axiosSecure.post('/create-payment-intent', {
                rentInCents,
                apartmentId: agreement.apartmentId,
            });

            const clientSecret = res.data.clientSecret;

            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (confirmError) {
                Swal.fire({
                    icon: 'error',
                    title: 'Payment Failed',
                    text: confirmError.message || 'Something went wrong. Please try again.',
                    confirmButtonColor: '#d33',
                });
                setLoading(false);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                // console.log(' Payment succeeded:', paymentIntent);
                const paymentData = {
                    fullName:agreement.fullName,
                    userEmail: agreement.emailAddress,
                    floor: agreement.floorNumber,
                    block: agreement.blockName,
                    apartmentNumber: agreement.apartmentNumber,
                    month,
                    rentAmount: rent,
                    couponCode: couponCode || null,
                    transactionId: paymentIntent.id,
                    paymentDate: new Date(),
                };

                await axiosSecure.post('/payments', paymentData);

                Swal.fire({
                    icon: 'success',
                    title: 'Payment Successful!',
                    text: `Transaction ID: ${paymentIntent.id}`,
                    confirmButtonColor: '#3085d6',
                });
            }
        } catch (err) {
            console.error('Payment intent creation failed:', err);
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Failed to create payment. Please try again later.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="m-7 max-w-3xl bg-white p-6 rounded-xl shadow-md mt-10">
            <h2 className="text-3xl font-bold text-center mb-6 text-primary">Complete Payment</h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <input type="text" value={agreement.emailAddress} readOnly className="input input-bordered w-full" />
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" value={agreement.floorNumber} readOnly className="input input-bordered w-full" />
                    <input type="text" value={agreement.blockName} readOnly className="input input-bordered w-full" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" value={agreement.apartmentNumber} readOnly className="input input-bordered w-full" />
                    <input type="text" value={month} readOnly className="input input-bordered w-full" />
                </div>

                <input type="text" value={rent} readOnly className="input input-bordered w-full font-bold" />

                <div>
                    <label className="font-semibold">Apply Coupon</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <button
                            type="button"
                            onClick={handleCouponApply}
                            disabled={applying}
                            className="btn btn-secondary"
                        >
                            {applying ? 'Applying...' : 'Apply'}
                        </button>
                    </div>
                    {discountInfo && (
                        <p className="text-green-600 mt-2">
                             Coupon applied: {discountInfo.discountPercent}% off. You save ${discountInfo.discountAmount.toFixed(2)}!
                        </p>
                    )}
                </div>

                <div>
                    <label className="font-semibold block mb-2">Card Details</label>
                    <div className="border p-4 rounded-md">
                        <CardElement />
                    </div>
                </div>

                <button type="submit" disabled={!stripe || loading} className="btn btn-primary w-full mt-4">
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="loading loading-spinner loading-sm"></span> Processing...
                        </span>
                    ) : (
                        <>Pay Now ${rent}</>
                    )}
                </button>

                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default PaymentForm;
