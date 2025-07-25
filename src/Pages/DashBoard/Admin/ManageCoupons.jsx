
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: coupons = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/coupons", data);
      if (res.data.insertedId) {
        toast.success("Coupon added successfully!");
        refetch();
        reset();
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add coupon.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Coupons</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Coupon
        </button>
      </div>

      {isLoading ? (
        <p>Loading coupons...</p>
      ) : coupons.length === 0 ? (
        <p>No coupons found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Code</th>
                <th className="p-3 border">Discount (%)</th>
                <th className="p-3 border">Description</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{coupon.code}</td>
                  <td className="p-3 border">{coupon.discount}</td>
                  <td className="p-3 border">{coupon.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
            <h3 className="text-xl font-semibold mb-4">Add New Coupon</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                {...register("code", { required: true })}
                placeholder="Coupon Code"
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                {...register("discount", { required: true, min: 1, max: 100 })}
                placeholder="Discount (%)"
                className="w-full border p-2 rounded"
              />
              <input
                {...register("description")}
                placeholder="Description"
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
