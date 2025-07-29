
import React from 'react';
import {
    FaBuilding,
    FaUsers,
    FaUserFriends,
    FaCheckCircle,
    FaChartBar,
} from 'react-icons/fa';

const iconMap = {
    total: <FaBuilding className="text-indigo-500 text-3xl" />,
    available: <FaCheckCircle className="text-green-500 text-3xl" />,
    unavailable: <FaChartBar className="text-red-500 text-3xl" />,
    users: <FaUsers className="text-sky-500 text-3xl" />,
    members: <FaUserFriends className="text-purple-500 text-3xl" />,
};

const StatCard = ({ title, value, type = 'total' }) => {
    return (
        <div className=" bg-transparent text-white border-r-4 border-l-0 border-[#BD00DD] rounded-xl shadow-md p-5 border hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h3 className=" text-center font-medium">{title}</h3>
                    <p className="text-4xl font-bold text-center">{value}</p>
                </div>
                <div className="p-2 bg-white border-secondary border-2  rounded-full">
                    {iconMap[type]}
                </div>
            </div>

        </div>
    );
};

export default StatCard;

