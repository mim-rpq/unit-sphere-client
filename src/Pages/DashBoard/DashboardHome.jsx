
import React, { useContext } from "react";
import { FaUserCircle, FaMoneyBillWave, FaBullhorn } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthContext";
import useRole from "../../hooks/useRole";
import Spinner from "../Shared/Spinner";

const DashboardHome = () => {
    const { user } = useContext(AuthContext);
    const { role, loading } = useRole();

    // Loading spinner
    if (loading || !role) {
        return <Spinner></Spinner>
    }

    return (
        <div className="p-6 m-7 lg:p-10 bg-gradient-to-br from-blue-50 to-white min-h-[80vh] rounded-lg shadow-md">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-blue-700">Welcome to Your Dashboard</h2>
                <p className="text-lg mt-2 text-gray-600">
                    Hello, <span className="font-semibold text-blue-500">{user?.displayName || "User"}</span>
                </p>
                <p className="text-sm mt-1 text-gray-500">
                    Manage your profile, payments, and announcements all in one place.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {/* User Role */}
                {role === "user" && (
                    <>
                        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                            <FaUserCircle className="text-blue-500 text-3xl mb-4" />
                            <h3 className="text-xl font-semibold mb-1">Your Profile</h3>
                            <p className="text-gray-600 text-sm mb-3">View or update your profile information and membership details.</p>
                            <a href="/dashboard/memberProfile" className="text-blue-600 hover:underline text-sm font-medium">
                                Go to Profile →
                            </a>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                            <FaBullhorn className="text-purple-500 text-3xl mb-4" />
                            <h3 className="text-xl font-semibold mb-1">Announcements</h3>
                            <p className="text-gray-600 text-sm mb-3">Stay up to date with building news, events, and admin notices.</p>
                            <a href="/dashboard/announcements" className="text-purple-600 hover:underline text-sm font-medium">
                                View Announcements →
                            </a>
                        </div>
                    </>
                )}

                {/* Member Role */}
                {role === "member" && (
                    <>
                        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                            <FaUserCircle className="text-blue-500 text-3xl mb-4" />
                            <h3 className="text-xl font-semibold mb-1">Your Profile</h3>
                            <p className="text-gray-600 text-sm mb-3">View or update your profile information and membership details.</p>
                            <a href="/dashboard/memberProfile" className="text-blue-600 hover:underline text-sm font-medium">
                                Go to Profile →
                            </a>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                            <FaBullhorn className="text-purple-500 text-3xl mb-4" />
                            <h3 className="text-xl font-semibold mb-1">Announcements</h3>
                            <p className="text-gray-600 text-sm mb-3">Stay up to date with building news, events, and admin notices.</p>
                            <a href="/dashboard/announcements" className="text-purple-600 hover:underline text-sm font-medium">
                                View Announcements →
                            </a>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                            <FaMoneyBillWave className="text-green-500 text-3xl mb-4" />
                            <h3 className="text-xl font-semibold mb-1">Make a Payment</h3>
                            <p className="text-gray-600 text-sm mb-3">Pay your monthly rent securely with optional coupon discounts.</p>
                            <a href="/dashboard/makePayment" className="text-green-600 hover:underline text-sm font-medium">
                                Pay Now →
                            </a>
                        </div>
                    </>
                )}

                {/* Admin Role */}
                {role === "admin" && (
                    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition col-span-full text-center">
                        <h3 className="text-2xl font-semibold text-blue-700 mb-2">Welcome Admin</h3>
                        <p className="text-gray-600">
                            Use the sidebar to manage members, review requests, create announcements, and handle coupons.
                        </p>
                    </div>
                )}
            </div>

            {/* Bottom text - visible for user/member only */}
            {role !== "admin" && (
                <div className="mt-9 text-center text-gray-700">
                    <p>
                        Or Use the sidebar to navigate your profile, make payments, check announcements, and more.
                    </p>
                </div>
            )}
        </div>
    );
};

export default DashboardHome;
