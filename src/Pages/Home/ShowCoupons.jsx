import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CouponCard from "../../components/CouponCard";
import Spinner from "../Shared/Spinner";

const ShowCoupons = () => {
    const axiosSecure = useAxiosSecure();

    const {data: coupons = [],isLoading,isError,} = useQuery({
        queryKey: ["coupons"],
        queryFn: async () => {
            const res = await axiosSecure.get("/coupons");
            return res.data;
        },
    });

    if (isLoading)
        return <Spinner></Spinner>;

    if (isError)
        return <p className="text-center text-red-600 font-semibold py-10">Failed to load coupons.</p>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 py-10 px-4 md:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 drop-shadow">
                 Grab Your Discount Coupons
            </h2>

            {coupons.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No coupons available at the moment.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {coupons.map((coupon) => (
                        <CouponCard key={coupon._id} coupon={coupon} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShowCoupons;
