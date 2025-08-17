import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";



const NewsletterSubscribe = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/subscribe", { email: data.email });
      if (res.data.insertedId) {
        Swal.fire("Subscribed!", "You will get our latest updates!", "success");
        reset();
      }
    } catch (error) {
      Swal.fire("Oops!", "Something went wrong. Try again!", "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-0"
    >
      <input
        type="email"
        {...register("email", { required: true })}
        placeholder="Enter your email"
        className="px-4 py-2 rounded-lg  rounded-r-none bg-gray-800 focus:outline-none w-44"
      />
      <button
        type="submit"
        className="px-5 py-2  rounded-l-none bg-primary text-white rounded-lg hover:bg-secondary transition"
      >
        Subscribe
      </button>
    </form>
  );
};

export default NewsletterSubscribe;
