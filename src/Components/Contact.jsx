import React from 'react';
import { useForm } from 'react-hook-form';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Contact = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post('/contact', data);
      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: `Your request has been submitted.`,
          timer: 4000,
          showConfirmButton: true,
        });
        reset();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please try again.',
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again.',
      });
    }
  };

  return (
    <div className=''>
      <div className="py-11 max-w-7xl mx-auto">
        <div className="max-w-2xl px-6">


          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
            <h2 className="text-3xl font-bold text-center mb-5 text-black">Contact Us</h2>
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className={`w-full p-3 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" }
                })}
                className={`w-full p-3 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea
                {...register("message", { required: "Message is required" })}
                rows="5"
                className={`w-full p-3 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold p-3 rounded-lg hover:bg-secondary transition"
            >
              Send Message
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
