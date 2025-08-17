
import React from "react";
import {
    FaParking,
    FaShieldAlt,
    FaWifi,
    FaSwimmer,
    FaDumbbell,
    FaTree,
    FaRecycle,
    FaBuilding,
    FaBolt,
} from "react-icons/fa";
import parkingImg from "../../assets/images/parking.jpg";

import securityImg from "../../assets/images/security.jpg";
import wifiImg from "../../assets/images/wifi.jpg";
import poolImg from "../../assets/images/pool.jpg";
import gymImg from "../../assets/images/gym2.jpg";
import gardenImg from "../../assets/images/garden.jpg";
import recycleImg from "../../assets/images/recycle.jpg";
import hallImg from "../../assets/images/hall.jpg";
// import powerImg from "../../assets/images/power.jpg";

const amenitiesList = [
    { icon: <FaParking className="text-3xl text-primary" />, title: "Parking", img: parkingImg },
    { icon: <FaShieldAlt className="text-3xl text-primary" />, title: "24/7 Security", img: securityImg },
    { icon: <FaWifi className="text-3xl text-primary" />, title: "High-Speed Internet", img: wifiImg },
    { icon: <FaSwimmer className="text-3xl text-primary" />, title: "Swimming Pool", img: poolImg },
    { icon: <FaDumbbell className="text-3xl text-primary" />, title: "Gym & Fitness", img: gymImg },
    { icon: <FaTree className="text-3xl text-primary" />, title: "Rooftop Garden", img: gardenImg },
    { icon: <FaRecycle className="text-3xl text-primary" />, title: "Waste Management", img: recycleImg },
    { icon: <FaBuilding className="text-3xl text-primary" />, title: "Community Hall", img: hallImg }
];

const Amenities = () => {
    return (
        <div className="py-16 bg-base-200 mt-24">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12 text-primary">
                    Amenities & Facilities
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
                    {amenitiesList.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-2xl hover:shadow-2xl transition transform hover:-translate-y-2"
                        >
                            {/* Image Box */}
                            <div className="w-full h-32 mb-4 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-md">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-full object-cover transform transition duration-300 hover:scale-110"
                                />
                            </div>

                            {/* Icon */}
                            <div className="text-4xl text-primary mb-2">{item.icon}</div>

                            {/* Title */}
                            <h3 className="mt-2 text-xl font-semibold text-gray-700">
                                {item.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Amenities;
