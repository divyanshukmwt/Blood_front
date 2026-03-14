import React from 'react';
import Axios from "../config/Axois";
import { toast } from 'react-toastify';

const PdfDownloader = ({ id, className, style }) => {
  const handleDownload = async () => {
    try {
      const response = await Axios.post("/pdf/generatePdf", { id }, { responseType: "blob" });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "blood-request.pdf";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("📄 Document downloaded!");
    } catch {
      toast.error("❌ Download failed.");
    }
  };

  return (
    <button
      onClick={handleDownload}
      className={`rh-btn rh-btn-success rh-btn-sm ${className || ""}`}
      style={{ width: "100%", justifyContent: "center", ...style }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Document
    </button>
  );
};

export default PdfDownloader;
