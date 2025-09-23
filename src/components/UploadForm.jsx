import { useContext, useRef, useState } from "react";
import Axios from "../config/Axois";
import { UserContext } from "../context/user.context";
import { CgClose } from "react-icons/cg";
import Cropper from "react-cropper";
import "react-cropper/node_modules/cropperjs/dist/cropper.css";
import { toast } from "react-toastify";

const UploadForm = ({ email, fn }) => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const cropperRef = useRef(null);
  const { setUser } = useContext(UserContext);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    if (selected) {
      const reader = new FileReader();
      reader.onload = () => setImageUrl(reader.result);
      reader.readAsDataURL(selected);
    }
  };

  const generatePreview = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const canvas = cropper.getCroppedCanvas();
      if (canvas) {
        setPreviewUrl(canvas.toDataURL("image/png"));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cropper = cropperRef.current?.cropper;
    if (!file || !cropper) return;

    cropper.getCroppedCanvas().toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("profilepic", blob, file.name);
      formData.append("email", email);

      try {
        const res = await Axios.post("/users/picture-upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

        fn(false);
        setUser(res.data.cleanedUser);
        toast.success("📸 Added successfully.");
      } catch (err) {
        toast.error("❌ Sommething went wrong!");
      }
    });
  };

  return (
    <div className="picModal w-full h-screen backdrop-blur-2xl bg-black/30 z-50 px-4 fixed top-0 left-0 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col relative w-[90%] lg:w-[40%] rounded-xl bg-white shadow-[0px_8px_40px_rgba(0,0,0,0.25)] px-6 py-10 gap-y-6 transition-all duration-300"
      >
        {/* Close Button */}
        <CgClose
          onClick={() => fn(false)}
          className="absolute top-4 right-4 text-3xl text-gray-700 cursor-pointer hover:rotate-90 transition-transform duration-300"
        />

        {/* File Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="bg-gray-100 px-4 py-3 rounded-lg text-lg text-gray-800 w-full cursor-pointer 
                 file:cursor-pointer file:border-none file:px-3 file:py-2 file:rounded-md 
                 file:bg-sky-500 file:text-white hover:file:bg-sky-600 transition-all"
        />

        {/* Cropper */}
        {imageUrl && (
          <div className="w-full mt-4">
            <Cropper
              src={imageUrl}
              style={{ height: 300, width: "100%" }}
              aspectRatio={1}
              viewMode={1}
              autoCropArea={1}
              background={false}
              responsive={true}
              guides={false}
              ref={cropperRef}
              cropend={generatePreview}
            />
          </div>
        )}

        {/* Preview */}
        {previewUrl && (
          <div className="w-32 h-32 border-4 border-sky-500 overflow-hidden rounded-full mt-4 shadow-md mx-auto">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Upload Button */}
        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-600 text-white font-medium text-lg px-10 py-3 rounded-lg mt-4 transition-all duration-300 hover:scale-105"
        >
          Upload
        </button>
      </form>
    </div>

  );
};

export default UploadForm;
