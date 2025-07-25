import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../Shared/Spinner";

const MakeAnnouncement = () => {
    const { 
        register, 
        handleSubmit, 
        reset, 
        formState: { errors } // <-- get errors from RHF
    } = useForm();
    const { userLoading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        try {
            const res = await axiosSecure.post("/announcements", data);

            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Announcement Posted!",
                    text: "Your announcement has been successfully created.",
                });
                reset();
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Failed to Post",
                text: "There was an error creating the announcement.",
            });
        }
    };

    if (userLoading) return <Spinner />;

    return (
        <div className=" max-w-3xl m-5  mt-10 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4"> Make Announcement</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Title</label>
                    <input
                        type="text"
                        {...register("title", { required: "Title is required" })}
                        className={`w-full border rounded px-3 py-2 
                            ${errors.title ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Enter announcement title"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                    )}
                </div>
                <div>
                    <label className="block font-medium mb-1">Description</label>
                    <textarea
                        rows="4"
                        {...register("description", { required: "Description is required" })}
                        className={`w-full border rounded px-3 py-2 
                            ${errors.description ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Write the announcement details"
                    ></textarea>
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-primary text-white px-5 py-2 rounded hover:bg-secondary"
                >
                    Post Announcement
                </button>
            </form>
        </div>
    );
};

export default MakeAnnouncement;
