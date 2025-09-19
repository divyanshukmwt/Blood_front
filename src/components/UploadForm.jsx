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
    <div className="picModal w-full h-screen backdrop-blur-3xl z-50 px-4 fixed top-0 left-0">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col absolute w-[90%] lg:w-[40%] rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-y-4 bg-zinc-700/70 shadow-[0px_10px_100px_rgba(255,255,255,0.5)] px-4 py-12">
        <CgClose
          onClick={() => fn(false)}
          className="absolute top-5 right-5 text-2xl cursor-pointer"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="bg-gray-800 px-2 py-4 text-xl w-[90%]"
        />
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
        {previewUrl && (
          <div className="w-32 h-32 border-2 border-white overflow-hidden rounded-full mt-2">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <button type="submit" className="bg-sky-500 px-20 py-3 rounded-sm">
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
