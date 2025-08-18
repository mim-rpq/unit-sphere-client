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

  const handleAccept = (id, email) => {
    axiosSecure.patch(`/agreements/accept/${id}?email=${email}`)
      .then(res => {
        if (res.data.success) {
          setRequests(prev => prev.filter(req => req._id !== id));
          Swal.fire("Accepted", "User is now a member.", "success");
        } else {
          Swal.fire("Error", res.data.message || "Failed to accept request", "error");
        }
      })
      .catch(err => {
        console.error(err);
        Swal.fire("Error", "Failed to accept request", "error");
      });
  };

  const handleReject = (id) => {
    axiosSecure.patch(`/agreements/reject/${id}`)
      .then(() => {
        setRequests(prev => prev.filter(req => req._id !== id));
        Swal.fire("Rejected", "Request has been rejected.", "info");
      })
      .catch(err => {
        console.error(err);
        Swal.fire("Error", "Failed to reject request", "error");
      });
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-6 text-secondary ">
      <div className="text-center lg:text-left space-y-2">
        <h2 className=" text-2xl md:text-3xl font-bold text-secondary  mb-1">Pending Agreement Requests</h2>
        <p className="text-gray-200 text-sm md:text-md mb-4">
          Review all pending apartment agreement requests submitted by users.  <br />  Accept or reject requestsbased on eligibility and availability.
        </p>
      </div>

      {requests.length === 0 ? (
        <p className="text-base-200 text-center">No pending requests found.</p>
      ) : (
        <div className="overflow-x-auto mt-9">
          <table className="min-w-full  border border-secondary rounded-xl shadow-md">
            <thead className="bg-primary text-base-200">
              <tr>
                <th className="py-3 text-white    px-4 text-left text-sm font-semibold">User Name</th>
                <th className="py-3 text-white px-4 text-left text-sm font-semibold">Email</th>
                <th className="py-3 text-white px-4 text-left text-sm font-semibold">Floor</th>
                <th className="py-3 text-white px-4 text-left text-sm font-semibold">Block</th>
                <th className="py-3 text-white px-4 text-left text-sm font-semibold">Room No</th>
                <th className="py-3 text-white px-4 text-left text-sm font-semibold">Rent</th>
                <th className="py-3 text-white px-4 text-left text-sm font-semibold">Date</th>
                <th className="py-3 text-white px-4 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, idx) => (
                <tr
                  key={req._id}
                  className={`${idx % 2 === 0 ? "" : ""} hover:bg-secondary`}
                >
                  <td className="py-3 text-white  px-4">{req.userName}</td>
                  <td className="py-3 text-white  px-4">{req.userEmail}</td>
                  <td className="py-3 text-white  px-4">{req.floorNo}</td>
                  <td className="py-3 text-white  px-4">{req.blockName}</td>
                  <td className="py-3 text-white  px-4">{req.apartmentNo}</td>
                  <td className="py-3   px-4 text-green-600 font-semibold">${req.rent}</td>
                  <td className="py-3 text-white  px-4">{new Date(req.requestedDate).toLocaleDateString()}</td>
                  <td className="py-3 text-white px-4 text-center space-y-2 lg:space-y-0 space-x-2">
                    <button
                      onClick={() => handleAccept(req._id, req.userEmail)}
                      className="bg-gradient-to-r from-secondary to-primary border  cursor-pointer   text-base-200 px-3 py-1 rounded-full text-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(req._id)}
                      className="bg-red-500 border hover:bg-red-600 text-base-200 cursor-pointer px-3 py-1 rounded-full text-sm"
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

