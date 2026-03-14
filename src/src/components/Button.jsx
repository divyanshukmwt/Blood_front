import { useNavigate } from "react-router-dom";

const Button = ({ navigating, text, val }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(navigating)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: val ? "14px 36px" : "13px 34px",
        background: val ? "var(--crimson)" : "transparent",
        color: val ? "#fff" : "var(--crimson)",
        border: val ? "none" : "1.5px solid var(--crimson)",
        borderRadius: "12px",
        fontSize: "15px",
        fontWeight: 700,
        fontFamily: "Poppins,sans-serif",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        cursor: "pointer",
        transition: "all 200ms ease",
        boxShadow: val ? "var(--shadow-crimson)" : "none",
        width: "fit-content",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = val ? "var(--shadow-crimson-lg)" : "0 4px 14px rgba(192,21,42,0.15)";
        if (!val) e.currentTarget.style.background = "var(--crimson-subtle)";
        else e.currentTarget.style.background = "var(--crimson-dark)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = val ? "var(--shadow-crimson)" : "none";
        e.currentTarget.style.background = val ? "var(--crimson)" : "transparent";
      }}
    >
      {text}
    </button>
  );
};

export default Button;
