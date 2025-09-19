import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useEffect, forwardRef, useImperativeHandle } from "react";

const BLOCK_COUNT = 6;

const Animate = React.forwardRef(({ children }, ref) => {
  const overlayControlsArray = Array.from({ length: BLOCK_COUNT }, () =>
    useAnimation()
  );
  const revoverlayControlsArray = Array.from({ length: BLOCK_COUNT }, () =>
    useAnimation()
  );
  const contentControls = useAnimation();

  // Initial animation when component mounts
  useEffect(() => {
    const sequence = async () => {
      // Reset overlays to initial positions
      for (let i = 0; i < BLOCK_COUNT; i++) {
        overlayControlsArray[i].set({ left: "0%", opacity: 1 });
        revoverlayControlsArray[i].set({ left: "50%", opacity: 1 });
      }

      for (let i = 0; i < BLOCK_COUNT; i++) {
        overlayControlsArray[i].start({
          left: "-51%",
          opacity: 0.5,
          transition: { duration: 0.5, type: "circIn" },
        });

        revoverlayControlsArray[i].start({
          left: "101%",
          opacity: 0.5,
          transition: { duration: 0.5, type: "circIn" },
        });

        await new Promise((res) => setTimeout(res, 200));
      }

      await contentControls.start("animate");
    };

    sequence();
  }, []);

  // Expose reverse animation to parent
  useImperativeHandle(ref, () => ({
    reverseAnimation: async () => {
      // Reverse the overlays
      for (let i = BLOCK_COUNT - 1; i >= 0; i--) {
        overlayControlsArray[i].start({
          left: "0%",
          opacity: 1,
          transition: { duration: 0.4, type: "circOut" },
        });

        revoverlayControlsArray[i].start({
          left: "50%",
          opacity: 1,
          transition: { duration: 0.4, type: "circOut" },
        });

        await new Promise((res) => setTimeout(res, 150));
      }

      // Optionally reset content animation
      await contentControls.start("initial");
    },
  }));

  const animation = {
    initial: { opacity: 0.5, y: 0 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <>
      {overlayControlsArray.map((controls, index) => (
        <motion.div
          key={`overlay-${index}`}
          className="w-[50%] h-[20vh] bg-rose-400 fixed left-0 pointer-events-none z-50"
          style={{ top: `${index * 20}%` }}
          initial={{ left: "0%", opacity: 1 }}
          animate={controls}
        />
      ))}

      {/* Right block overlay */}
      {revoverlayControlsArray.map((controls, index) => (
        <motion.div
          key={`revoverlay-${index}`}
          className="w-[50%] h-[20vh] bg-rose-400 fixed left-0 pointer-events-none z-50"
          style={{ top: `${index * 20}%` }}
          initial={{ left: "50%" }}
          animate={controls}
        />
      ))}

      {/* Content animation */}
      <motion.div
        variants={animation}
        initial="initial"
        animate={contentControls}
        exit="exit">
        {children}
      </motion.div>
    </>
  );
});

export default Animate;
