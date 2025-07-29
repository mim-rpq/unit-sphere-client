import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../Shared/Spinner";
import { FiSpeaker } from "react-icons/fi";

const MakeAnnouncement = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
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
        <div className="mt-10  m-5 p-6">
            <div className="mb-6 text-base-200">
                <h3 className="text-2xl font-semibold text-secondary flex items-center gap-2">
                    <FiSpeaker className="text-secondary text-3xl" />
                    Post New Announcement
                </h3>
                <p className="text-sm text-gray-300 mt-1">
                    Share important updates or notices with all users. Your announcement will be visible to everyone.
                </p>
            </div>
            <div className="border-l-4 border-2 border-secondary border-r-0 max-w-3xl  p-6   bg-gradient-to-r from-bg-base-100 to-primary  text-base-200  rounded-xl shadow-md">
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
                        className="bg-gradient-to-r from-secondary to-primary  text-white px-5 py-2 rounded hover:bg-secondary"
                    >
                        Post Announcement
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MakeAnnouncement;
