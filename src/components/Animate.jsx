import React, { useEffect, useRef, forwardRef } from "react";
import { gsap } from "gsap";

const Animate = forwardRef(({ children }, ref) => {
  const el = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      el.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  return (
    <div ref={(node) => {
        el.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      className="w-full min-h-screen bg-gray-100"
    >
      {children}
    </div>
  );
});

export default Animate;
