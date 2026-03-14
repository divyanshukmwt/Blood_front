import React, { useEffect, useRef, forwardRef } from "react";
import { gsap } from "gsap";

const Animate = forwardRef(({ children }, ref) => {
  const el = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      el.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  return (
    <div
      ref={(node) => {
        el.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      style={{ width: "100%", minHeight: "100vh", background: "var(--ink-2)" }}
    >
      {children}
    </div>
  );
});

export default Animate;
