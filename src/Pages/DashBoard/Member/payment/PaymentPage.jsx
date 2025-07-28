
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';
import { useLocation } from 'react-router';

const stripePromise = loadStripe(import.meta.env.VITE_payment_key)
const PaymentPage = () => {
    const location = useLocation();
    const { agreement, month } = location.state || {};
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm agreement={agreement} month={month}></PaymentForm>
        </Elements>
    )
};

export default PaymentPage;
