import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Loader2({ onComplete }) {
  const circleRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const circle = circleRef.current;
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;

    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out the whole loader
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            if (onComplete) onComplete();
          },
        });
      },
    });

    tl.to(circle, {
      strokeDashoffset: 0,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: function () {
        const progress = this.progress();
        if (textRef.current) {
          textRef.current.style.opacity = progress;
          textRef.current.style.transform = `scale(${0.85 + progress * 0.15})`;
        }
      },
    });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        background: "#fff",
        flexDirection: "column",
        gap: "0px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div style={{ position: "relative", width: 160, height: 160 }}>
        {/* Track circle */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <circle cx="80" cy="80" r="70" stroke="var(--ink-10)" strokeWidth="6" fill="none"/>
        </svg>
        {/* Progress circle */}
        <svg style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
          <circle
            ref={circleRef}
            cx="80" cy="80" r="70"
            stroke="var(--crimson)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        {/* Center content */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px" }}>
          <div style={{ width: 28, height: 28, marginBottom: "4px" }}>
            <svg viewBox="0 0 72 84" fill="none" width="100%" height="100%">
              <path d="M36 4C36 4 8 32 8 52C8 68.57 20.54 82 36 82C51.46 82 64 68.57 64 52C64 32 36 4 36 4Z" fill="var(--crimson)"/>
            </svg>
          </div>
          <span
            ref={textRef}
            style={{
              fontFamily: "oswald,sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              color: "var(--ink)",
              opacity: 0,
              letterSpacing: "0.06em",
              transform: "scale(0.85)",
            }}
          >
            REDHOPE
          </span>
        </div>
      </div>
    </div>
  );
}
