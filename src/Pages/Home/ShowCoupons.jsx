import React from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Shared/Spinner";

import CouponCard from "./CouponCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const ShowCoupons = () => {
    const axiosPublic = useAxiosPublic();

    const {data: coupons = [],isLoading,isError,} = useQuery({
        queryKey: ["coupons"],
        queryFn: async () => {
            const res = await axiosPublic.get("/coupons/available");
            return res.data;
        },
    });

    if (isLoading)
        return <Spinner></Spinner>;

    if (isError)
        return <p className="text-center text-red-600 font-semibold py-10">Failed to load coupons.</p>;

    return (
        <div className=" max-w-7xl mx-auto bg-base-200/70 py-12 px-4 md:px-8 rounded-lg">
            <h2 className="text-3xl font-bold text-center  mb-8 drop-shadow">
                 Grab Your Discount Coupons
            </h2>

            {coupons.length === 0 ? (
                <p className="text-center  text-lg">No coupons available at the moment.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {coupons.map((coupon) => (
                        <CouponCard key={coupon._id} coupon={coupon} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShowCoupons;
