import { useContext, useState } from "react";
import Axios from "../config/Axois"
import { AdminContext } from "../context/admin.context";
import { CgClose } from "react-icons/cg";
import { toast } from "react-toastify";

const AdminProfilePic = ({ email, fn }) => {
  const [file, setFile] = useState(null);
  const { setAdmin } = useContext(AdminContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("profilepic", file);
    formData.append("email", email);
    try {
      const res = await Axios.post("/admin/adminPic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      fn(false);
      setAdmin(res.data.Useradmin);
      toast.success("📸 Uploading successfully!")
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong! Please try again later.")
    }
  };

  return (
    <div className="picModal w-full h-screen backdrop-blur-3xl z-50 px-4 fixed top-0 left-0">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col absolute w-[90%] lg:w-[40%] rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-y-5 bg-linear-to-b from-transparent to-[#67007ee8] shadow-[0px_10px_100px_rgba(255,255,255,0.5)] px-4 py-20">
        <CgClose
          onClick={() => fn(false)}
          className="absolute top-5 right-5 text-2xl"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="bg-gray-800 px-2 py-4 text-xl w-[90%]"
        />
        <button type="submit" className="bg-sky-500 px-20 py-3 rounded-sm">
          Upload
        </button>
      </form>
    </div>
  );
};

export default AdminProfilePic;
