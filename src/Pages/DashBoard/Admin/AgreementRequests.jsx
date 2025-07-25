import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../Shared/Spinner";

const AgreementRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch requests
  useEffect(() => {
    axiosSecure.get("/agreements/pending")
      .then(res => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading requests:", err);
        setLoading(false);
      });
  }, [axiosSecure]);


  if (loading) return <Spinner />;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Pending Agreement Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-500 text-center">No pending requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-md">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold">User Name</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Email</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Floor</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Block</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Room No</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Rent</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Date</th>
                <th className="py-3 px-4 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, idx) => (
                <tr
                  key={req._id}
                  className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                >
                  <td className="py-3 px-4">{req.userName}</td>
                  <td className="py-3 px-4">{req.userEmail}</td>
                  <td className="py-3 px-4">{req.floorNo}</td>
                  <td className="py-3 px-4">{req.blockName}</td>
                  <td className="py-3 px-4">{req.apartmentNo}</td>
                  <td className="py-3 px-4 text-green-600 font-semibold">${req.rent}</td>
                  <td className="py-3 px-4">{new Date(req.requestedDate).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <button
                   
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm"
                    >
                      Accept
                    </button>
                    <button
                  
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm"
                    >
                      Reject
                    </button>
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

export default AgreementRequests;

