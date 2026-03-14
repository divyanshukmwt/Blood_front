import React from 'react';
import Axios from "../config/Axois";
import { toast } from 'react-toastify';
import { Download } from 'lucide-react';

const PdfDownloader = (id) => {
  const handleDownload = async () => {
    try {
      const response = await Axios.post("/pdf/generatePdf", id, { responseType: "blob" });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "blood-request.pdf";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Downloaded successfully!");
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <button onClick={handleDownload} style={{
      width: "100%", padding: "12px 20px", borderRadius: "10px",
      background: "var(--crimson)", color: "white", border: "none", cursor: "pointer",
      fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: "0.9rem",
      transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
      boxShadow: "0 2px 12px rgba(192,21,42,0.25)",
    }}
      onMouseEnter={e => e.currentTarget.style.background = "var(--crimson-dark)"}
      onMouseLeave={e => e.currentTarget.style.background = "var(--crimson)"}
    >
      <Download size={15} /> Download PDF
    </button>
  );
};

export default PdfDownloader;
