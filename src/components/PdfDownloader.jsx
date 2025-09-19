import React from 'react'
import Axios from "../config/Axois"
import { toast } from 'react-toastify';
const PdfDownloader = (id) => {
    const handleDownload = async () => {
      try {
        const response = await Axios.post("/pdf/generatePdf", id, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "blood-request.pdf";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("📫 Downloaded successfully!")
    } catch(err){
      toast.error("❌ Something went wrong!")
    }
    };
  return (
    <button
      onClick={handleDownload}
      className="w-full py-2 font-Roboto uppercase text-xl font-semibold rounded bg-[#2cb2ab] cursor-pointer hover:bg-[#2cb2ab]/70 transition-all duration-200">
      Document
    </button>
  );
}

export default PdfDownloader