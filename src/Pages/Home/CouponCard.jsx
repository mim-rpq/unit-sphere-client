import React from "react";
import { FaTag } from "react-icons/fa";

const CouponCard = ({ coupon }) => {
    return (
        <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-300 bg-white">
            <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                    <FaTag className="text-pink-600" size={18} />
                    <h2 className="text-xl font-bold text-gray-800">{coupon.code}</h2>
                </div>
                <p className="text-sm text-gray-600 mb-2">{coupon.description || "No description provided."}</p>
                <span className="inline-block px-3 py-1 text-sm font-semibold bg-pink-100 text-pink-600 rounded-full">
                    {coupon.discount}% OFF
                </span>
            </div>
            <div className="absolute top-0 right-0 bg-pink-500 text-white px-3 py-1 text-xs font-semibold rounded-bl-xl">
                COUPON
            </div>
        </div>
    );
};

export default CouponCard;
