import React, { useState, useEffect, useRef, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { receiveMessage, sendMessage } from "../config/Socket";
import { AdminContext } from "../context/admin.context";

const SelectBox = ({ option }) => {
  const [selected, setSelected] = useState("Select time interval");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const { setAdmin } = useContext(AdminContext);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTimer = () => {
    if (selected === "Select time interval") {
      toast.error("Please select a time interval first.");
    } else {
      sendMessage("Timer-Change", selected);
      toast.success("✅ Delay timer updated.");
    }
  };

  useEffect(() => {
    receiveMessage("ChangeTime", (data) => setAdmin(data));
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div ref={wrapperRef} style={{ position: "relative", width: "100%", maxWidth: "280px" }}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: "100%", padding: "11px 40px 11px 14px",
            background: "#fff", border: `1.5px solid ${isOpen ? "var(--crimson)" : "var(--ink-10)"}`,
            borderRadius: isOpen ? "10px 10px 0 0" : "10px",
            fontSize: "14px", fontFamily: "Poppins,sans-serif", color: selected === "Select time interval" ? "var(--ink-20)" : "var(--ink)",
            cursor: "pointer", textAlign: "left", outline: "none", transition: "border-color 200ms ease",
            boxShadow: isOpen ? "0 0 0 3px rgba(192,21,42,0.08)" : "none",
          }}
        >
          {selected}
          <span style={{ position: "absolute", right: "12px", top: "50%", transform: `translateY(-50%) rotate(${isOpen ? 180 : 0}deg)`, transition: "transform 200ms ease", pointerEvents: "none" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-40)" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#fff", border: "1.5px solid var(--crimson)", borderTop: "none", borderRadius: "0 0 10px 10px", zIndex: 50, overflow: "hidden", boxShadow: "var(--shadow-md)" }}
            >
              {option.map((opt, i) => (
                <button
                  key={i} type="button"
                  onClick={() => { setSelected(opt); setIsOpen(false); }}
                  style={{
                    display: "block", width: "100%", padding: "10px 14px",
                    textAlign: "left", background: opt === selected ? "var(--crimson-muted)" : "#fff",
                    color: opt === selected ? "var(--crimson)" : "var(--ink-60)",
                    border: "none", cursor: "pointer", fontSize: "14px",
                    fontFamily: "Poppins,sans-serif", fontWeight: opt === selected ? 600 : 400,
                    borderTop: i > 0 ? "1px solid var(--ink-10)" : "none",
                    transition: "background 150ms ease",
                  }}
                  onMouseEnter={e => { if (opt !== selected) e.target.style.background = "var(--ink-2)"; }}
                  onMouseLeave={e => { if (opt !== selected) e.target.style.background = "#fff"; }}
                >
                  {opt}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={handleTimer}
        className="rh-btn rh-btn-primary rh-btn-sm"
        style={{ width: "fit-content" }}
      >
        Apply Timer
      </button>
    </div>
  );
};

export default SelectBox;
