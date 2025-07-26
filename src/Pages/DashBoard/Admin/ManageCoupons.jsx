import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import Spinner from "../../Shared/Spinner";

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: coupons = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: () => 
      axiosSecure.get("/coupons").then(res => res.data)
  });

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const couponData = {
      ...data,
      discount: Number(data.discount),
      available: true,
    };
    axiosSecure.post("/coupons", couponData)
      .then(res => {
        if (res.data.insertedId) {
          toast.success("Coupon added successfully!");
          refetch();
          reset();
          setIsModalOpen(false);
        } else {
          toast.error("Failed to add coupon.");
        }
      })
      .catch(() => {
        toast.error("Error adding coupon.");
      });
  };

  // Update availability
  const toggleAvailability = (id, currentStatus) => {
    axiosSecure.patch(`/coupons/${id}`, { available: !currentStatus })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          toast.success("Coupon availability updated");
          refetch();
        } else {
          toast.error("Failed to update availability");
        }
      })
      .catch(() => {
        toast.error("Error updating availability");
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/coupons/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "The coupon has been deleted.", "success");
            } else {
              Swal.fire("Failed!", "Failed to delete the coupon.", "error");
            }
          })
          .catch(() => {
            Swal.fire("Failed!", "Error deleting the coupon.", "error");
          });
      }
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Coupons</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-secondary transition"
        >
          + Add Coupon
        </button>
      </div>

      {coupons.length === 0 ? (
        <div className="h-full flex justify-center items-center">
          <h1>No Coupons available. Add a coupon.</h1>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border">
          <table className="min-w-full bg-white">
            <thead className="bg-blue-50 text-gray-700">
              <tr>
                <th className="p-3 text-left">Code</th>
                <th className="p-3 text-left">Discount (%)</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Available</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon._id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-bold">{coupon.code}</td>
                  <td className="p-3 text-red-500">{coupon.discount}%</td>
                  <td className="p-3">{coupon.description}</td>
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={coupon.available}
                      onChange={() => toggleAvailability(coupon._id, coupon.available)}
                      className="cursor-pointer w-5 h-5"
                      title={coupon.available ? "Mark unavailable" : "Mark available"}
                    />
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(coupon._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete Coupon"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[95%] max-w-md relative">
            <h3 className="text-xl font-semibold mb-4 text-center text-primary">Add New Coupon</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Coupon Code</label>
                <input
                  {...register("code", { required: true })}
                  placeholder="E.g. SUMMER20"
                  className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Discount (%)</label>
                <input
                  type="number"
                  {...register("discount", { required: true, min: 1, max: 100 })}
                  placeholder="E.g. 15"
                  className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  {...register("description")}
                  placeholder="Optional description"
                  className="w-full border px-3 py-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
